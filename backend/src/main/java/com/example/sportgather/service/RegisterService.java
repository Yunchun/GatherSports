package com.example.sportgather.service;

import com.example.sportgather.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    @Autowired
    private static UserRepository userRepository;

    public RegisterService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static String addUser(String firstName, String email, String password) {
        userRepository.saveUser(firstName, email, password);
        return "add user done";
    }

}
