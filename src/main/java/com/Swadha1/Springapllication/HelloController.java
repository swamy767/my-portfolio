package com.Swadha1.Springapllication;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HelloController {

    @GetMapping("/user")
    public String user() {
       
        return "user";
    }
}