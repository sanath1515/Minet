package com.minet.userservice.controller;

import com.minet.userservice.config.JWTGenerator;
import com.minet.userservice.dto.LoginDTO;
import com.minet.userservice.dto.UserDto;
import com.minet.userservice.dto.UserResponse;
import com.minet.userservice.entity.User;
import com.minet.userservice.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    private JWTGenerator jwtGenerator;

    public UserController(UserService userService, JWTGenerator jwtGenerator) {
        this.userService = userService;
        this.jwtGenerator = jwtGenerator;
    }

    @PostMapping("/save")
    public ResponseEntity<UserResponse> saveUser(@RequestBody UserDto userDto) {
        return new ResponseEntity<>(userService.saveUser(userDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<UserResponse> getUserByEmail(@RequestParam("email") String email) {
        UserResponse userDto = userService.getUserByEmail(email);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<User> findAllUsers(){
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Integer id) {
        UserResponse userDto = userService.getUserById(id);
        return new ResponseEntity<>(userDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserResponse> updateUserPassword(@PathVariable Integer id, @RequestBody UserDto userDto) {
        UserResponse updateUser = userService.updateUserPassword(id, userDto);
        return new ResponseEntity<>(updateUser, HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> loginUser(@RequestBody LoginDTO loginDTO) {
        userService.getUserByEmailAndPassword(loginDTO);
        return new ResponseEntity<>(jwtGenerator.generateToken(loginDTO), HttpStatus.OK);
    }
}
