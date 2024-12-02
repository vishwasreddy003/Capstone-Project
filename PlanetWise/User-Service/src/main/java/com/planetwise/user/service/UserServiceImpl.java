package com.planetwise.user.service;

import com.planetwise.user.dto.UserDto;
import com.planetwise.user.exception.UserAlreadyExistsException;
import com.planetwise.user.exception.UsernameNotFoundException;
import com.planetwise.user.model.User;
import com.planetwise.user.repository.UserRepository;
import com.planetwise.user.util.EntityDtoUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepo;


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
    public ValidationDto getUserByUsername(String username) {
        User user = null;
        if(userRepo.findByUsername(username).isPresent()){
            user = userRepo.findByUsername(username).get();
        }else{
            throw new UsernameNotFoundException("Username does not exist. New user? Please Sign up");
        }
        return new ValidationDto(user.getUsername(),user.getPassword());
    }


}
