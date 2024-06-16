package org.acme;

import org.acme.Project;
import org.acme.ProjectService;
import org.acme.ProjectEntity;
import org.acme.ProjectRepository;
import org.acme.ProjectRequest;

import jakarta.inject.Inject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@ApplicationScoped
@Transactional
public class ProjectServiceImpl implements ProjectService {
    @Inject
    ProjectRepository projectRepository;

    @Inject
    UserService userService;

    @Override
    public Project create(Project project) {
        ProjectEntity entity = new ProjectEntity(project.getTitle(), project.getLocation(), project.getStartDate(), project.getEndDate(), project.getVolunteers(), project.getDescription(), project.getSkills());
        projectRepository.persist(entity);
        projectRepository.flush(); 
        return entity.toDomain();
    }


    @Override
    public List<Project> findAll() {
        return projectRepository.findAll().stream().map(ProjectEntity::toDomain).collect(Collectors.toList());
    }

    @Override
    public Project findById(Long id) {
        Optional<ProjectEntity> entity = projectRepository.findByIdOptional(id);
        return entity.map(ProjectEntity::toDomain).orElse(null);
    }

    @Override
    public boolean delete(Long id) {
        return projectRepository.deleteById(id);
    }

    @Override
    public void update(Project project) {
        ProjectEntity entity = projectRepository.findById(project.getId());
        if (entity != null) {
            entity.setTitle(project.getTitle());
            entity.setLocation(project.getLocation());
            entity.setStartDate(project.getStartDate());
            entity.setEndDate(project.getEndDate());
            entity.setVolunteers(project.getVolunteers());
            entity.setDescription(project.getDescription());
            entity.setSkills(project.getSkills());
            projectRepository.persist(entity);
            projectRepository.flush(); 
        }
    }

    @Override
    public List<Project> findProjectsByUserId(String userId) {
        return userService.findProjectsByUserId(userId);
    }
}