package com.example.sportgather.service;

import com.example.sportgather.domain.Course;
import com.example.sportgather.repository.UserRepository;
import org.apache.catalina.users.GenericRole;
import org.springframework.stereotype.Service;
import com.example.sportgather.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class EnrollmentService {
    @Autowired
    private static EnrollmentRepository enrollmentRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public static String enrollCourse(String sid, String cid){
        enrollmentRepository.enrollCourse(sid, cid);
        return "success";
    }

    public static int fetchRegistered(String sid, String cid) {
        return enrollmentRepository.fetchRegistered(sid, cid);
    }

    public List<Course> findEnrollmentByUser(String userId){
        return enrollmentRepository.findEnrollmentByUserId(userId);
    }

    public void deleteEnrollment(String userId, String courseId){
        enrollmentRepository.deleteEnrollmentByPk(userId, courseId);
    }
}
