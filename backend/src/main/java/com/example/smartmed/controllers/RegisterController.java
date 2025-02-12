package com.example.smartmed.controllers;

import com.example.smartmed.dtos.SignupRequest;
import com.example.smartmed.models.User;
import com.example.smartmed.services.RegisterService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@Controller
@RequestMapping("/register")
public class RegisterController {

    private final RegisterService registerService;

    @Autowired
    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @GetMapping
    public String showRegisterPage(Model model) {
        if (!model.containsAttribute("signupRequest")) {
            model.addAttribute("signupRequest", new SignupRequest());
        }
        return "register";
    }

    @PostMapping
    public String registerUser(@ModelAttribute("signupRequest") @Valid SignupRequest signupRequest, 
                             BindingResult bindingResult,
                             Model model) {
        try {
            if (bindingResult.hasErrors()) {
                model.addAttribute("errorMessage", "Veuillez corriger les erreurs dans le formulaire");
                return "register";
            }
            
            signupRequest.setCreatedAt(LocalDateTime.now());
            
            System.out.println("Attempting to register user with email: " + signupRequest.getEmail());
            
            User createdUser = registerService.createUser(signupRequest);
            if (createdUser != null) {
                model.addAttribute("successMessage", "Inscription réussie! Veuillez vous connecter.");
                return "redirect:/login";
            } else {
                model.addAttribute("errorMessage", "Échec de la création de l'utilisateur");
                return "register";
            }
        } catch (Exception e) {
            System.err.println("Error during registration: " + e.getMessage());
            e.printStackTrace();
            model.addAttribute("errorMessage", "Erreur lors de l'inscription: " + e.getMessage());
            return "register";
        }
    }
}

