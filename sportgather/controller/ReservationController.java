package com.example.sportgather.controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.sportgather.domain.Court;
import com.example.sportgather.domain.CourtReservation;
import com.example.sportgather.domain.Reservation;
import com.example.sportgather.domain.SportStar;
import com.example.sportgather.repository.ReservationRepository;
import com.example.sportgather.service.ReservationService;

import org.jboss.jandex.VoidType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(path = "/reservation")
@CrossOrigin(origins = "http://localhost:3000/")
public class ReservationController {
    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }
    @GetMapping("/userid={id}")
    public  List<Reservation> getbyUserId(@PathVariable String id){
        return  reservationService.queryReservationByUserId(id);
    }

    @GetMapping("/getsportstar")
    public List<SportStar> getSportStar(){
        return  reservationService.getSportStar("2");
    }

    @GetMapping("/SportName={SportName}")
    public List<Court> findCourtNameBySportName(@PathVariable String SportName){
        return  reservationService.findCourtNameBySportName(SportName);
    }
    // problem
    @GetMapping("/CourtId={courtId}/date={date}")
    public List<String> findAvailableTime(@PathVariable String CourtId, String date){
        List<String> list = new ArrayList<>();
        try {
            Date date1 = new SimpleDateFormat("yyyy-MM-dd").parse(date);
            list =  reservationService.findAvailableTime(CourtId, date1);
        }
        catch (Exception e){
            e.printStackTrace();
        }
        return list;
    }

    @GetMapping("/findSportNameThathasCourtbyAll")
    public List<String> findSportNameThathasCourtbyAll(){
        return  reservationService.findSportNameThathasCourtbyAll();
    }
    @GetMapping("/findAvailableTimeBySport/{SportName}/{date}")
    public List<CourtReservation> findAvailableTimeBySport(@PathVariable String SportName, @PathVariable String date){
        List<CourtReservation> list = new ArrayList<>();
        try {
            Date date1=new SimpleDateFormat("yyyy-MM-dd").parse(date);
            list = reservationService.findAvailableTimeBySport(SportName, date1);
            for (CourtReservation courtReservation : list){
                System.out.println(courtReservation.getCourtId());
            }
            return list;
        }
        catch (Exception e) {
            e.printStackTrace();
        }
        return  list;



    }
    @GetMapping("/insertreservation")
    public void InsertReservation(@RequestParam("CourtId")String CourtId,@RequestParam("BeginTime")String BeginTime,@RequestParam("UserId")String User_id) {

        System.out.println("findScoreMates is called");
        // String CourtId = customQuery.get("CourtId")!=null?customQuery.get("CourtId"):"";
        // String UserId = customQuery.get("UserId")!=null?customQuery.get("UserId"):"";
        // String BeginTime_string = customQuery.get("BeginTime")!=null?customQuery.get("BeginTime"):"";

        reservationService.insertNewReservation(CourtId, User_id, BeginTime);

    }
}
