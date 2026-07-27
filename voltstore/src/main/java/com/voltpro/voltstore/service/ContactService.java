package com.voltpro.voltstore.service;

import com.voltpro.voltstore.dto.ContactRequest;
import com.voltpro.voltstore.dto.ContactResponse;
import com.voltpro.voltstore.model.Contact;
import com.voltpro.voltstore.repository.ContactRepository;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final String WEBSITE_CREATED_BY = "website";

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {
        this.contactRepository = contactRepository;
    }

    public ContactResponse createContact(ContactRequest contactRequest) {
        Contact contact = new Contact();
        contact.setName(contactRequest.getName().trim());
        contact.setEmail(contactRequest.getEmail().trim());
        contact.setMobileNumber(contactRequest.getMobileNumber().trim());
        contact.setMessage(contactRequest.getMessage().trim());
        // createdBy is server-owned so users cannot spoof audit fields from the form.
        contact.setCreatedBy(WEBSITE_CREATED_BY);

        Contact savedContact = contactRepository.save(contact);

        return new ContactResponse(savedContact.getContactId(), "Thanks, we will contact you soon.");
    }
}
