package com.example.sportgather.domain;

public class Teacher {
    String TeacherId;;
    Float Rating;

    public String getTeacherId() {
        return TeacherId;
    }

    public void setTeacherId(String teacherId) {
        TeacherId = teacherId;
    }

    public Float getRating() {
        return Rating;
    }

    public void setRating(Float rating) {
        Rating = rating;
    }

    public Integer getYearofTeaching() {
        return YearofTeaching;
    }

    public void setYearofTeaching(Integer yearofTeaching) {
        YearofTeaching = yearofTeaching;
    }

    Integer YearofTeaching;

}