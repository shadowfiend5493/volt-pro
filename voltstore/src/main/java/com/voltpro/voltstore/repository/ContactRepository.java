package com.voltpro.voltstore.repository;

import com.voltpro.voltstore.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
