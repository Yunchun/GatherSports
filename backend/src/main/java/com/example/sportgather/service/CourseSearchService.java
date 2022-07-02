package com.example.sportgather.service;

import com.example.sportgather.domain.Course;
import com.example.sportgather.repository.CourseSearchRepository;
import com.example.sportgather.repository.MatesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CourseSearchService {

    private final CourseSearchRepository courseSearchRepository;
    private final MatesRepository matesRepository;

    @Autowired
    public CourseSearchService(CourseSearchRepository courseSearchRepository, MatesRepository matesRepository) {
        this.courseSearchRepository = courseSearchRepository;
        this.matesRepository = matesRepository;
    }

    public List<Course> findAllCourse(){
        return courseSearchRepository.findAllCourse();
    }

    public List<Course> recommendByHobby(String userId){
        return courseSearchRepository.findCourseByHobby(userId);
    }

    public List<Course> recommendBySport(String sportId){
        return courseSearchRepository.findCourseBySport(sportId);
    }

    public List<Course> recommendByMate(String userId){
        List<String> idList = courseSearchRepository.findMateCourseByUserId(userId);
        List<Course> courses = new ArrayList<>();
        for (String id : idList){
            courses.add(courseSearchRepository.findCourseByPk(id));
        }
        return courses;
    }

}