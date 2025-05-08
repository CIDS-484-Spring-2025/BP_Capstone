package com.BP.setlistaggregator.service;

import com.BP.setlistaggregator.repositories.ArtistRepository;
import com.BP.setlistaggregator.model.Artist;
import org.springframework.stereotype.Service;
import java.util.Optional;

//service class solely for handling artist objects
@Service
public class ArtistService {
    private final ArtistRepository artistRepository;

    public ArtistService(ArtistRepository artistRepository) {
        this.artistRepository = artistRepository;
    }

    //helper method used in fetchFromSetlistFM method to retrieve existing artist or create new one if not found
    public Artist findOrCreateArtist(String artistName) {
        //try to find in db
        Artist artist = artistRepository.findByNameIgnoreCase(artistName).orElse(null);

        //if not found, create and save a new artist
        if (artist == null) {
            artist = new Artist();
            artist.setName(artistName);
            artist = artistRepository.save(artist);

            //log creation
            System.out.println("Created new artist entry for: " + artistName);
        }

        //return the artist (new or existing)
        return artist;
    }

    public Optional<Artist> findByName(String name) {
        return artistRepository.findByNameIgnoreCase(name);
    }

    //implement in future: get artist stats, artist suggestions, etc.
}
