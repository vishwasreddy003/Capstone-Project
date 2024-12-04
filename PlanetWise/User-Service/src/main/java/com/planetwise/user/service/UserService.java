package com.planetwise.user.service;

import com.planetwise.user.dto.UserDto;
import com.planetwise.user.model.User;

import java.util.List;

public interface UserService {

    boolean searchByEmail(String email);

    List<UserDto> getAllUsers();

    UserDto saveUser(User newUser);

    boolean isUsernameUnique(String username);


}
