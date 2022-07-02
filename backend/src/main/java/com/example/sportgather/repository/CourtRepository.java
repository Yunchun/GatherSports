package com.example.sportgather.repository;

import com.example.sportgather.domain.Court;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface CourtRepository {
    @Select("SELECT Location FROM Court WHERE CourtId = #{CourtId}")
    String findLocationByPk(@Param("CourtId") String CourtId);

    @Select("SELECT Location FROM Court ")
    List<Court> findLocationByAll();

    @Select("SELECT Name  FROM Court Where Location = #{location} ")
    List<String> findCourtNameByLocation(@Param("location") String location);

    @Select("SELECT Name  FROM Court ")
    List<String> findCourtNameByAll();

    @Select("SELECT *  FROM Court Join Sport on Court.SportId = Sport.SportId  Where Sport.SportName = #{SportName} ")
    List<Court> findCourtNameBySportName(@Param("SportName") String SportName);

    @Select("SELECT Court.Name FROM Court NATURAL JOIN Sport WHERE SportName = #{SportName} Order By Court.Name")
    List<String> findCourtsBySportName(@Param("SportName") String SportName);

    @Select("SELECT Court.CourtId FROM Court NATURAL JOIN Sport WHERE SportName = #{SportName} Order By Court.Name")
    List<String> findCourtsIdBySportName(@Param("SportName") String SportName);

    @Select("SELECT SportName FROM Court NATURAL JOIN Sport WHERE CourtId = #{CourtId}")
    public String findSportByCourtId(@Param("CourtId") String CourtId);
}