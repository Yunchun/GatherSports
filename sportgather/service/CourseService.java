package com.example.sportgather.service;

import com.example.sportgather.domain.Course;
import com.example.sportgather.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private static CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public Course showCourse(String id){
        Course info = courseRepository.fetchCourse(id).get(0);
        return info;
    }

    public void updateDesc(String desc, String cid) {
        courseRepository.updateDesc(desc, cid);
    }

    public void updateTitle(String title, String cid) {
        courseRepository.updateTitle(title, cid);
    }

}
