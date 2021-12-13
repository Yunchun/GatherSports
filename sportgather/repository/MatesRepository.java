package com.example.sportgather.repository;

import com.example.sportgather.domain.Mates;
import org.apache.ibatis.annotations.*;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Mapper
public interface MatesRepository {
    @Insert("INSERT INTO Mates VALUES (#{RequestId}, #{ReceiverId}, 'Wait')")
    void friendRequest(@Param("RequestId") String requestId, @Param("ReceiverId") String receiverId);

    @Update("UPDATE Mates SET State=#{Response} WHERE RequestId=#{RequestId} AND ReceiverId=#{ReceiverId}")
    void updateState(@Param("RequestId") String requestId, @Param("ReceiverId") String receiverId, @Param("Response") String state);


    @Select("Select RequestId From Mates WHERE ReceiverId=#{ReceiverId} and State='Wait' Limit 5")
    List<String> fetchRequest(@Param("ReceiverId") String receiverId);

    @Select("Select * From Mates WHERE RequestId=#{RequestId}")
    List<Mates> fetchAllReqSent(@Param("RequestId") String receiverId);

}
