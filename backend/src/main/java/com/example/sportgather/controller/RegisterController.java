package com.example.sportgather.controller;


import com.example.sportgather.service.RegisterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.sportgather.service.LoginService;

@RestController
@RequestMapping(path = "register")
@CrossOrigin(origins = "http://localhost:3000")
public class RegisterController {
    private final RegisterService registerService;

    @Autowired

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    /*
    @PostMapping()
    public String saveUser(@ModelAttribute("user")User user, Model model) {
        String email = user.getEmail();
        String id = LoginService.showId(email);
        if (id == null) {
            SignService.addUser(user.getFirstName(), user.getEmail(), user.getPassword());
            System.out.println("saveUser is called");
            return SignService.addUser(user.getFirstName(), user.getEmail(), user.getPassword());
        }
        else {
            return "user with such email already exists";
        }
    } */

    @PostMapping(path="/saveUser/{firstName}/{email}/{password}")
    public String saveUser(@PathVariable("firstName") String firstName,
                           @PathVariable("email") String email,
                           @PathVariable("password") String password) {
        String id = LoginService.showId(email);

        if (id == null) {
            System.out.println("saveUser is called");
            return RegisterService.addUser(firstName, email, password);
        }
        else {
            return "user with such email already exists";
        }
    }
}
