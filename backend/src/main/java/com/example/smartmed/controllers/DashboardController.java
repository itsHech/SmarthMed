package com.example.smartmed.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import java.security.Principal;

@Controller
public class DashboardController {

    @GetMapping("/dashboard")
    public String showDashboard(Model model, Principal principal) {
        if (principal != null) {
            String userEmail = principal.getName();
            model.addAttribute("userEmail", userEmail);
            return "dashboard";
        }
        return "redirect:/login";
    }
} 