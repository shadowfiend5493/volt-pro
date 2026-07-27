package com.voltpro.voltstore.controller;

import com.voltpro.voltstore.dto.ContactRequest;
import com.voltpro.voltstore.dto.ContactResponse;
import com.voltpro.voltstore.service.ContactService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/contacts")
@Tag(name = "Contacts", description = "Contact form submission APIs")
public class ContactController {

    private final ContactService contactService;

    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    @Operation(summary = "Submit a contact request", description = "Creates a new contact request from the public Contact Us form.")
    @ApiResponse(responseCode = "201", description = "Contact request created")
    @ApiResponse(responseCode = "400", description = "Validation failed")
    public ResponseEntity<ContactResponse> createContact(@Valid @RequestBody ContactRequest contactRequest) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.createContact(contactRequest));
    }
}
