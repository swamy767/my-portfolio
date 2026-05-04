package com.Swadha1.Springapllication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/message")
public class MessageController {

    @Autowired
    private MessageRepository messageRepository;

    // POST /api/message/send  — saves message from contact form
    @PostMapping("/send")
    public ResponseEntity<?> saveMessage(@RequestBody Map<String, String> body) {
        try {
            Message msg = new Message();
            msg.setName(body.getOrDefault("name", ""));
            msg.setEmail(body.getOrDefault("email", ""));
            msg.setSubject(body.getOrDefault("subject", ""));
            msg.setMessageText(body.getOrDefault("message", ""));
            messageRepository.save(msg);
            return ResponseEntity.ok(Map.of("status", "saved"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("status", "error", "msg", e.getMessage()));
        }
    }

    // GET /api/message/count  — total messages received
    @GetMapping("/count")
    public ResponseEntity<?> getCount() {
        return ResponseEntity.ok(Map.of("count", messageRepository.count()));
    }
}
