package com.minet.userservice.utils;

import com.minet.userservice.dto.UserDto;
import com.minet.userservice.dto.UserResponse;
import com.minet.userservice.entity.User;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.ModelMapper;
public class UserMapper {

    private static ModelMapper modelMapper;

    static {
        modelMapper=new ModelMapper();
    }

    public static User convertDtoToEntity(UserDto userDto){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(userDto,User.class);
    }

    public static UserResponse convertEntityToDto(User user){
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.LOOSE);
        return modelMapper.map(user,UserResponse.class);
    }

}