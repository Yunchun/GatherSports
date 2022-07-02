package com.example.sportgather.service;

import com.example.sportgather.domain.Message;
import com.example.sportgather.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private static MessageRepository msgRepository;

    public MessageService(MessageRepository msgRepository){
        this.msgRepository = msgRepository;
    }

    public List<Message> queryAllMsg(){
        List<Message> msgLst = msgRepository.findAllMsg();
        return msgLst;
    }

    public static String addMsg(String title, String content, String id) {
        msgRepository.saveMsg(title, content, id);
        return "add message done";
    }

}
