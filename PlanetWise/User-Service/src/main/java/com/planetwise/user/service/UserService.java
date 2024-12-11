package com.planetwise.user.service;

import com.planetwise.user.dto.UserDto;
import com.planetwise.user.model.User;

import java.util.List;
import java.util.UUID;

public interface UserService {

    boolean searchByEmail(String email);

    List<UserDto> getAllUsers();

    UserDto saveUser(User newUser);

    boolean isUsernameUnique(String username);

    void addGoalToUser(String username, UUID goalId);

    void checkGoalToUser(String username, UUID goalId);

    User findByUsername(String username);

    List<UUID> getUserGoalIds(String username);

    List<UUID> getCheckedGoalIds(String username);

    Integer updateGreenCoins(String username, Integer coins);
}
