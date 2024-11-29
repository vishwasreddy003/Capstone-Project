package com.planetwise.rewards.exception;

public class RewardDoesNotExistException extends RuntimeException{
    public RewardDoesNotExistException(String msg){
        super(msg);
    }
}
