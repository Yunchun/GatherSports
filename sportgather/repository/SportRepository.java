package com.example.sportgather.repository;

import com.example.sportgather.domain.Sport;
import com.example.sportgather.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.data.util.Pair;

import java.util.List;


@Mapper
public interface SportRepository {
    @Select("SELECT DISTINCT SportName FROM Sport Natural Join Court ")
    List<String> findSportNameThathasCourtbyAll();

    @Select("SELECT * FROM Sport")
    List<Sport> findAllSport();
}

