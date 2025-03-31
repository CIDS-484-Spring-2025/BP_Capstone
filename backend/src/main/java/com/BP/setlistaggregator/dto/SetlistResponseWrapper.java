package com.BP.setlistaggregator.dto;
import java.util.List;

//class to match the API response structure from Setlist.fm
//JSON has field called "Setlist" which holds list of setlists
public class SetlistResponseWrapper {

    //list of individual setlists returned by API
    private List<ApiSetlist> setlist;

    //getter for list of setlists to be used in other classes
    public List<ApiSetlist> getSetlist() {
        return setlist;
    }

    public void setSetlist(List<ApiSetlist> setlist) {
        this.setlist = setlist;
    }
}
