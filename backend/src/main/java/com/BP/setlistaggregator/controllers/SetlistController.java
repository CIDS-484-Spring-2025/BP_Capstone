package com.BP.setlistaggregator.controllers;

import com.BP.setlistaggregator.model.*;
import com.BP.setlistaggregator.repositories.SetlistRepository;
import com.BP.setlistaggregator.service.SetlistService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.BP.setlistaggregator.internalDTO.SongsRanked;

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
    public List<Setlist> getAllArtistSetlists(@RequestParam String artist, @RequestParam(defaultValue = "50") String setlistRange)
    {
        //have to use String in parameter to allow for user to select all, so conversion is in case number entered
        int maxSetlists = parseSetlistRange(setlistRange);
        //get all setlists from database using service layer method
        return setlistService.getAllArtistSetlists(artist, maxSetlists);
    }
    //Get endpoint to return 5 most common encore songs for inputted artist
    //maps to GET /api/setlists/encores?artist=Tool
    @GetMapping("/encores")
    public List<SongsRanked> getTopEncores(@RequestParam String artist, @RequestParam(defaultValue = "50") String setlistRange)
    {
        int maxSetlists = parseSetlistRange(setlistRange);

        //call service method that finds encore of each concert, counts the most common and returns top 5 in JSON
        return setlistService.getTopEncoreSongs(artist, maxSetlists);
    }
    //GET endpoint to return 5 rarest songs for selected artist
    //maps to GET /api/setlists/rarest?artist=Nirvana
    //responds to a call to http://localhost:8080/api/setlists/rarest
    @GetMapping("/rarest")
    public List<SongsRanked> getRarestSongs(@RequestParam String artist, @RequestParam(defaultValue = "50") String setlistRange)
    {
        int maxSetlists = parseSetlistRange(setlistRange);

        return setlistService.getRarestSongs(artist, maxSetlists);

    }
    //GET endpoint to return average setlist length
    //maps to GET /api/setlists/averageLength?artist=Radiohead
    @GetMapping("/averageLength")
    public double getAvgSetlistLength(@RequestParam String artist, @RequestParam(defaultValue = "50") String setlistRange) {
        int maxSetlists = parseSetlistRange(setlistRange);

        //call service method to calculate average number of songs per concert
        return setlistService.getAvgSetlistLength(artist, maxSetlists);
    }

    //helper method to convert user input to maxSetlists int value
    //avoiding repeat logic in endpoints
    private int parseSetlistRange(String setlistRange) {
        if (setlistRange.equalsIgnoreCase("all")) {
            return -1;
        }
        try {
            return Integer.parseInt(setlistRange);
        }
        //should never happen as range selected from dropdown
        catch (NumberFormatException e) {
            return 50;
        }
        }

    /* implement in future - endpoint for summary of stats
    //Get stats for artists sets
    @GetMapping("/stats")
    public String getArtistStats(@RequestParam String artist) {
        //save setlist to database
        return setlistService.calculateArtistStats(artist);
    } */
}
