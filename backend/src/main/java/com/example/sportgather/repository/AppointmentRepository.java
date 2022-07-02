package com.example.sportgather.repository;


import com.example.sportgather.domain.Appointment;
import com.example.sportgather.domain.Reservation;
import com.example.sportgather.domain.Teacher;
import com.example.sportgather.domain.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface AppointmentRepository {
    @Insert("Insert into Appointment(AppointmentId, StudentId, TeacherId, Link, ReservationId, AppointmentType, Comment, Accept ) Values(#{AppointmentId}," +
            "#{StudentId}, #{TeacherId}, #{Link}, #{ReservationId}, #{AppointmentType},#{Comment},#{Accept} )")
    void insertNewAppointment(Appointment appointment);
    @Select("SELECT max(Appointment.AppointmentId) FROM Appointment")
    Integer findMaxAppointId();
    @Select("SELECT * From User u1 where u1.UserId in (SELECT u.UserId  FROM User u  JOIN Teacher t on t.TeacherId = u.UserId WHERE t.TeacherId in (SELECT c.TeacherId FROM Course c  JOIN Sport s on c.SportId = s.SportId WHERE s.SportName = #{SportName}))")
    List<User> findTeacherBySportName(@Param("SportName") String SportName);
    @Select("SELECT * FROM Appointment WHERE Accept = #{status} AND StudentId = #{userId}")
    List<Appointment> findAllAcceptAppointment(@Param("userId") String userId, @Param("status") String status);

    @Delete("DELETE FROM Appointment WHERE ReservationId = #{ReservationId}")
    void deleteAppointmentByReservationId(@Param("ReservationId") String reservationId);
}