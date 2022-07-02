package com.example.sportgather.service;


import com.example.sportgather.domain.*;
import com.example.sportgather.repository.AppointmentRepository;
import com.example.sportgather.repository.CourtRepository;
import com.example.sportgather.repository.ReservationRepository;
import com.example.sportgather.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentService {


    private final AppointmentRepository appointmentRepository;
    private final ReservationRepository reservationRepository;
    private  final CourtRepository courtRepository;
    private final UserRepository userRepository;
    public AppointmentService(AppointmentRepository appointmentRepository,ReservationRepository reservationRepository, CourtRepository courtRepository, UserRepository userRepository) {
        this.appointmentRepository = appointmentRepository;
        this.reservationRepository = reservationRepository;
        this.courtRepository = courtRepository;
        this.userRepository = userRepository;
    }
    public List<AppointmentInfo> findAcceptAppointment(String userId, String status){
        List<Appointment> accepted = appointmentRepository.findAllAcceptAppointment(userId, status);
        System.out.println(accepted.size());
        List<AppointmentInfo> infoList = new ArrayList<>();
        // iterate to update appointment info
        for (Appointment app : accepted){
            AppointmentInfo info = new AppointmentInfo();
            info.setAppointmentId(app.getAppointmentId());
            info.setReservationId(app.getReservationId());
            // get reservation info
            Reservation reservation = reservationRepository.findReservationByReservationId(app.getReservationId());
            info.setTime(reservation.getBeginTime());
            info.setAccept("T");
            infoList.add(info);
            System.out.println(app.getTeacherId());
            // set court location
            info.setLocation(courtRepository.findLocationByPk(reservation.getCourtId()));
            User teacher = userRepository.findUserById(app.getTeacherId()).get(0);
            info.setTeacherName(teacher.getFirstName() + " " + teacher.getLastName());
        }
        return infoList;
    }
    public void insertNewAppointment(String StudentId, String TeacherId, String Link, String ReservationId, String AppointmentType ,String Comment,String Accept) {
        Appointment appointment = new Appointment();
        Integer Appointment_ID = appointmentRepository.findMaxAppointId();
        System.out.println(Appointment_ID);
        if (Appointment_ID==null){
            Appointment_ID = 1;
        }
        else{
            Appointment_ID = Appointment_ID+1;
        }


        appointment.setAppointmentId(Appointment_ID);
        appointment.setAppointmentType(AppointmentType);
        appointment.setAccept(Accept);
        appointment.setComment(Comment);
        appointment.setReservationId(ReservationId);
        appointment.setStudentId(StudentId);
        appointment.setTeacherId(TeacherId);
        appointment.setLink(Link);
        appointmentRepository.insertNewAppointment(appointment);
    }
    public List<AppointmentReservation> findAllAppointmentReservationByUserId(String userId){
        List<Reservation> reservations = reservationRepository.findAvailableReservation(userId);
        List<User> student = userRepository.findUserById(userId);
        User student_select = student.get(0);
        String studentName = student_select.getFirstName()+" "+student_select.getLastName();
        System.out.println("list size" + reservations.size());

        List<AppointmentReservation> appointmentReservations = new ArrayList<>();
        for (Reservation reservation : reservations){
            // set reservation Location
            AppointmentReservation appointmentReservation = new AppointmentReservation();
            appointmentReservation.setStartDate(reservation.getBeginTime());
            appointmentReservation.setId(reservation.getReservationId());
            appointmentReservation.setEndDate(reservation.getEndTime());
            appointmentReservation.setStudentName(studentName);

            String courtId = reservation.getCourtId();
            appointmentReservation.setLocation(courtRepository.findLocationByPk(courtId));
            String SportName = courtRepository.findSportByCourtId(courtId);
            appointmentReservation.setSportName(SportName);
            appointmentReservation.setTitle(SportName+" Reservation");
            List<User> teachers = appointmentRepository.findTeacherBySportName(SportName);
            List<TeacherRecommend> teacherRecommends = new ArrayList<>();
            for (User teacher : teachers){
                TeacherRecommend teacherRecommend = new TeacherRecommend();
                teacherRecommend.setId(teacher.getUserId());
                teacherRecommend.setText(teacher.getFirstName()+" "+teacher.getLastName());
                teacherRecommends.add(teacherRecommend);

            }
            appointmentReservation.setTeacherRecommends(teacherRecommends);
            appointmentReservations.add(appointmentReservation);
        }
        return appointmentReservations;
    }


}

