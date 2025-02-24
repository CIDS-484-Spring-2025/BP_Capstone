package com.BP.setlistaggregator.repositories;

//import artist entity from models
import com.BP.setlistaggregator.model.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
//for optional return values to handle null results
import java.util.Optional;

//extending JpaRepository inherits standard CRUD methods automaticallu implemented by Spring
//create interface to handle CRUD operations on Artist entities
public interface ArtistRepository extends JpaRepository<Artist, Long> {

    //method to find an artist given their unique Musicbrainz ID (mbid)
    Optional<Artist> findByMbid(String mbid);
}