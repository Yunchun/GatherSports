package com.example.sportgather.domain;

public class Appointment {
    Integer AppointmentId;
    String StudentId;
    String TeacherId;
    String Link;
    String ReservationId;
    String AppointmentType;
    String Comment;

    public void setAppointmentId(Integer appointmentId) {
        AppointmentId = appointmentId;
    }

    public void setStudentId(String studentId) {
        StudentId = studentId;
    }

    public void setTeacherId(String teacherId) {
        TeacherId = teacherId;
    }

    public void setLink(String link) {
        Link = link;
    }

    public void setReservationId(String reservationId) {
        ReservationId = reservationId;
    }

    public void setAppointmentType(String appointmentType) {
        AppointmentType = appointmentType;
    }

    public void setComment(String comment) {
        Comment = comment;
    }

    public void setAccept(String accept) {
        Accept = accept;
    }

    String Accept;
    public Integer getAppointmentId() {
        return AppointmentId;
    }

    public String getStudentId() {
        return StudentId;
    }

    public String getTeacherId() {
        return TeacherId;
    }

    public String getLink() {
        return Link;
    }

    public String getReservationId() {
        return ReservationId;
    }

    public String getAppointmentType() {
        return AppointmentType;
    }

    public String getComment() {
        return Comment;
    }

    public String getAccept() {
        return Accept;
    }
}