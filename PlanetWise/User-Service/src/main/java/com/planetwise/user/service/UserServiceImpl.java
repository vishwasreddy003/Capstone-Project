package com.planetwise.user.service;

import com.planetwise.user.dto.UserDto;
import com.planetwise.user.exception.UserAlreadyExistsException;
import com.planetwise.user.exception.UsernameNotFoundException;
import com.planetwise.user.model.Roles;
import com.planetwise.user.model.User;
import com.planetwise.user.repository.UserRepository;
import com.planetwise.user.util.EntityDtoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepo;

    @Autowired
    PasswordEncoder passwordEncoder;


    @Override
    public boolean searchByEmail(String email) {
        return userRepo.existsByEmail(email);
    }

    @Override
    public List<UserDto> getAllUsers() {
        return userRepo.findAll().stream().map(EntityDtoUtil::convertToDto).toList();
    }

    @Override
    public UserDto saveUser(User newuser) {
        if(!searchByEmail(newuser.getEmail())){
            String encodedPassword = passwordEncoder.encode(newuser.getPassword());
            newuser.setPassword(encodedPassword);
            newuser.setRole(Roles.USER);
            return EntityDtoUtil.convertToDto(userRepo.save(newuser));
        }else{
            throw new UserAlreadyExistsException("User with " + newuser.getEmail() + " already exists");
        }
    }

    @Override
    public boolean isUsernameUnique(String username) {
        return !userRepo.existsByUsername(username);
    }

    @Override
    public void addGoalToUser(String username, UUID goalId) {
        Optional<User> user = userRepo.findByUsername(username);

        if(user.isPresent()){
            User currUser = user.get();
            List<UUID> goals = currUser.getUserGoals();


            goals.add(goalId);

            currUser.setUserGoals(goals);
            userRepo.save(currUser);
        }else {
            throw new UsernameNotFoundException("User with " + username + " does not exist");
        }
    }


    @Override
    public void checkGoalToUser(String username, UUID goalId) {
        Optional<User> user = userRepo.findByUsername(username);

        if(user.isPresent()){
            User currUser = user.get();
            List<UUID> goals = currUser.getCheckedGoals();


            goals.add(goalId);

            currUser.setUserGoals(goals);
            userRepo.save(currUser);
        }else {
            throw new UsernameNotFoundException("User with " + username + " does not exist");
        }
    }


    @Override
    public User findByUsername(String username) {
        return userRepo.findByUsername(username).get();
    }

    @Override
    public List<UUID> getUserGoalIds(String username) {
        Optional<User> user = userRepo.findByUsername(username);

        if(user.isPresent()){
            return user.get().getUserGoals();
        }else {
            throw new UsernameNotFoundException("User with " + username + " does not exist");
        }
    }

    @Override
    public List<UUID> getCheckedGoalIds(String username) {
        Optional<User> user = userRepo.findByUsername(username);

        if(user.isPresent()){
            return user.get().getCheckedGoals();
        }else {
            throw new UsernameNotFoundException("User with " + username + " does not exist");
        }
    }


}
