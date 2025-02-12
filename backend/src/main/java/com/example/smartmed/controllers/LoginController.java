package com.example.smartmed.controllers;

import com.example.smartmed.dtos.LoginRequest;
import com.example.smartmed.models.User;
import com.example.smartmed.repositories.UserRepository;
import com.example.smartmed.services.impl.LoginServiceImpl;
import com.example.smartmed.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

@Controller
public class LoginController {

    private final AuthenticationManager authenticationManager;
    private final LoginServiceImpl loginService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public LoginController(AuthenticationManager authenticationManager, LoginServiceImpl loginService, JwtUtil jwtUtil, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.loginService = loginService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/login")
    public String showLoginPage(Model model, String error) {
        if (error != null) {
            model.addAttribute("errorMessage", "Email ou mot de passe incorrect");
        }
        model.addAttribute("loginRequest", new LoginRequest());
        return "login";
    }

    @PostMapping("/login")
    public String loginUser(@ModelAttribute LoginRequest loginRequest, Model model) {
        try {
            Optional<User> userOptional = userRepository.findByEmail(loginRequest.getEmail());
            if (!userOptional.isPresent()) {
                model.addAttribute("errorMessage", "Utilisateur non trouvé");
                return "login";
            }

            User user = userOptional.get();
            
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                model.addAttribute("errorMessage", "Mot de passe incorrect");
                return "login";
            }

            return "redirect:/dashboard";
            
        } catch (Exception e) {
            model.addAttribute("errorMessage", "Erreur lors de la connexion: " + e.getMessage());
            return "login";
        }
    }
}


