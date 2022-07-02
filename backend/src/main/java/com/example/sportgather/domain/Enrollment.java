package com.example.sportgather.domain;

public class Enrollment {
    private String StudentId;
    private String CourseId;
    public void setPK(String s, String c) {
        StudentId = s;
        CourseId = c;
    }

    public String getStudentId() {
        return StudentId;
    }

    public String getCourseId() {
        return CourseId;
    }
}
