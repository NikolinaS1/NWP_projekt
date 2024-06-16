package org.acme;

import org.acme.UserProjectAssignment;
import org.acme.UserProjectAssignmentId;

import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserProjectAssignmentRepository implements PanacheRepositoryBase<UserProjectAssignment, UserProjectAssignmentId> {
}
