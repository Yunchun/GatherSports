package com.example.sportgather.repository;

import com.example.sportgather.domain.Message;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface MessageRepository {

    @Select("SELECT DISTINCT MessageId, LaunchTime, Title, Content, StudentId, FirstName, LastName, Email, Phone FROM Message JOIN User AS u ON Message.StudentId = u.UserId ORDER BY LaunchTime DESC")
    List<Message> findAllMsg();

    @Insert("INSERT INTO Message VALUES ((SELECT CAST(COUNT(*) AS CHAR(50)) FROM Message AS m), NOW(), #{Title}, #{Content}, #{StudentId})")
    void saveMsg(@Param("Title") String title, @Param("Content") String content, @Param("StudentId") String id);
}
