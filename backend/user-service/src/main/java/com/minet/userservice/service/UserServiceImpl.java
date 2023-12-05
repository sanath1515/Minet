package com.minet.userservice.service;

import com.minet.userservice.dto.LoginDTO;
import com.minet.userservice.dto.UserDto;
import com.minet.userservice.dto.UserResponse;
import com.minet.userservice.entity.User;
import com.minet.userservice.exception.UserNotFoundException;
import com.minet.userservice.repository.UserRepository;
import com.minet.userservice.utils.UserMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository,PasswordEncoder passwordEncoder,BCryptPasswordEncoder bCryptPasswordEncoder){
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public UserResponse saveUser(UserDto userDto) {
        String bcryptEncodedPassword = passwordEncoder.encode(userDto.getPassword());
        userDto.setPassword(bcryptEncodedPassword);
        User user=userRepository.save(UserMapper.convertDtoToEntity(userDto));
        return UserMapper.convertEntityToDto(user);
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() ->
                new UserNotFoundException("User not found with email:"+email));
        return UserMapper.convertEntityToDto(user);
    }

    @Override
    public UserResponse getUserById(Integer id) {
        Optional<User> user = userRepository.findById(id);
        if(!user.isPresent()){
            throw new UserNotFoundException("User with Id"+id+"not found");
        }
        return UserMapper.convertEntityToDto(user.get());
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }


    @Override
    public UserResponse updateUserPassword(Integer id, UserDto userDto) {
        Optional<User> user = userRepository.findById(id);
        if (user.isPresent()) {
            User user1 = user.get();
            String bcryptEncodedPassword = passwordEncoder.encode(userDto.getPassword());
            user1.setPassword(bcryptEncodedPassword);
            User updateUser = userRepository.save(user1);
            return UserMapper.convertEntityToDto(updateUser);
        } else {
            throw new UserNotFoundException("User with Id:"+id+"not found");
        }
    }

    @Override
    public UserResponse getUserByEmailAndPassword(LoginDTO loginDTO) {
        Optional<User> user = userRepository.findByEmail(loginDTO.getEmail());
        if(!user.isPresent() || !bCryptPasswordEncoder.matches(loginDTO.getPassword(),user.get().getPassword())){
            throw new UserNotFoundException("Invalid email and password");
        }
        return UserMapper.convertEntityToDto(user.get());
    }

}
