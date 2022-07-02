package com.example.sportgather.controller;

import com.example.sportgather.domain.User;
import com.example.sportgather.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequestMapping(path = "profile")
@CrossOrigin(origins = "http://localhost:3000")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping(path = "/users")
    public List<User> findAll(){
        System.out.println("findAll is now called");
        return profileService.queryAll();
    }

    @GetMapping(path = "/{id}")
    public List<User> findUserById(@PathVariable("id") String id) {
        // String id = (String) session.getAttribute("userid");
        // System.out.println(id);
        System.out.println("findUserById is called");
        return ProfileService.queryUserById(id);
    }

    @CrossOrigin
    @PutMapping(path="/updateName/{lastName}/{id}")
    public String updateName(@PathVariable("lastName") String lastName,
                             @PathVariable("id") String id) {
        System.out.println("updateName is called");
        return ProfileService.modifyName(lastName, id);
    }

    @CrossOrigin
    @PutMapping(path="/updateGender/{gender}/{id}")
    public String updateGender(@PathVariable("gender") String gender,
                             @PathVariable("id") String id) {
        System.out.println("updateGender is called");
        return ProfileService.modifyGender(gender, id);
    }

    @CrossOrigin
    @PutMapping(path="/updateAge/{age}/{id}")
    public String updateAge(@PathVariable("age") Integer age,
                            @PathVariable("id") String id) {
        System.out.println("updateAge is called");
        return ProfileService.modifyAge(age, id);
    }

    @CrossOrigin
    @PutMapping(path="/updatePhone/{phone}/{id}")
    public String updatePhone(@PathVariable("phone") String phone,
                              @PathVariable("id") String id) {
        System.out.println("updatePhone is called");
        return ProfileService.modifyPhone(phone, id);
    }

    @CrossOrigin
    @PutMapping(path="/updateLocation/{location}/{id}")
    public String updateLocation(@PathVariable("location") String location,
                                 @PathVariable("id") String id) {
        System.out.println("updateLocation is called");
        return ProfileService.modifyLocation(location, id);
    }

    @CrossOrigin
    @PutMapping(path="/updateUserType/{type}/{id}")
    public String updateUserType(@PathVariable("type") String type,
                                 @PathVariable("id") String id) {
        System.out.println("updateUserType is called");
        return ProfileService.modifyUserType(type, id);
    }

}