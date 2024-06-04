package org.acme;

import org.acme.ProjectResponse;
import org.acme.Project;
import org.acme.ProjectService;
import io.quarkus.security.Authenticated;

import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.util.List;
import java.util.Date;

@Path("/projects")
public class ProjectController {
    @Inject
    ProjectService projectService;

    @POST()
    @Authenticated
    @Produces(MediaType.APPLICATION_JSON)
    public ProjectResponse create(Project project) {
        Project q =  projectService.create(project);
        return new ProjectResponse(q.getTitle(), q.getLocation(), q.getStartDate(), q.getEndDate(), q.getDescription(), q.getSkills());
    }

    @GET()
    public List<Project> list() {
        return projectService.findAll();
    }
}
