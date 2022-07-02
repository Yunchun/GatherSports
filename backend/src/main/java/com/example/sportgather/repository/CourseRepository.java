package com.example.sportgather.repository;

import com.example.sportgather.domain.Course;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface CourseRepository {
    @Select("SELECT * FROM Course WHERE CourseId = #{CourseId}")
    List<Course> fetchCourse(@Param("CourseId") String id);

    @Update("Update Course Set Description =#{Desc} Where CourseId =#{CourseId} ")
    void updateDesc(@Param("Desc") String desc, @Param("CourseId") String cid);

    @Update("Update Course Set Name =#{Title} Where CourseId =#{CourseId} ")
    void updateTitle(@Param("Title") String title, @Param("CourseId") String cid);
}
