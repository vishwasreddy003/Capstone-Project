package com.planetwise.goals.exception;

public class GoalDoesNotExistException extends RuntimeException{
    public GoalDoesNotExistException(String msg){
        super(msg);
    }
}
