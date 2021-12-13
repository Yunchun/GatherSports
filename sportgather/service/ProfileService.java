package com.example.sportgather.service;

import com.example.sportgather.domain.User;
import com.example.sportgather.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProfileService {

    @Autowired
    private static UserRepository userRepository;

    public ProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> queryAll(){
        List<User> list = userRepository.findAll();
        return list;
    }

    public static List<User> queryUserById(String id) {
        List<User> users = userRepository.findUserById(id);
        return users;
    }

    public static String modifyName(String lastName, String id) {
        userRepository.updateName(lastName, id);
        return "update name done";
    }

    public static String modifyGender(String gender, String id) {
        userRepository.updateGender(gender, id);
        return "update gender done";
    }

    public static String modifyAge(Integer age, String id) {
        userRepository.updateAge(age, id);
        return "update age done";
    }

    public static String modifyPhone(String phone, String id) {
        userRepository.updatePhone(phone, id);
        return "update phone done";
    }

    public static String modifyLocation(String location, String id) {
        userRepository.updateLocation(location, id);
        return "update location done";
    }

    public static String modifyUserType(String type, String id) {
        userRepository.updateUserType(type, id);
        return "update user type done";
    }
}
