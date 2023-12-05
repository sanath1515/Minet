package com.minet.userservice.service;

import com.minet.userservice.dto.LoginDTO;
import com.minet.userservice.dto.UserDto;
import com.minet.userservice.dto.UserResponse;
import com.minet.userservice.entity.User;

import java.util.List;

public interface UserService {

    UserResponse saveUser(UserDto userDto);

    UserResponse getUserByEmail(String email);

    UserResponse getUserById(Integer id);

    List<User> getAllUsers();

    UserResponse updateUserPassword(Integer id, UserDto userDto);

    UserResponse getUserByEmailAndPassword(LoginDTO loginDTO);
}
