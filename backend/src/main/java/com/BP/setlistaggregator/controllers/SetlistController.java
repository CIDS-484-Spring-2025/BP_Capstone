package com.BP.setlistaggregator.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access
@RestController
@RequestMapping("/api")
public class SetlistController {
    @GetMapping("/test")
    public String testEndpoint() {
        return "Backend is working!";
    }
}
