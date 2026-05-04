package com.Swadha1.Springapllication;

import java.time.LocalDateTime;

public class Message {

    private Long id;
    private String name;
    private String email;
    private String subject;
    private String messageText;
    private LocalDateTime sentAt;

    public Long getId()                             { return id; }
    public void setId(Long id)                      { this.id = id; }
    public String getName()                         { return name; }
    public void setName(String name)                { this.name = name; }
    public String getEmail()                        { return email; }
    public void setEmail(String email)              { this.email = email; }
    public String getSubject()                      { return subject; }
    public void setSubject(String subject)          { this.subject = subject; }
    public String getMessageText()                  { return messageText; }
    public void setMessageText(String messageText)  { this.messageText = messageText; }
    public LocalDateTime getSentAt()                { return sentAt; }
    public void setSentAt(LocalDateTime sentAt)     { this.sentAt = sentAt; }
}
