package com.BP.setlistaggregator.controllers;

import com.BP.setlistaggregator.model.*;
import com.BP.setlistaggregator.repositories.SetlistRepository;
import com.BP.setlistaggregator.service.SetlistService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
//class to handle requests involving setlist data, stats
//allow React frontend on port 3000 to make requests to Spring Boot backend on 8080
@CrossOrigin(origins = "http://localhost:3000")
//annotation to tell Spring this is a REST API controller that returns JSON
@RestController
//base URL for endpoints in class
@RequestMapping("/api/setlists")
public class SetlistController {
    private final SetlistService setlistService;

    //constructor injection of setlist service as dependency
    //Spring automatically passes instance of SetlistService when controller is created
    public SetlistController(SetlistService setlistService) {
        this.setlistService = setlistService;
    }

    //GET endpoint to fetch all setlists from user defined artist
    //maps to GET /api/setlists?artist=Radiohead
    //returns list of setlists, each containing songs, artist etc in JSON format
    @GetMapping
    public List<Setlist> getAllArtistSetlists(@RequestParam String artist) {
        //get all setlists from database using service layer method
        return setlistService.getAllArtistSetlists(artist);
    }
    //Get endpoint to return 5 most common encore songs for inputted artist
    //maps to GET /api/setlists/encores?artist=Tool
    @GetMapping("/encores")
    public List<String> getTopEncores(@RequestParam String artist) {
        //call service method that finds encore of each concert, counts the most common and returns top 5 in JSON
        return setlistService.getTopEncoreSongs(artist);
    }
    //GET endpoint to return 5 rarest songs for selected artist
    //maps to GET /api/setlists/rarest?artist=Nirvana
    //responds to a call to http://localhost:8080/api/setlists/rarest
    @GetMapping("/rarest")
    public List<String> getRarestSongs(@RequestParam String artist) {
        return setlistService.getRarestSongs(artist);
    }
    /* implement in future - endpoint for summary of stats
    //Get stats for artists sets
    @GetMapping("/stats")
    public String getArtistStats(@RequestParam String artist) {
        //save setlist to database
        return setlistService.calculateArtistStats(artist);
    } */
}
