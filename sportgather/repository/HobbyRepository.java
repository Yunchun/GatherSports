package com.example.sportgather.repository;

import com.example.sportgather.domain.Sport;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface HobbyRepository {

    @Select("SELECT s.SportName FROM Sport s NATURAL JOIN Hobby h WHERE h.StudentId = #{UserId}")
    List<Sport> fetchHobbies(@Param("UserId") String id);
}
