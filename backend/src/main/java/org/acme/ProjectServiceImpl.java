package org.acme;

import org.acme.Project;
import org.acme.ProjectService;
import org.acme.ProjectEntity;
import org.acme.ProjectRepository;

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

    @Override
    public Project create(Project project) {
        ProjectEntity entity = project.toEntity();
        projectRepository.persist(entity);
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
}