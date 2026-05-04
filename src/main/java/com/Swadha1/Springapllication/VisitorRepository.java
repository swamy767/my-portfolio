package com.Swadha1.Springapllication;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Visitor entity.
 * Hibernate auto-creates the "visitors" table on startup.
 */
public interface VisitorRepository extends JpaRepository<Visitor, Long> {
}
