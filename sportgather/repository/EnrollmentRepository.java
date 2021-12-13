package com.example.sportgather.repository;

import com.example.sportgather.domain.Course;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface EnrollmentRepository {
    @Insert("INSERT INTO Enrollment VALUES (#{StudentId}, #{CourseId})")
    void enrollCourse(@Param("StudentId") String studentid, @Param("CourseId") String courseid);

    @Select("SELECT Count(*) FROM Enrollment WHERE StudentId=#{StudentId} AND CourseId=#{CourseId}")
    int fetchRegistered(@Param("StudentId") String studentid, @Param("CourseId") String courseid);

    @Select("SELECT * FROM Enrollment NATURAL JOIN Course WHERE StudentId = #{userId}")
    List<Course> findEnrollmentByUserId(@Param("userId") String userId);

    @Delete("DELETE FROM Enrollment WHERE StudentId = #{userId} AND CourseId = #{courseId}")
    void deleteEnrollmentByPk(@Param("userId")String userId, @Param("courseId")String courseid);
}
