package com.example.sportgather.domain;

public class Mates {
    private String requestid;
    private String receiverid;
    private String state;

    public String getRequestid() {
        return requestid;
    }
    public String getState() {
        return state;
    }

    public String getReceiverid() {
        return receiverid;
    }

    public void setRequestid(String id) {
        requestid = id;
    }

    public void setReceiverid(String id) {
        receiverid = id;
    }
    public void setState(String s) { state = s;}
}
