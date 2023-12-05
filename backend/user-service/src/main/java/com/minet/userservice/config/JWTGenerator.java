package com.minet.userservice.config;

import com.minet.userservice.dto.LoginDTO;

import java.util.Map;

public interface JWTGenerator {
    Map<String, String> generateToken(LoginDTO loginDTO);
}
