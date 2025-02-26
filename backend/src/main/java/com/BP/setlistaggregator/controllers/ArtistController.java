package com.BP.setlistaggregator.controllers;

import com.BP.setlistaggregator.model.Artist;
import com.BP.setlistaggregator.repositories.ArtistRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
//class to handle REST api requests
@RestController
//base url path for artist-related endpoints
@RequestMapping("/api/artists")
public class ArtistController {

    //dependency injection of ArtistRepository
    private final ArtistRepository artistRepository;

    //constructor injection of repository automatically by Spring
    public ArtistController(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    //GET request in order to fetch all artists in the database
    @GetMapping
    public List<Artist> getAllArtists() {
        //call repo to retuen all artists
        return artistRepository.findAll();
    }
    //POST request to save new artist to our database
    @PostMapping
    public Artist addArtist(@RequestBody Artist artist) {
        //save received artist object into our database
        return artistRepository.save(artist);
    }
}