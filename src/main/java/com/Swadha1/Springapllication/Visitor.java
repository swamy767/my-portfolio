package com.Swadha1.Springapllication;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * JPA entity mapped to the "visitors" table in PostgreSQL.
 * Silently records every visit with a timestamp.
 */
@Entity
@Table(name = "visitors")
public class Visitor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "visited_at", nullable = false)
    private LocalDateTime visitedAt;

    public Visitor() {}

    public Visitor(LocalDateTime visitedAt) {
        this.visitedAt = visitedAt;
    }

    public Long getId()                 { return id; }
    public LocalDateTime getVisitedAt() { return visitedAt; }
    public void setVisitedAt(LocalDateTime t) { this.visitedAt = t; }
}
