package org.acme;

import java.util.List;

public interface ProjectService {
    Project create(Project project);
    List<Project> findAll();
    Project findById(Long id);
    boolean delete(Long id);
}
