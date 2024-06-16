package org.acme;

import org.acme.ProjectResponse;
import org.acme.Project;
import org.acme.ProjectService;
import org.acme.ProjectRequest;
import org.acme.UserProjectAssignment;
import org.acme.UserProjectAssignmentId;
import org.acme.ProjectRepository;
import org.acme.UserProjectAssignmentRepository;
import io.quarkus.security.Authenticated;

import jakarta.transaction.Transactional;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.PathParam;
import java.util.List;
import java.util.Date;

@Path("/projects")
public class ProjectController {
    @Inject
    ProjectService projectService;

    @Inject
    ProjectRepository projectRepository;

    @Inject
    UserProjectAssignmentRepository userProjectAssignmentRepository;

    @POST()
    @Authenticated
    @Produces(MediaType.APPLICATION_JSON)
    public ProjectResponse create(Project project) {
        Project q =  projectService.create(project);
        return new ProjectResponse(q.getTitle(), q.getLocation(), q.getStartDate(), q.getEndDate(), q.getVolunteers(), q.getDescription(), q.getSkills());
    }

    @GET()
    public List<Project> list() {
        return projectService.findAll();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findById(@PathParam("id") Long id) {
        Project project = projectService.findById(id);
        if (project != null) {
            return Response.ok(project).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build();
        }
    }

    @DELETE
    @Path("/{id}")
    @Authenticated
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = projectService.delete(id);
        if (deleted) {
            return Response.noContent().build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).build(); 
        }
    }

    @PUT
    @Path("/{id}")
    @Authenticated
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(@PathParam("id") Long id, ProjectRequest projectRequest) {
        Project project = projectService.findById(id);
        if (project == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        project.setTitle(projectRequest.getTitle());
        project.setLocation(projectRequest.getLocation());
        project.setStartDate(projectRequest.getStartDate());
        project.setEndDate(projectRequest.getEndDate());
        project.setVolunteers(projectRequest.getVolunteers());
        project.setDescription(projectRequest.getDescription());
        project.setSkills(projectRequest.getSkills());

        projectService.update(project);

        return Response.ok(project).build();
    }

    @PUT
    @Path("/{projectId}/assign/{userId}")
    @Authenticated
    @Transactional
    public Response assignUserToProject(@PathParam("projectId") Long projectId, @PathParam("userId") String userId) {
        ProjectEntity project = projectRepository.findById(projectId);

        if (project == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        UserProjectAssignmentId id = new UserProjectAssignmentId(userId, projectId);

        UserProjectAssignment assignment = userProjectAssignmentRepository.findById(id);
        if (assignment != null) {
            return Response.status(Response.Status.CONFLICT).build();
        }

        assignment = new UserProjectAssignment();
        assignment.setId(id);
        assignment.setProject(project);

        userProjectAssignmentRepository.persist(assignment);

        return Response.ok().build();
    }

    @GET
    @Path("/user/{userId}")
    @Authenticated
    @Produces(MediaType.APPLICATION_JSON)
    public Response getUserProjects(@PathParam("userId") String userId) {
        List<Project> projects = projectService.findProjectsByUserId(userId);
        return Response.ok(projects).build();
    }
}
