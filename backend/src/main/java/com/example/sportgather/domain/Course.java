package com.example.sportgather.domain;

public class Course {
    private String CourseId;
    private String Name;
    private String Description;
    private float Rating;
    private String SportId;
    private String TeacherId;
    private String Date;
    private String time;
    private int capacity;

    public String getDate() {
        return Date;
    }

    public void setDate(String date) {
        Date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public String getCourseId() {
        return CourseId;
    }

    public String getName() {
        return Name;
    }

    public float getRating() {
        return Rating;
    }

    public String getDescription() {
        return Description;
    }

    public String getSportId() {
        return SportId;
    }

    public String getTeacherId() {
        return TeacherId;
    }

    public void setDescription(String description) {
        Description = description;
    }
    public void setCourseId(String courseId) {
        CourseId = courseId;
    }

    public void setName(String name) {
        Name = name;
    }

    public void setRating(float rating) {
        Rating = rating;
    }

    public void setSportId(String sportId) {
        SportId = sportId;
    }

    public void setTeacherId(String teacherId) {
        TeacherId = teacherId;
    }
}
