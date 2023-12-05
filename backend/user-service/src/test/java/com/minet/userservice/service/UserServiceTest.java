package com.minet.userservice.service;
import com.minet.userservice.dto.LoginDTO;
import com.minet.userservice.dto.UserDto;
import com.minet.userservice.dto.UserResponse;
import com.minet.userservice.entity.User;
import com.minet.userservice.exception.UserNotFoundException;
import com.minet.userservice.repository.UserRepository;
import com.minet.userservice.utils.UserMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserServiceImpl userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void saveUser_Success() {
        UserDto userDto = new UserDto(1, "John Doe", "john@example.com", "password");
        when(passwordEncoder.encode(anyString())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(UserMapper.convertDtoToEntity(userDto));
        UserResponse result = userService.saveUser(userDto);
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        assertEquals("john@example.com", result.getEmail());
    }

    @Test
    void getUserByEmail_UserFound() {
        User user = new User(1, "John Doe", "john@example.com", "encodedPassword");
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));
        UserResponse result = userService.getUserByEmail("john@example.com");
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        assertEquals("john@example.com", result.getEmail());
    }

    @Test
    void getUserByEmail_UserNotFound() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmail("nonexistent@example.com"));
    }
    @Test
    void updateUserPassword_UserFound() {
        int userId = 1;
        UserDto userDto = new UserDto(1, "John Doe", "john@example.com", "newPassword");
        User existingUser = new User(userId, "John Doe", "john@example.com", "encodedPassword");
        when(userRepository.findById(userId)).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.encode(anyString())).thenReturn("newEncodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(existingUser);
        UserResponse result = userService.updateUserPassword(userId, userDto);
        assertNotNull(result);
    }
    @Test
    void getUserById_UserFound_ReturnsUserDto() {
        int userId = 1;
        User user = new User(userId, "John Doe", "john@example.com", "encodedPassword");
        when(userRepository.findById(userId)).thenReturn(Optional.of(user));
        UserResponse result = userService.getUserById(userId);
        assertNotNull(result);
        assertEquals("John Doe", result.getName());
        assertEquals("john@example.com", result.getEmail());
    }
    @Test
    void getUserById_UserNotFound_ThrowsException() {
        int userId = 1;
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(userId));
    }

    @Test
    void getAllUsers_ReturnsListOfUsers() {
        List<User> users = Collections.singletonList(new User(1, "John Doe", "john@example.com", "encodedPassword"));
        when(userRepository.findAll()).thenReturn(users);
        List<User> result = userService.getAllUsers();
        assertNotNull(result);
        assertEquals(users.size(), result.size());
        assertEquals(users.get(0), result.get(0));
    }
    @Test
    void updateUserPassword_UserNotFound() {
        int userId = 1;
        UserDto userDto = new UserDto(1, "John Doe", "john@example.com", "newPassword");
        when(userRepository.findById(userId)).thenReturn(Optional.empty());
        UserNotFoundException exception = assertThrows(UserNotFoundException.class,
                () -> userService.updateUserPassword(userId, userDto));
        assertEquals("User with Id:" + userId + "not found", exception.getMessage());
    }

    @Test
    void testGetUserByEmailAndPassword_ValidUser() {
        String userEmail = "test@example.com";
        String userPassword = "password123";
        String hashedPassword = new BCryptPasswordEncoder().encode(userPassword);

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(userEmail);
        loginDTO.setPassword(userPassword);

        User mockUser = new User();
        mockUser.setId(1);
        mockUser.setEmail(userEmail);
        mockUser.setPassword(hashedPassword);

        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.of(mockUser));

        when(bCryptPasswordEncoder.matches(userPassword, hashedPassword)).thenReturn(true);

        UserResponse result = userService.getUserByEmailAndPassword(loginDTO);

        verify(userRepository, times(1)).findByEmail(userEmail);

        assertNotNull(result);

        assertEquals(userEmail, result.getEmail());
    }

    @Test
    void testGetUserByEmailAndPassword_InvalidUser() {
        String userEmail = "test@example.com";
        String userPassword = "password123";
        String hashedPassword = new BCryptPasswordEncoder().encode(userPassword);

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail(userEmail);
        loginDTO.setPassword(userPassword);

        User mockUser = new User();
        mockUser.setId(1);
        mockUser.setEmail(userEmail);
        mockUser.setPassword(hashedPassword);

        when(userRepository.findByEmail(userEmail)).thenReturn(Optional.empty());
        when(bCryptPasswordEncoder.matches(userPassword, hashedPassword)).thenReturn(true);
        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmailAndPassword(loginDTO));
    }

    @Test
    void getUserByEmailAndPassword_UserPresentAndPasswordMatches_ReturnsUserResponse() {
        User user = new User(1, "John Doe", "test@example.com", bCryptPasswordEncoder.encode("password123"));
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.of(user));

        when(bCryptPasswordEncoder.matches(anyString(), anyString())).thenReturn(false);

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@gmail.com");
        loginDTO.setPassword("Password@123");
        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmailAndPassword(loginDTO));
    }

    @Test
    void getUserByEmailAndPassword_UserNotPresent_ThrowsException() {
        when(userRepository.findByEmail(anyString())).thenReturn(Optional.empty());

        LoginDTO loginDTO = new LoginDTO();
        loginDTO.setEmail("test@gmail.com");
        loginDTO.setPassword("Password@123");
        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmailAndPassword(loginDTO));
    }

}
