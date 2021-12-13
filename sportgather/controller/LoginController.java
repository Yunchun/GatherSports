package com.example.sportgather.controller;

import com.example.sportgather.service.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping(path = "login")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @GetMapping(path = "/{email}/{password}")
    public String displayId(@PathVariable("email") String email, @PathVariable("password") String password, HttpSession session) {
        String id = LoginService.showId(email);
        String pass = LoginService.showPassword(email);
        if (id != "" & pass.equals(password)) {
            session.setAttribute("userid", id);
            System.out.println("displayId is called");
            return id;
        }
        else {
            return "email or password is wrong";
        }
    }


}
