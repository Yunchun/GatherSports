package com.example.sportgather.service;

import com.example.sportgather.domain.Sport;
import com.example.sportgather.repository.SportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SportService {

    private final SportRepository sportRepository;

    public SportService(SportRepository sportRepository) {
        this.sportRepository = sportRepository;
    }

    public List<Sport> findAllSportName(){
       return sportRepository.findAllSport();
    }

}