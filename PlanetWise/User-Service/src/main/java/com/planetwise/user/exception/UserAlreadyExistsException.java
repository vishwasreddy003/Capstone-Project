package com.planetwise.user.exception;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String msg){
        super(msg);
    }
}
