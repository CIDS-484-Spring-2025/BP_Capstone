package com.BP.setlistaggregator.model;

import jakarta.persistence.*;
import java.util.List;
import com.BP.setlistaggregator.model.Setlist;


@Entity
public class Artist {
    //primary key
    @Id
    //auto generate IDs for artists
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    //musicbrainz id needed for matching with setlist.fm api
    private String mbid;

    //one artist can have many setlists
    @OneToMany(mappedBy = "artist", cascade = CascadeType.ALL)
    //list to hold artists setlists
    private List<Setlist> setlists;

    //getters setters and constructors

    //default constructor
    public Artist() {}

    //paramaterized constructor
    public Artist(String name, String mbid) {
        this.name = name;
        this.mbid = mbid;
    }

    //getters
    public Long getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getMbid() {
        return mbid;
    }

    public List<Setlist> getSetlists() {
        return setlists;
    }
    //setters
    public void setName(String name) {
        this.name = name;
    }
    public void setMbid(String mbid) {
        this.mbid = mbid;
    }
    public void setSetlists(List<Setlist> setlists) {
        this.setlists = setlists;
}
}