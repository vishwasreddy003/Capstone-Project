package com.planetwise.user.util;

import com.planetwise.user.dto.UserDto;
import com.planetwise.user.model.User;



public class EntityDtoUtil {

    public static UserDto convertToDto(User user){

        return new UserDto(
                user.getUserName(), user.getEmail(), user.getAge(), user.getGreen_score(),user.getGreen_coins()
        );
    }


}
