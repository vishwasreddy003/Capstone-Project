package com.planetwise.user.controller;

import com.planetwise.user.dto.JwtToken;
import com.planetwise.user.dto.UserDto;
import com.planetwise.user.dto.loginDto;
import com.planetwise.user.model.User;
import com.planetwise.user.service.AuthenticationService;
import com.planetwise.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/PlanetWise/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationService authService;


    @GetMapping("/all")
    public List<UserDto> getAllUsers(){
        return  userService.getAllUsers();
    }

    @PostMapping("/register")
    public UserDto registerUser(@RequestBody User user){
        System.out.println("Received user registration request: " + user);
        return userService.saveUser(user);
    }

    @PostMapping("/login")
    public JwtToken validateUser(@RequestBody loginDto credentials){
        return authService.authenticate(credentials);
    }

    @PostMapping("/validate")
    public void  validateToken(@RequestParam String token){
        authService.validateToken(token);
        System.out.println("done");
    }

    @PostMapping("/addGoal/{username}/{goalId}")
    public void addGoal(@PathVariable UUID goalId,@PathVariable String username){
        userService.addGoalToUser(username,goalId);
    }


    @PostMapping("/checkGoal/{username}/{goalId}")
    public void checkGoal(@PathVariable UUID goalId,@PathVariable String username){
        userService.checkGoalToUser(username,goalId);
    }

    @GetMapping("/getGoals/{username}")
    public List<UUID> getUserGoals(@PathVariable String username) {
        return userService.getUserGoalIds(username);
    }

    @GetMapping("/getCheckedGoals/{username}")
    public List<UUID> getCheckedGoals(@PathVariable String username) {
        return userService.getCheckedGoalIds(username);
    }








}
