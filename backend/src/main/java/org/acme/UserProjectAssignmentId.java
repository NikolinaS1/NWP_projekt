package org.acme;

import java.io.Serializable;
import jakarta.persistence.Embeddable;
import java.util.Objects;
import jakarta.persistence.Column;

@Embeddable
public class UserProjectAssignmentId implements Serializable {

    @Column(name = "user_id")
    private String userId;

    @Column(name = "project_id")
    private Long projectId;

    public UserProjectAssignmentId() {}

    public UserProjectAssignmentId(String userId, Long projectId) {
        this.userId = userId;
        this.projectId = projectId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserProjectAssignmentId that = (UserProjectAssignmentId) o;
        return Objects.equals(userId, that.userId) &&
               Objects.equals(projectId, that.projectId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, projectId);
    }
}