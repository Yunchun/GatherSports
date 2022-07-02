package com.example.sportgather.controller;
import com.example.sportgather.domain.Course;
import com.example.sportgather.service.CourseSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("coursesearch")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseSearchController {

    private final CourseSearchService courseSearchService;

    @Autowired
    public CourseSearchController(CourseSearchService courseSearchService) {
        this.courseSearchService = courseSearchService;
    }

    @GetMapping("/all")
    public List<Course> findAllCourse(){
        return courseSearchService.findAllCourse();
    }


    @GetMapping("/hobby")
    public List<Course> findCourseByHobby(@RequestParam("id") String userId){

        List<Course> list = courseSearchService.recommendByHobby(userId);
        return list;
    }

    @GetMapping("mates")
    public List<Course> findCourseByMate(@RequestParam("id") String userId){
        return courseSearchService.recommendByMate(userId);
    }

    @GetMapping("sport")
    public List<Course> findCourseBySport(@RequestParam("sportId") String sportId){
        System.out.println(sportId);
        return courseSearchService.recommendBySport(sportId);
    }
}