package com.planetwise.user.controller;

import com.planetwise.user.dto.UserDto;
import com.planetwise.user.dto.ValidationDto;
import com.planetwise.user.model.User;
import com.planetwise.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/PlanetWise/user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping("/all")
    public List<UserDto> getAllUsers(){
        return  userService.getAllUsers();
    }

    @PostMapping("/register")
    public UserDto registerUser(@RequestBody User user){
        return userService.saveUser(user);
    }



    @GetMapping("/{username}")
    public ValidationDto getUser(@PathVariable  String username){
        return userService.getUserByUsername(username);
    }


}
