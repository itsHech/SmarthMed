package com.example.smartmed.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ErrorController implements org.springframework.boot.web.servlet.error.ErrorController {

    @GetMapping("/error")
    public String handleError() {
        // Rediriger vers la page de login en cas d'erreur
        return "redirect:/login";
    }
} 