package org.acme;

import org.acme.Project;
import org.acme.ProjectService;
import org.acme.ProjectEntity;
import org.acme.ProjectRepository;

import jakarta.inject.Inject;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Date;

@ApplicationScoped
@Transactional
public class ProjectServiceImpl implements ProjectService {
    @Inject
    ProjectRepository projectRepository;

    @Override
    public Project create(Project project) {
        projectRepository.persist(project.toEntity());
        return project;
    }

    @Override
    public List<Project> findAll() {
        return projectRepository.findAll().stream().map(ProjectEntity::toDomain).toList();
    }
}