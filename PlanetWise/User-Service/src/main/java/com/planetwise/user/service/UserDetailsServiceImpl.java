package com.planetwise.user.service;

import com.planetwise.user.model.User;
import com.planetwise.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository userRepo;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User loadedUser = null;

        if(userRepo.findByUsername(username).isPresent()){
            loadedUser = userRepo.findByUsername(username).get();
        }

        return new UserDetailsImpl(loadedUser);

    }
}
