package com.Swadha1.Springapllication;

import org.springframework.stereotype.Repository;

import java.util.concurrent.atomic.AtomicLong;

@Repository
public class VisitorRepository {

    private final AtomicLong visitCount = new AtomicLong(0);

    public Visitor save(Visitor visitor) {
        visitCount.incrementAndGet();
        return visitor;
    }

    public long count() {
        return visitCount.get();
    }
}
