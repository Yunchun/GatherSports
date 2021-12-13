package com.example.sportgather.controller;

import com.example.sportgather.domain.*;
import com.example.sportgather.service.AppointmentService;
import com.example.sportgather.service.EnrollmentService;
import com.example.sportgather.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "overview")
@CrossOrigin(origins = "http://localhost:3000")
public class OverViewController {

    private final ReservationService reservationService;
    private final EnrollmentService enrollmentService;
    private final AppointmentService appointmentService;

    @Autowired
    public OverViewController(ReservationService reservationService, EnrollmentService enrollmentService, AppointmentService appointmentService) {
        this.reservationService = reservationService;
        this.enrollmentService = enrollmentService;
        this.appointmentService = appointmentService;
    }

    // reservation operations
    @GetMapping("/reservation")
    public List<Reservation> findReservationById(@RequestParam("id") String userId){
        List<Reservation> list = reservationService.findAllReservationByUserId(userId);
        for (Reservation reservation: list){
            System.out.println(reservation.getReservationId());
        }
        return list;
    }

    @GetMapping(path = "/reservationstar")
    public List<ReservationStar> findSportStar(){
        System.out.println("findSportStar is called");
        return reservationService.queryReservationStar();
    }

    @CrossOrigin
    @PostMapping(path = "/reservation/cancel/{reservationid_delete}")
    public void cancelReservation(@PathVariable("reservationid_delete") String reservationId){
        System.out.println("Receiving request for deleting " + reservationId);
        reservationService.deleteReservation(reservationId);
    }

    @GetMapping("/enrollment")
    public List<Course> findEnrollmentById(@RequestParam("id") String userId){
        System.out.println("Receiving request for deleting " + userId);
        return enrollmentService.findEnrollmentByUser(userId);
    }

    //waiting change to post method
    @CrossOrigin
    @GetMapping("/enrollment/cancel/{userId}/{courseId}")
    public void cancelEnrollment(@PathVariable("userId") String userId, @PathVariable("courseId")String courseId){
        enrollmentService.deleteEnrollment(userId, courseId);
    }

    @GetMapping("/appointment/{status}")
    public List<AppointmentInfo> findAcceptedAppointment(@PathVariable("status") String status, @RequestParam("id") String userId){
        System.out.println(status);
        return appointmentService.findAcceptAppointment(userId, status);
    }
}