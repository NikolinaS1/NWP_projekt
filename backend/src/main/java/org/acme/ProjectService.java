package org.acme;

import org.acme.Project;
import org.acme.ProjectEntity;

import java.util.Date;
import java.util.List;

public interface ProjectService {
    public Project create(Project project);
    public List<Project> findAll();
    public Project findById(Long id);
}