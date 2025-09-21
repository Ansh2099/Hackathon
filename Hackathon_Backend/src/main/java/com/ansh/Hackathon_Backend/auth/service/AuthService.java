package com.ansh.Hackathon_Backend.auth.service;

import com.ansh.Hackathon_Backend.auth.dto.LoginDto;
import com.ansh.Hackathon_Backend.auth.dto.LoginResponseDto;
import com.ansh.Hackathon_Backend.auth.dto.SignUpDto;
import com.ansh.Hackathon_Backend.auth.entity.User;
import com.ansh.Hackathon_Backend.auth.repository.UserRepository;
import com.ansh.Hackathon_Backend.auth.security.JwtUtil;
import com.ansh.Hackathon_Backend.common.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    
    @Transactional
    public LoginResponseDto signUp(SignUpDto signUpDto) {
        if (userRepository.existsByUsername(signUpDto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        
        User user = new User();
        user.setUsername(signUpDto.getUsername());
        user.setPassword(passwordEncoder.encode(signUpDto.getPassword()));
        user.setRole(User.Role.USER);
        
        User savedUser = userRepository.save(user);
        
        String token = jwtUtil.generateToken(savedUser.getUsername(), savedUser.getRole().name());
        
        return new LoginResponseDto(token, savedUser.getUsername(), savedUser.getRole().name());
    }
    
    public LoginResponseDto login(LoginDto loginDto) {
        User user = userRepository.findByUsername(loginDto.getUsername())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with username: " + loginDto.getUsername()));
        
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid credentials");
        }
        
        String token = jwtUtil.generateToken(user.getUsername(), user.getRole().name());
        
        return new LoginResponseDto(token, user.getUsername(), user.getRole().name());
    }
}
