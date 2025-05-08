package com.BP.setlistaggregator.service;

import com.BP.setlistaggregator.dto.*;
import com.BP.setlistaggregator.model.Artist;
import com.BP.setlistaggregator.model.Setlist;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

//service class that handles interaction with the Setlist.fm API
@Service
public class SetlistFMFetchService {
    //talks to Setlist.FM's REST API
    private final WebClient webClient;

    public SetlistFMFetchService(WebClient.Builder builder) {
        //Allows us to build an HTTP client with a base URL of Setlist.FM's API
        this.webClient = builder.baseUrl("https://api.setlist.fm/rest/1.0").build();
    }
    //helper method to send GET request to Setlist.fm API for a specific artist page
    public SetlistResponseWrapper fetchSetlistPage(String artistName, int page, int size) {
            //send request to Setlist.fm API for one page of setlists
            return webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .path("/search/setlists")
                            .queryParam("artistName", artistName)
                            .queryParam("p", page)
                            .queryParam("size", size)
                            .build())
                    //tell API to send JSON instead of XML default
                    .header("Accept", "application/json")
                    //API key defined in system environment variables
                    .header("x-api-key", System.getenv("SFM_API_KEY"))
                    .retrieve()
                    //Map outer API wrapper to its Java class
                    //This tells Spring to turn the JSON response into DTOs
                    //JSON is deserialized in SetlistResponseWrapper into list of ApiSetlist objects
                    .bodyToMono(SetlistResponseWrapper.class)
                    //block request until full data received
                    .block();
        }
    //Transforms the API data/DTOs into database entities
    //method to convert API setlist from Setlist.fm into local Setlist entity saveable to local DB
    public Setlist mapApiSetlistToEntity(ApiSetlist apiSetlist, Artist artist) {
        //create new setlist entity
        Setlist setlist = new Setlist();

        //set foreign key reference to artist
        setlist.setArtist(artist);

        //parse event date string from API to localdate
        LocalDate parsedDate;
        try {
            parsedDate = LocalDate.parse(apiSetlist.getEventDate(), DateTimeFormatter.ofPattern("dd-MM-yyyy"));
        } catch (Exception e) {
            System.out.println("Date parsing failed for: " + apiSetlist.getEventDate());
            //fallback or skip
            parsedDate = LocalDate.now();
        }
        setlist.setDate(parsedDate);

        //implement later
        setlist.setVenue("Unknown Venue");
        setlist.setCity("Unknown City");
        setlist.setCountry("Unknown Country");

        //create empty list to hold songs (explicitly of internal song model because of 2 Song classes)
        List<com.BP.setlistaggregator.model.Song> dbSongs = new ArrayList<>();

        //look thru each section of API setlist
        if (apiSetlist.getSets() != null && apiSetlist.getSets().getSet() != null) {
            for (SetSection section : apiSetlist.getSets().getSet()) {
                if (section.getSong() != null) {
                    int positionCtr = 1;
                    //convert each API song to DB song object and add it to list
                    for (com.BP.setlistaggregator.dto.Song apiSong : section.getSong()) {
                        //create new Song entity
                        com.BP.setlistaggregator.model.Song dbSong = new com.BP.setlistaggregator.model.Song();
                        dbSong.setTitle(apiSong.getName());
                        //link song to this setlist
                        dbSong.setSetlist(setlist);
                        dbSongs.add(dbSong);

                        //debug log to confirm songs are being parsed and position being assigned correctly
                        System.out.println("Mapped song: " + apiSong.getName() + " at position " + positionCtr);
                        positionCtr++;
                    }
                }
            }
        }
        //new method to check if setlist is empty and avoid saving it to db
        if (dbSongs.isEmpty()) {
            System.out.println("Skipping empty setlist for artist " + artist.getName() + " on " + apiSetlist.getEventDate());
            return null;
        }
        //add all songs to the setlist
        setlist.setSongs(dbSongs);
        //log to confirm what data is being saved
        System.out.println("Mapped " + dbSongs.size() + " songs for setlist on " + apiSetlist.getEventDate());

        return setlist;
    }

    //future: rate limit tracker,pagination helpers, etc
}
