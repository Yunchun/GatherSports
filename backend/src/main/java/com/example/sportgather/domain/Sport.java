package com.example.sportgather.domain;

public class Sport {
    private String SportId;
    private String SportName;
    private String SportIntroduction;
    private String SportImage;

    public String getSportId() {return SportId;}
    public void setSportId(String s) { SportId = s;}
    public String getSportName() { return SportName; }
    public void setSportName(String s) { SportName = s;}
    public String getSportIntroduction() { return SportIntroduction; }
    public void setSportIntroduction(String s) { SportIntroduction = s; }
    public String getSportImageURL() { return SportImage; }
    public void setSportImageURL(String s) { SportImage = s; }
}
