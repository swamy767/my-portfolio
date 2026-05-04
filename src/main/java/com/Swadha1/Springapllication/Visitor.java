package com.Swadha1.Springapllication;

import java.time.LocalDateTime;

public class Visitor {

    private Long id;
    private LocalDateTime visitedAt;

    public Visitor() {}

    public Visitor(LocalDateTime visitedAt) {
        this.visitedAt = visitedAt;
    }

    public Long getId()                       { return id; }
    public void setId(Long id)                { this.id = id; }
    public LocalDateTime getVisitedAt()       { return visitedAt; }
    public void setVisitedAt(LocalDateTime t) { this.visitedAt = t; }
}
