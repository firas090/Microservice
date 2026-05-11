package com.easytrip.userservice.service;

import com.easytrip.userservice.Repository.UserRepository;
import com.easytrip.userservice.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final com.easytrip.userservice.config.JwtUtil jwtUtil;


    // Constructeur avec injection de JwtUtil
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, com.easytrip.userservice.config.JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public User updateUser(Long id, User userDetails) {
        User user = getUserById(id);
        user.setFirstname(userDetails.getFirstname());
        user.setLastname(userDetails.getLastname());
        user.setEmail(userDetails.getEmail());
        user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
        user.setRole(userDetails.getRole());
        return userRepository.save(user);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // 🔐 Changer le mot de passe
    public User changePassword(Long id, String oldPassword, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        return userRepository.save(user);
    }

    // 📝 Inscription
    public User registerUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

//    // 🔐 Authentification
//    public boolean authenticateUser(String email, String password) {
//        // Recherche de l'utilisateur par email
//        Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(email));
//
//        // Si l'utilisateur n'est pas trouvé, on lance une exception
//        User user = userOptional.orElseThrow(() -> new RuntimeException("User not found"));
//
//        // Vérification du mot de passe
//        return passwordEncoder.matches(password, user.getPassword());
//    }


    // 🔑 Authentification et génération de token JWT
    public String authenticateUser(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Vérifier le mot de passe
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Générer un token JWT
        return jwtUtil.generateToken(user.getEmail());
    }
    public List<User> searchUsers(String query) {
        return userRepository.findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(query, query);
    }
    public long countUsers() {
        return userRepository.count();
    }
    // New method to check if a user exists by ID
    public boolean userExists(Long id) {
        return userRepository.existsById(id);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

}
