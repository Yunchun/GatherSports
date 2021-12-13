package com.example.sportgather.repository;

import com.example.sportgather.domain.Course;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CourseSearchRepository {

    @Select("SELECT * FROM Course ORDER BY Rating DESC")
    List<Course> findAllCourse();

    @Select("SELECT * FROM Course NATURAL JOIN Hobby WHERE StudentId = #{UserId} ORDER BY Rating DESC")
    List<Course> findCourseByHobby(@Param("UserId") String UserId);

    @Select("SELECT * FROM Course NATURAL JOIN Sport WHERE SportId = #{sportId} ORDER BY Rating DESC")
    List<Course> findCourseBySport(@Param("sportId") String sportId);

    @Select("SELECT * FROM Course WHERE CourseId = #{courseId} ORDER BY Rating DESC")
    Course findCourseByPk(@Param("courseId") String courseId);

    // stored procedure to find courseIds that at least two mates have attended
    @Select("CALL CourseByMates(#{UserId})")
    List<String> findMateCourseByUserId(@Param("UserId") String userId);
}