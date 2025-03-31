package com.BP.setlistaggregator.dto;

//DTO (Data Transfer Object) for a setlist from setlist.fm API
public class ApiSetlist {
    //unique ID from Setlist.fm (separate from one used in DB)
    private String id;
    //date of the concert (as string from API)
    private String eventDate;
    //nested object that wraps the sets
    private Sets sets;

    //getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEventDate() {
        return eventDate;
    }

    public void setEventDate(String eventDate) {
        this.eventDate = eventDate;
    }

    public Sets getSets() {
        return sets;
    }

    public void setSets(Sets sets) {
        this.sets = sets;
    }
}
