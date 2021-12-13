package com.example.sportgather.controller;

import com.example.sportgather.domain.Mates;
import com.example.sportgather.domain.Sport;
import com.example.sportgather.domain.User;
import com.example.sportgather.service.LoginService;
import com.example.sportgather.service.MatchService;
import org.apache.ibatis.annotations.Update;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping(path = "match")
public class MatchViewController {

    private final MatchService matchService;
    private final LoginService loginService;

    @Autowired
    public MatchViewController(MatchService matchService, LoginService loginService) {
        this.matchService = matchService;
        this.loginService = loginService;
    }

    @GetMapping(path = "/hobby/{id}")
    public List<Sport> fetchHobbies(@PathVariable("id") String UserId){
        System.out.println("fetchHobbies is called");
        return matchService.queryHobbies(UserId);
    }

    @GetMapping(path = "/hobby/mates/{id}")
    public List<User> findMatesByHobby(@PathVariable("id") String UserId){
        System.out.println("findMatesByHobby is called");
        return matchService.queryMatesByHobby(UserId);
    }

    @GetMapping(path="/samegender/mates/{id}")
    public List<User> findMatesWithSameGender(@PathVariable("id") String UserId) {
        System.out.println("findMatesWithSameGender is called");
        return matchService.queryMatesWithSameGender(UserId);
    }

    // params:
    // age = similar / nolimit
    // major = same / diff
    // gender = same / diff
//    @RequestMapping(method= RequestMethod.GET, value="/intermates")
//    public Set<String> findIntersectMates(@RequestParam Map<String, String> customQuery) {
//        System.out.println("findMates is called");
//        String age = customQuery.get("age")!=null?customQuery.get("age"):"";
//        String gender = customQuery.get("gender")!=null?customQuery.get("gender"):"";
//        String major = customQuery.get("major")!=null?customQuery.get("major"):"";
//
//        return matchService.queryIntersectMates(customQuery.get("id"), age, gender, major);
//    }

    // params:
    // age = similar / nolimit
    // major = same / diff
    // gender = same / diff
    @RequestMapping(method= RequestMethod.GET, value="/mates")
    public Set<String> findScoreMates(@RequestParam Map<String, String> customQuery) {
        System.out.println("findScoreMates is called");
        String age = customQuery.get("age")!=null?customQuery.get("age"):"";
        String gender = customQuery.get("gender")!=null?customQuery.get("gender"):"";
        String major = customQuery.get("major")!=null?customQuery.get("major"):"";

        String search = customQuery.get("search")!=null?customQuery.get("search"):"";

        return matchService.queryIntersectMates(customQuery.get("id"), age, gender, major, search);
    }

    @CrossOrigin
    @PostMapping(path="/addfriend")
    public String addFriend(@RequestParam Map<String, String> customQuery) {
        System.out.println("send add friend request");
        String receiverEmail = customQuery.get("receiverEmail");
        String requestid = customQuery.get("requestid");
        String receiverid = loginService.showId(receiverEmail);
        System.out.println(requestid);
        System.out.println(receiverid);
        matchService.sendFriendRequest(requestid, receiverid);
        return "success";
    }

    @GetMapping(path="/mateRequest/{id}")
    public List<String> fetchMatesRequest(@PathVariable("id") String UserId) {
        System.out.println("fetchMatesRequest is called");
        return matchService.fetchRequest(UserId);
    }

    @CrossOrigin
    @PutMapping(path="/updateState")
    public String updateState(@RequestParam Map<String, String> customQuery) {
        String requestid = customQuery.get("requestid");
        String resid = customQuery.get("resid");
        String res = customQuery.get("res");
        matchService.updateState(requestid, resid, res);
        return "success";
    }

    @GetMapping(path="/reqSent/{id}")
    public List<Mates> reqSent(@PathVariable("id") String UserId) {
        System.out.println("fetchMatesRequest is called");
        return matchService.fetchReqSent(UserId);
    }
}