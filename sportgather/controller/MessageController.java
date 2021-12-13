package com.example.sportgather.controller;
import com.example.sportgather.domain.Message;
import com.example.sportgather.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "message")

public class MessageController {

    private final MessageService msgService;

    @Autowired

    public MessageController(MessageService msgService) {
        this.msgService = msgService;
    }

    @GetMapping(path = "/all")
    public List<Message> findAllMsg(){
        System.out.println("findAllMsg is now called");
        return msgService.queryAllMsg();
    }

    @PostMapping(path="/saveMsg/{title}/{content}/{id}")
    public String saveMsg(@PathVariable("title") String title,
                           @PathVariable("content") String content,
                           @PathVariable("id") String id) {
        System.out.println("saveMsg is called");
        return MessageService.addMsg(title, content, id);
    }

}
