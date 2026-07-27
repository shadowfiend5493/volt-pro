package com.voltpro.voltstore.dto;

public class ContactResponse {

    private Long contactId;
    private String message;

    public ContactResponse(Long contactId, String message) {
        this.contactId = contactId;
        this.message = message;
    }

    public Long getContactId() {
        return contactId;
    }

    public String getMessage() {
        return message;
    }
}
