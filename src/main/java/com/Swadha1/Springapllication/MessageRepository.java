package com.Swadha1.Springapllication;

import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class MessageRepository {

    private final List<Message> store = new ArrayList<>();
    private final AtomicLong idGen = new AtomicLong(1);

    public Message save(Message msg) {
        msg.setId(idGen.getAndIncrement());
        msg.setSentAt(LocalDateTime.now());
        store.add(msg);
        return msg;
    }

    public long count() {
        return store.size();
    }
}
