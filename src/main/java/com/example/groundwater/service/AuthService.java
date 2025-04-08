package com.example.groundwater.service;

import com.example.groundwater.User.User;
import com.example.groundwater.repository.UserRepository;
import com.example.groundwater.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public String register(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is already registered!");
        }
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        return jwtUtil.generateToken(userRepository.save(user).getEmail());
    }

    public String login(String email, String password) {
        return userRepository.findByEmail(email)
                .filter(user -> passwordEncoder.matches(password, user.getPassword()))
                .map(user -> jwtUtil.generateToken(user.getEmail()))
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
    }

    public boolean validateToken(String token) {
        try {
            return jwtUtil.validateToken(token) &&
                    userRepository.findByEmail(jwtUtil.extractEmail(token)).isPresent();
        } catch (Exception e) {
            return false;
        }
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<String> getAllRegisteredEmails() {
        return userRepository.findAll().stream()
                .map(User::getEmail)
                .collect(Collectors.toList());
    }
}