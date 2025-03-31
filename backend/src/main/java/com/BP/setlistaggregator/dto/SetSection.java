package com.BP.setlistaggregator.dto;

import java.util.List;

//represents each section of a concert set like set 1, 2 , encore. not all concerts have sections
public class SetSection {
    //optional section label
    private String name;
    //list of songs played in section
    private List<Song> song;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Song> getSong() {
        return song;
    }

    public void setSong(List<Song> song) {
        this.song = song;
    }
}
