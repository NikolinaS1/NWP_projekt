package org.acme;

import org.acme.Project;
import org.acme.UserService;
import org.acme.UserProjectAssignmentRepository;
import org.acme.UserProjectAssignment;
import org.acme.ProjectEntity;

import jakarta.inject.Inject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class UserServiceImpl implements UserService {

    @Inject
    UserProjectAssignmentRepository userProjectAssignmentRepository;

    @Override
    public List<Project> findProjectsByUserId(String userId) {
        List<UserProjectAssignment> assignments = userProjectAssignmentRepository.find("id.userId", userId).list();
        return assignments.stream()
                .map(UserProjectAssignment::getProject)
                .map(ProjectEntity::toDomain) 
                .collect(Collectors.toList());
    }

    @Override
    public void unassignUserFromProject(String userId, Long projectId) {
        UserProjectAssignmentId id = new UserProjectAssignmentId(userId, projectId);
        UserProjectAssignment assignment = userProjectAssignmentRepository.findById(id);

        if (assignment != null) {
            userProjectAssignmentRepository.delete(assignment);
        }
    }
}
