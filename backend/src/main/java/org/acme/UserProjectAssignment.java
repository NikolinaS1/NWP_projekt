package org.acme;

import jakarta.persistence.*;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import org.acme.ProjectEntity;
import org.acme.UserProjectAssignmentId;

@Entity
@Table(name = "user_project")
public class UserProjectAssignment {

    @EmbeddedId
    private UserProjectAssignmentId id;

    @ManyToOne
    @MapsId("projectId")
    @JoinColumn(name = "project_id")
    private ProjectEntity project;

    public UserProjectAssignment() {}

    public UserProjectAssignment(UserProjectAssignmentId id, ProjectEntity project) {
        this.id = id;
        this.project = project;
    }

    public UserProjectAssignmentId getId() {
        return id;
    }

    public void setId(UserProjectAssignmentId id) {
        this.id = id;
    }

    public ProjectEntity getProject() {
        return project;
    }

    public void setProject(ProjectEntity project) {
        this.project = project;
    }
}
