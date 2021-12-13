package com.example.sportgather.controller;


import com.example.sportgather.domain.Sport;
import com.example.sportgather.service.SportService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SportController {

    private final SportService sportService;

    public SportController(SportService sportService) {
        this.sportService = sportService;
    }

    @GetMapping("/sport")
    public List<Sport> findSportName(){
        return sportService.findAllSportName();
    }


}