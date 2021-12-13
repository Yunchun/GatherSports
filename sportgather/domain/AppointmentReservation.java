package com.example.sportgather.domain;


import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class AppointmentReservation {
    private String SportName;
    private Date startDate;

    public String getStudentName() {
        return StudentName;
    }

    public void setStudentName(String studentName) {
        StudentName = studentName;
    }

    private String StudentName;
    public String getSelectedTeacherName() {
        return SelectedTeacherName;
    }

    public void setSelectedTeacherName(String selectedTeacherName) {
        SelectedTeacherName = selectedTeacherName;
    }

    private String SelectedTeacherName;
    public String getSelectedTeacherId() {
        return SelectedTeacherId;
    }

    public void setSelectedTeacherId(String selectedTeacherId) {
        SelectedTeacherId = selectedTeacherId;
    }

    public String getNotes() {
        return Notes;
    }

    public void setNotes(String notes) {
        Notes = notes;
    }

    private String SelectedTeacherId;
    private String Notes;


    public List<TeacherRecommend> getTeacherRecommends() {
        return teacherRecommends;
    }

    public void setTeacherRecommends(List<TeacherRecommend> teacherRecommends) {
        this.teacherRecommends = teacherRecommends;
    }

    public List<TeacherRecommend> teacherRecommends;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    private String title;
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    private String id;
    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    private Date endDate;
    private String location;

    public String getSportName() {
        return SportName;
    }

    public void setSportName(String sportName) {
        SportName = sportName;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }




}
