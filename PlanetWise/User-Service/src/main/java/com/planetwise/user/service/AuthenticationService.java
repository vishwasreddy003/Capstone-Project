package com.planetwise.user.service;


import com.planetwise.user.dto.JwtToken;
import com.planetwise.user.dto.loginDto;
import com.planetwise.user.exception.InvalidPasswordException;
import com.planetwise.user.exception.UsernameNotFoundException;
import com.planetwise.user.model.User;
import com.planetwise.user.repository.UserRepository;
import com.planetwise.user.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {


    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    JwtUtil jwtUtil;



    public JwtToken authenticate(loginDto userCredentials) {

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userCredentials.username(), userCredentials.password()));
            String username = authentication.getName();
            return new JwtToken(jwtUtil.generateToken(username),userCredentials.username());


        } catch (AuthenticationException e) {
            throw new RuntimeException("Invalid Credentials", e);
        }


    }
    public void validateToken(String token) {
        String username = jwtUtil.getUsernameFromToken(token);
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}
