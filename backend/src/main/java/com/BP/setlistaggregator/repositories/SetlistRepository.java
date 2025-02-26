package com.BP.setlistaggregator.repositories;

import com.BP.setlistaggregator.model.Setlist;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
//data access class directly interacts with postgreSQL database
//uses Spring Data JPA to perform queries, CRUD methods
//interface for CRUD on Setlist entities
public interface SetlistRepository extends JpaRepository<Setlist, Long> {

    //method to retrieve all setlists belonging to an artist using their artist ID
    List<Setlist> findByArtistName(String artist);
}

