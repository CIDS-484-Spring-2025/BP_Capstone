package com.BP.setlistaggregator.controllers;

import com.BP.setlistaggregator.model.Setlist;
import com.BP.setlistaggregator.repositories.SetlistRepository;
import com.BP.setlistaggregator.service.SetlistService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
//class to handle api requests from frontend
//allow React frontend to access
@CrossOrigin(origins = "http://localhost:3000")
@RestController
//base URL for setlist objects
@RequestMapping("/api/setlists")
public class SetlistController {
    private final SetlistService setlistService;

    public SetlistController(SetlistService setlistService) {
        this.setlistService = setlistService;
    }
//GET endpoint to fetch all setlists from user defined artist
    @GetMapping
    public List<Setlist> getAllArtistSetlists(@RequestParam String artist) {
        //get all setlists from database
        return setlistService.getSetlistsForArtist(artist);
    }
    //Get stats for artists sets
    @GetMapping("/stats")
    public String getArtistStats(@RequestParam String artist) {
        //save setlist to database
        return setlistService.calculateArtistStats(artist);
    }
}
