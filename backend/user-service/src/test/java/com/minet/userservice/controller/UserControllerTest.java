package com.minet.userservice.controller;
import com.minet.userservice.config.JWTGenerator;
import com.minet.userservice.dto.LoginDTO;
import com.minet.userservice.dto.UserDto;
import com.minet.userservice.dto.UserResponse;
import com.minet.userservice.entity.User;
import com.minet.userservice.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @Mock
    private JWTGenerator jwtGenerator;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveUser_ReturnsCreatedResponse() {
        UserDto userDto = new UserDto(1, "John Doe", "john@example.com", "password");
        UserResponse userResponse = new UserResponse(1,"John Doe", "john@gmail.com");
        when(userService.saveUser(any(UserDto.class))).thenReturn(userResponse);
        ResponseEntity<UserResponse> responseEntity = userController.saveUser(userDto);
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(userResponse, responseEntity.getBody());
    }

    @Test
    void getUserByEmail_ReturnsOkResponse() {
        String email = "john@example.com";
        UserResponse userDto = new UserResponse(1,"John Doe", "john@gmail.com");
        when(userService.getUserByEmail(email)).thenReturn(userDto);
        ResponseEntity<UserResponse> responseEntity = userController.getUserByEmail(email);
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(userDto, responseEntity.getBody());
    }

    @Test
    void findAllUsers_ReturnsListOfUsers() {
        List<User> users = Collections.singletonList(new User(1, "John Doe", "john@example.com", "encodedPassword"));
        when(userService.getAllUsers()).thenReturn(users);
        List<User> result = userController.findAllUsers();
        assertNotNull(result);
        assertEquals(users.size(), result.size());
        assertEquals(users.get(0), result.get(0));
    }

    @Test
    void getUserById_ReturnsOkResponse() {
        Integer userId = 1;
        UserResponse userDto = new UserResponse(1, "John Doe", "john@example.com");
        when(userService.getUserById(userId)).thenReturn(userDto);
        ResponseEntity<UserResponse> responseEntity = userController.getUserById(userId);
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(userDto, responseEntity.getBody());
    }

    @Test
    void updateUserPassword_ReturnsOkResponse() {
        Integer userId = 1;
        UserDto userDto = new UserDto(1, "John Doe", "john@example.com", "password");
        UserResponse userResponse = new UserResponse(1, "John Doe", "john@example.com");
        when(userService.updateUserPassword(eq(userId), any(UserDto.class))).thenReturn(userResponse);
        ResponseEntity<UserResponse> responseEntity = userController.updateUserPassword(userId, userDto);
        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(userResponse, responseEntity.getBody());
    }

    @Test
    void loginUser_ReturnsOkResponse() {
        LoginDTO loginDTO = new LoginDTO("test@example.com", "password123");
        UserResponse userResponse = new UserResponse(1, "John Doe", "test@example.com");
        when(userService.getUserByEmailAndPassword(loginDTO)).thenReturn(userResponse);

        Map<String, String> tokenMap = Collections.singletonMap("token", "generatedToken");
        when(jwtGenerator.generateToken(loginDTO)).thenReturn(tokenMap);

        ResponseEntity<Map<String, String>> responseEntity = userController.loginUser(loginDTO);

        assertNotNull(responseEntity);
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertNotNull(responseEntity.getBody());
        assertEquals(tokenMap, responseEntity.getBody());
    }

}
