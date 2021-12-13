package com.example.sportgather.service;

import com.example.sportgather.domain.*;
import com.example.sportgather.repository.*;


import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
public class ReservationService {

    private final CourtRepository courtRepository;
    private final ReservationRepository reservationRepository;
    private final SportRepository sportRepository;
    private final UserRepository userRepository;
    private final AppointmentRepository appointmentRepository;

    public ReservationService(ReservationRepository reservationRepository, CourtRepository courtRepository, SportRepository sportRepository, UserRepository userRepository, AppointmentRepository appointmentRepository) {
        this.reservationRepository = reservationRepository;
        this.courtRepository = courtRepository;
        this.sportRepository = sportRepository;
        this.userRepository = userRepository;
        this.appointmentRepository = appointmentRepository;
    }

    public List<Reservation> queryReservationByUserId(String id) {
        List<Reservation> list = reservationRepository.findByPk(id);
        return list;
    }

    public List<ReservationStar> queryReservationStar(){
        int top = 14;
        Map<String, Integer> map = new HashMap<>();
        List<Reservation> list = reservationRepository.findByAll();

        /* add info into a hashmap to count frequency */
        for (Reservation reservation : list){
            map.put(reservation.getUserId(), map.getOrDefault(reservation.getUserId(), 0) + 1);
        }

        /* priorityqueue for top 15 */
        PriorityQueue<Map.Entry<String, Integer>> pq = new PriorityQueue<>(((o1, o2) -> o1.getValue() - o2.getValue()));
        for (Map.Entry<String, Integer> entry : map.entrySet()){
            if (pq.size() < top){
                pq.add(entry);
            } else if (pq.size() == top && entry.getValue() > pq.peek().getValue()){
                pq.poll();
                pq.add(entry);
            }
        }

        /* res to store the final result*/
        List<ReservationStar> res = new ArrayList<>();
        String[] sportType = new String[]{"Basketball", "Football","Cycling","Badminton","Bowling","Meditation","Squash","Figure Skating","" +
                "American Football","Boxing","Volleyball","Tennis","Table Tennis","Billiards"};
        int i = 0;
        while (!pq.isEmpty()){
            Map.Entry<String, Integer> entry = pq.poll();
            User user = (userRepository.findUserById(entry.getKey())).get(0);
            ReservationStar star = new ReservationStar();
            star.setType(sportType[i]);
            i++;
            star.setName(user.getFirstName() + " " + user.getLastName());
            star.setReservationTimes(entry.getValue());
            res.add(0, star);
        }
        return res;
    }

    public List<CourtReservation> findAvailableTimeBySport(String sportName, Date date){
        // the list that stores all CourtReservation
        List<CourtReservation> ans = new ArrayList<>();

        // all courts name of the selected sportname
        List<String> courtNames = courtRepository.findCourtsBySportName(sportName);
        List<String> courtId = courtRepository.findCourtsIdBySportName(sportName);
        for (int i =0; i<courtNames.size();i++){
            CourtReservation courtReservation = new CourtReservation();
            courtReservation.setCourtName(courtNames.get(i));
            //System.out.println(courtId.get(i));
            courtReservation.setCourtId(courtId.get(i));
            courtReservation.setAvailableTime(findAvailableTime(courtNames.get(i),date));
            ans.add(courtReservation);
        }
        return ans;
    }

    public void insertNewReservation(String CourtId,  String UserId, String BeginTime) {
        StringBuilder sb = new StringBuilder();
        sb.append(BeginTime.substring(0,11));
        sb.append(Integer.parseInt(BeginTime.substring(11, 13)) + 1);
        sb.append(BeginTime.substring(13, BeginTime.length()));
        String EndTime = sb.toString();
        Integer Reservation_Id = reservationRepository.findMaxReservationId();
        Reservation_Id = Reservation_Id+1;
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        try {
            Date BeginTime_date = dateFormat.parse(BeginTime);
            Date EndTime_date = dateFormat.parse(EndTime);
            Reservation reservation = new Reservation();
            reservation.setBeginTime(BeginTime_date);
            reservation.setEndTime(EndTime_date);
            reservation.setUserId(UserId);
            reservation.setCourtId(CourtId);
            // conflict hong & hanyang
            reservation.setReservationId(String.valueOf(Reservation_Id));
            reservationRepository.insertNewReservation(reservation);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public List<Reservation> findAllReservationByUserId(String userId){
        List<Reservation> reservations = reservationRepository.findByPk(userId);
        System.out.println("list size" + reservations.size());
        List<Reservation> ans = new ArrayList<>();
        for (int i = 0; i < reservations.size(); i++){
            Reservation reservation = reservations.get(i);

            Date beginTime = reservation.getBeginTime();
            Date date = Calendar.getInstance().getTime();
            if (beginTime.after(date)){
                String courtId = reservation.getCourtId();
                String courtLocation = courtRepository.findLocationByPk(courtId);
                reservation.setUserId(courtRepository.findSportByCourtId(courtId));
                reservation.setCourtId(courtLocation);
                ans.add(reservation);
            } else {
                reservationRepository.deleteReservationByPk(reservation.getReservationId());
                appointmentRepository.deleteAppointmentByReservationId(reservation.getReservationId());
            }
        }
        return ans;
    }

    public List<SportStar> getSportStar(String topN) {
        List<SportStar> list = reservationRepository.getSportStar(topN);
        return list;
    }
    public List<Court> findLocationByAll() {
        List<Court> list = courtRepository.findLocationByAll();
        return list;
    }
    public List<String> findCourtNameByLocation(String location) {
        List<String> list = courtRepository.findCourtNameByLocation(location);
        return list;
    }
    public List<String> findCourtNameByAll( ) {
        List<String> list = courtRepository.findCourtNameByAll();
        return list;
    }

    public List<String> findSportNameThathasCourtbyAll( ) {
        List<String> list = sportRepository.findSportNameThathasCourtbyAll();
        return list;
    }
    public List<Court> findCourtNameBySportName(String SportName ) {
        List<Court> list = courtRepository.findCourtNameBySportName(SportName);
        return list;
    }

    public List<String> findAvailableTime(String courtName, Date date){
        DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");
        String strDate = dateFormat.format(date).substring(0,10);

        // return all reserved time
        Set<String> reservedSet = new HashSet<>(reservationRepository.findTodayReservation(strDate + "%",courtName));

        // remove reserved time
        Set<String> availableSet = new HashSet<>();
        for (int i = 8; i <= 22; i++){
            String sb = strDate;
            if (i < 10){
                sb += " 0" + i + ":00:00";
            } else {
                sb += " " + i + ":00:00";
            }
            availableSet.add(sb);
        }

        // get all available time
        availableSet.removeAll(reservedSet);
        List<String> availableTime = new ArrayList<>(availableSet);
        availableTime.sort((String::compareTo));
        return availableTime;
    }

    public void deleteReservation(String reservationId){
        if (queryReservationByReservationId(reservationId)){
            reservationRepository.deleteReservationByPk(reservationId);
            appointmentRepository.deleteAppointmentByReservationId(reservationId);
            System.out.println("Reservation with ID " + reservationId + " has been canceled");
        }
        else {
            System.out.println("the reservation with ID = " + reservationId + "has been canceled," +
                    " please try again");
        }
    }

    public boolean queryReservationByReservationId(String reservationId){
        Reservation reservation= reservationRepository.findReservationByReservationId(reservationId);
        return reservation != null;
    }
}