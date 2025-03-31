package com.BP.setlistaggregator.service;

import com.BP.setlistaggregator.model.Setlist;
import com.BP.setlistaggregator.model.Artist;
//only importing model class, must fully qualify dto Song when used
import com.BP.setlistaggregator.model.Song;

import com.BP.setlistaggregator.dto.SetSection;
import com.BP.setlistaggregator.dto.ApiSetlist;
import com.BP.setlistaggregator.dto.SetlistResponseWrapper;
import com.BP.setlistaggregator.dto.Sets;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import com.BP.setlistaggregator.repositories.SetlistRepository;
import com.BP.setlistaggregator.repositories.ArtistRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.*;



//annotates as class to perform business logic i.e. calculations on stats
//defines methods to perform calculations
@Service
public class SetlistService {
    private final SetlistRepository setlistRepository;
    private final ArtistRepository artistRepository;
    private final WebClient webClient;

    public SetlistService(SetlistRepository setlistRepository, ArtistRepository artistRepository, WebClient.Builder webClientBuilder) {
        this.setlistRepository = setlistRepository;
        this.artistRepository = artistRepository;
        this.webClient = webClientBuilder
                .baseUrl("https://api.setlist.fm/rest/1.0")
                .build();
    }

    //method to retrieve setlists from db, if not there from setlistFM
    public List<Setlist> getAllArtistSetlists(String artist) {
        //query database to see if artist already there
        List<Setlist> setlists = setlistRepository.findByArtistName(artist);

        if (setlists.isEmpty()) {
            //not in database, so fetch from setlistfm
            setlists = fetchFromSetlistFm(artist);
            setlistRepository.saveAll(setlists);
        }
            return setlists;
    }
    //method to fetch artist setlists from setlistfm
    private List<Setlist> fetchFromSetlistFm(String artistName) {
        //send request to Setlist.fm API
        SetlistResponseWrapper response = webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/setlists")
                        .queryParam("artistName", artistName)
                        .build())
                //tell API to send JSON instead of XML default
                .header("Accept", "application/json")
                //API key defined in system environment variables
                .header("x-api-key", System.getenv("SFM_API_KEY"))
                .retrieve()
                //Map outer API wrapper to its Java class
                .bodyToMono(SetlistResponseWrapper.class)
                //block request until full data received
                .block();

        //return empty list if no data
        if (response == null || response.getSetlist() == null) {
            return new ArrayList<>();
        }
        //check if artist exists in local DB already
        Artist artist = artistRepository.findByNameIgnoreCase(artistName).orElse(null);

        //if not- create, save new artist
        if (artist == null) {
            artist = new Artist();
            artist.setName(artistName);
            artist = artistRepository.save(artist);
        }
        //convert all API setlists to DB setlists using mapper method
        List<Setlist> dbSetlists = new ArrayList<>();
        for (ApiSetlist apiSetlist : response.getSetlist()) {
            Setlist dbSetlist = mapApiSetlistToEntity(apiSetlist, artist);
            dbSetlists.add(dbSetlist);
        }
        //save all setlists and cascade save all songs
        setlistRepository.saveAll(dbSetlists);

