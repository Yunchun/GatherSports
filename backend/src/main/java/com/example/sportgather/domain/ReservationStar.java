package com.example.sportgather.domain;


public class ReservationStar {
    private String name;

    private Integer reservationTimes;

    private String type;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getReservationTimes() {
        return reservationTimes;
    }

    public void setReservationTimes(Integer reservationTimes) {
        this.reservationTimes = reservationTimes;
    }
}
