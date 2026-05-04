package com.Swadha1.Springapllication;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {

    // Root URL "/" → serves the portfolio page
    @GetMapping("/")
    public String index() {
        return "user";
    }

    // Also keep "/user" working
    @GetMapping("/user")
    public String user() {
        return "user";
    }
}