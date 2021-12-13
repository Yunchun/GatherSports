package com.example.sportgather.domain;

public class Court {
    String CourtId;

    String Name;

    String Location;

    String SportId;

    public String getCourtId() {
        return CourtId;
    }

    public void setCourtId(String courtId) {
        CourtId = courtId;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    public String getSportId() {
        return SportId;
    }

    public void setSportId(String sportId) {
        SportId = sportId;
    }
}