        //return saved DB setlists
        return dbSetlists;
    }
    //method to calculate an artists top 5 encore songs (final song)
    public List<String> getTopEncoreSongs(String artist) {

        //look up the setlists of user entered artist by calling method (from DB or API)
        List<Setlist> setlists = getAllArtistSetlists(artist);

        //map to track amount of times each encore song appears
        Map<String, Integer> encoreCounts = new HashMap<>();

        //iterate each setlist retrieved
        for (Setlist setlist : setlists) {
            //get list of songs in that setlist
            List<Song> songs = extractSongs(setlist);

            //skip empty setlists
            if (songs == null || songs.isEmpty()) {
                continue;
            }
            //find song with highest position in setlist (will be last song/encore)
            //keep track of highest position
            Song encore = null;

            //loop through all songs to find one with highest position
            for (Song song : songs) {
                if (encore == null || song.getPosition() > encore.getPosition()) {
                    encore = song;
                }
            }
            //count encore song if found
            if (encore != null) {
                String title = encore.getTitle();
                int count = encoreCounts.getOrDefault(title, 0);
                encoreCounts.put(title, count + 1);
            }
        }
       //call helper method to get 5 most common encore songs sorted
        return getTopKeys(encoreCounts, 5, false);
    }

    //method to return 5 rarest songs(least played) for selected artist
    public List<String> getRarestSongs(String artist) {
        //retrieve setlists for artist
        List<Setlist> setlists = getAllArtistSetlists(artist);

        //map to count appearances of each song
        Map<String, Integer> songCounts = new HashMap<>();

        //loop thru each setlist of artist
        for (Setlist setlist : setlists) {
            //get list of songs from setlist
            List<Song> songs = extractSongs(setlist);

            //skip empty setlists
            if (songs == null || songs.isEmpty()) {
                continue;
            }
            //loop thru each song to count its appearances
            for (Song song : songs) {
                String title = song.getTitle();
                int count = songCounts.getOrDefault(title, 0);
                songCounts.put(title, count + 1);
            }
        }
        //call helper method to sort descending (boolean false) and return top 5 rarest
        return getTopKeys(songCounts, 5, true);

    }

    //helper method to return top N keys from map based on their values
    //ascending = true, lowest values first, used with getRarestSongs
    //descending = false, highest values first, used with getTopEncoreSongs
    private List<String> getTopKeys(Map<String, Integer> map, int n, boolean ascending) {
        //convert map entries to list for sorting
        List<Map.Entry<String, Integer>> entries = new ArrayList<>(map.entrySet());

        //bubble sort by value
        for (int i = 0; i < entries.size(); i++) {
            for (int j = i + 1; j < entries.size(); j++) {
                int compare = entries.get(i).getValue() - entries.get(j).getValue();
                if ((ascending && compare > 0) || (!ascending && compare < 0)) {
                    //swap entries
                    Map.Entry<String, Integer> temp = entries.get(i);
                    entries.set(i, entries.get(j));
                    entries.set(j, temp);
                }
            }
        }
        //add top N keys to the result list
        List<String> topKeys = new ArrayList<>();
        for (int i = 0; i < entries.size() && i < n; i++) {
            topKeys.add(entries.get(i).getKey());
        }
        return topKeys;
    }

    //helper method to extract all songs from Setlist object
    //Goes into sets, set, song structure from Setlist.fm api and flattens it into a list
    private List<Song> extractSongs(Setlist setlist) {
        //initialize empty list to hold all songs
        List<Song> songs = new ArrayList<>();

        //check that sets obj exists and has list of set sections
        if (setlist.getSongs() != null) {
            //loop thru each set section
            songs.addAll(setlist.getSongs());
        }
        //return list of all songs for this setlist
        return songs;
    }
    //method to convert API setlist from Setlist.fm into local Setlist entity saveable to local DB
    private Setlist mapApiSetlistToEntity(ApiSetlist apiSetlist, Artist artist) {
        //create new setlist entity
        Setlist setlist = new Setlist();

        //set foreign key reference to artist
        setlist.setArtist(artist);

        //parse event date string from API to localdate
        LocalDate parsedDate = LocalDate.parse(apiSetlist.getEventDate(), DateTimeFormatter.ofPattern("dd-MM-yyyy"));
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
                    //convert each API song to DB song object and add it to list
                    for (com.BP.setlistaggregator.dto.Song apiSong : section.getSong()) {
                        //create new Song entity
                        com.BP.setlistaggregator.model.Song dbSong = new com.BP.setlistaggregator.model.Song();
                        dbSong.setTitle(apiSong.getName());
                        //link song to this setlist
                        dbSong.setSetlist(setlist);
                        dbSongs.add(dbSong);
                    }
                }
            }
        }
        //add all songs to the setlist
        setlist.setSongs(dbSongs);

        return setlist;
    }
}
