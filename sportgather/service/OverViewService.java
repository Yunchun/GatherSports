package com.example.sportgather.service;

import com.example.sportgather.domain.User;
import com.example.sportgather.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OverViewService {
    @Autowired
    private UserRepository userRepository;

    public OverViewService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
}
