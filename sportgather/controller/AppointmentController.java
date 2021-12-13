package com.example.sportgather.controller;

import com.example.sportgather.domain.AppointmentReservation;
import com.example.sportgather.domain.Reservation;
import com.example.sportgather.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "appointment")
@CrossOrigin(origins = "http://localhost:3000/")
public class AppointmentController {
    private final AppointmentService appointmentService;
    @Autowired
    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }
    @GetMapping("/insertappointment")
    public void InsertReservation(@RequestParam("StudentId")String StudentId,@RequestParam("TeacherId")String TeacherId,@RequestParam("Link")String Link, @RequestParam("ReservationId")String ReservationId, @RequestParam("AppointmentType")String AppointmentType, @RequestParam("Comment")String Comment, @RequestParam("Accept")String Accept) {

        System.out.println("InsertReservation is called");
        // String CourtId = customQuery.get("CourtId")!=null?customQuery.get("CourtId"):"";
        // String UserId = customQuery.get("UserId")!=null?customQuery.get("UserId"):"";
        // String BeginTime_string = customQuery.get("BeginTime")!=null?customQuery.get("BeginTime"):"";

        appointmentService.insertNewAppointment(StudentId, TeacherId, Link, ReservationId, AppointmentType, Comment, Accept);
    }
    @GetMapping("/userid={id}")
    public List<AppointmentReservation> findAllAppointmentReservationByUserId(@RequestParam("id")String UserId) {

        System.out.println("findAllAppointmentReservationByUserId is called");

        return appointmentService.findAllAppointmentReservationByUserId(UserId);
    }

    }