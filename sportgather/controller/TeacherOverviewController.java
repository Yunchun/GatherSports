package com.example.sportgather.controller;


import com.example.sportgather.domain.AppointmentInfo;
import com.example.sportgather.domain.Course;
import com.example.sportgather.service.TeacherOverviewService;
import org.apache.ibatis.annotations.Select;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/teacher")
@CrossOrigin(origins = "http://localhost:3000")
public class TeacherOverviewController {

    private final TeacherOverviewService service;


    public TeacherOverviewController(TeacherOverviewService service) {
        this.service = service;
    }

    @GetMapping("/appointment/{status}")
    List<AppointmentInfo> findAppointmentByTeacher(@PathVariable("status") String status,
                                                   @RequestParam("teacherid") String teacherId){
        return service.findAllAppointment(status, teacherId);
    }

    @DeleteMapping("/appointment/cancel/{appointmentId}")
    void refuseAppointment(@PathVariable("appointmentId") String appointmentId){
        service.deleteAppointmentById(appointmentId);
    }

    @PutMapping("/appointment/accept/{appointmentId}")
    void acceptAppointment(@PathVariable("appointmentId") String appointmentId){
        service.acceptAppointment(appointmentId);
    }

    @GetMapping("/course")
    List<Course> findAllCourse(@RequestParam("teacherId") String teacherId){
        return service.findAllCourse(teacherId);
    }

}