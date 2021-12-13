package com.example.sportgather.service;


import com.example.sportgather.domain.*;
import com.example.sportgather.repository.CourtRepository;
import com.example.sportgather.repository.ReservationRepository;
import com.example.sportgather.repository.TeacherOverviewRepository;
import com.example.sportgather.repository.UserRepository;
import org.springframework.scheduling.support.SimpleTriggerContext;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TeacherOverviewService {

    private final TeacherOverviewRepository teacherOverviewRepository;
    private final CourtRepository courtRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;

    public TeacherOverviewService(TeacherOverviewRepository teacherOverviewRepository,
                                  CourtRepository courtRepository,
                                  UserRepository userRepository,
                                  ReservationRepository repository) {
        this.teacherOverviewRepository = teacherOverviewRepository;
        this.courtRepository = courtRepository;
        this.userRepository = userRepository;
        this.reservationRepository = repository;
    }

    public List<AppointmentInfo> findAllAppointment(String status, String teacherId){
        List<Appointment> apps = teacherOverviewRepository.findAllAppointmentByTeacher(status, teacherId);
        List<AppointmentInfo> infoList = new ArrayList<>();
        for (Appointment app : apps) {
            // find user
            User student = userRepository.findUserById(app.getStudentId()).get(0);
            // find reservation
            Reservation reservation = reservationRepository.findReservationByReservationId(app.getReservationId());
            String courtLocation = courtRepository.findLocationByPk(reservation.getCourtId());

            // populate the appointment info
            AppointmentInfo info = new AppointmentInfo();
            info.setStudentName(student.getFirstName() + " " + student.getLastName());
            info.setAppointmentId(app.getAppointmentId());
            info.setTime(reservation.getBeginTime());
            info.setLocation(courtLocation);
            info.setReservationId(reservation.getReservationId());
            info.setAccept(status);
            infoList.add(info);
        }
        return infoList;
    }

    public void deleteAppointmentById(String appointmentId){
        teacherOverviewRepository.deleteAppointmentByPk(appointmentId);
    }

    public void acceptAppointment(String appointmentId){
        teacherOverviewRepository.updateAcceptStateToTrue(appointmentId);
    }

    public List<Course> findAllCourse(String teacherId){
        return teacherOverviewRepository.findAllCourseByTeacher(teacherId);
    }

}