package com.example.sportgather.service;

import com.example.sportgather.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

    @Autowired
    private static UserRepository userRepository;

    public LoginService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public static String showId(String email){
        String id = userRepository.displayId(email);
        System.out.println(id);
        return id;
    }

    public static String showPassword(String email){
        String password = userRepository.displayPassword(email);
        System.out.println(password);
        return password;
    }

}
