package com.example.sportgather.repository;

import com.example.sportgather.domain.Appointment;
import com.example.sportgather.domain.Course;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface TeacherOverviewRepository {

    @Select("SELECT * FROM Appointment WHERE Accept = #{status} AND TeacherId = #{TeacherId}")
    List<Appointment> findAllAppointmentByTeacher(@Param("status") String status, @Param("TeacherId") String teacherId);

    @Delete("DELETE FROM Appointment WHERE AppointmentId = #{AppointmentId}")
    void deleteAppointmentByPk(@Param("AppointmentId") String appointmentId);

    @Update("UPDATE Appointment SET Accept = 'T' WHERE AppointmentId = #{AppointmentId}")
    void updateAcceptStateToTrue(@Param("AppointmentId") String appointmentId);

    @Select("SELECT * FROM Course WHERE TeacherId = #{TeacherId}")
    List<Course> findAllCourseByTeacher(@Param("TeacherId") String teacherId);

}