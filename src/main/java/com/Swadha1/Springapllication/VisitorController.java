package com.Swadha1.Springapllication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * REST controller for silent visit tracking.
 *
 * POST /api/visitor/save  – called automatically on page load, saves timestamp
 * GET  /api/visitor/count – returns total visit count
 */
@RestController
@RequestMapping("/api/visitor")
@CrossOrigin(origins = "*")
public class VisitorController {

    @Autowired
    private VisitorRepository visitorRepository;

    /** Called silently by the frontend on every page load. */
    @PostMapping("/save")
    public ResponseEntity<Map<String, String>> saveVisit() {
        visitorRepository.save(new Visitor(LocalDateTime.now()));
        Map<String, String> ok = new HashMap<>();
        ok.put("message", "ok");
        return ResponseEntity.ok(ok);
    }

    /** Returns the total number of visits — shown on the portfolio metrics. */
    @GetMapping("/count")
    public ResponseEntity<Map<String, Long>> getCount() {
        Map<String, Long> res = new HashMap<>();
        res.put("count", visitorRepository.count());
        return ResponseEntity.ok(res);
    }
}
