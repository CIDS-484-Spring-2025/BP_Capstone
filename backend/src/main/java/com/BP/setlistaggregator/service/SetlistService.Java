package com.BP.setlistaggregator.service;

import com.BP.setlistaggregator.model.Setlist;
import com.BP.setlistaggregator.repositories.SetlistRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.util.*;



//annotates as class to perform business logic i.e. calculations on stats
//defines methods to perform calculations
@Service
public class SetlistService {
    private final SetlistRepository setlistRepository;
    private final WebClient webClient;

    public SetlistService(SetlistRepository setlistRepository, WebClient webClient) {
        this.setlistRepository = setlistRepository;
        this.webClient = webClientBuilder.baseUrl("https://api.setlist.fm/rest/1.0").build();
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
    private List<Setlist> fetchFromSetlistFm(String artist) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/search/setlists")
                        .queryParam("artistName", artist)
                        .build())
                .header("x-api-key", "rnD1oaOWGBTK0O2sCnxkQS0pwpFVacKavYXK")
                .retrieve()
                //convert JSON response to setlist objects
                .bodyToFlux(Setlist.class)
                .collectList()
                //block request until data received
                .block();
    }
}