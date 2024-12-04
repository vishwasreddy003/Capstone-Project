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




}
