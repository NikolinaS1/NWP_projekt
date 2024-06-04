package org.acme;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.util.Date;

@Entity
@Table(name = "projects")
public class ProjectEntity extends PanacheEntityBase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String location;
    private Date startDate;
    private Date endDate;
	private int volunteers;
    private String description;
    private String skills;

    public ProjectEntity() {}

    public ProjectEntity(String title, String location, Date startDate, Date endDate, int volunteers, String description, String skills) {
        this.title = title;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
		this.volunteers = volunteers;
        this.description = description;
        this.skills = skills;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public int getVolunteers() {
        return volunteers;
    }

    public void setVolunteers(int volunteers) {
        this.volunteers = volunteers;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSkills() {
        return skills;
    }

    public void setSkills(String skills) {
        this.skills = skills;
    }

    public Project toDomain() {
        return new Project(this.id, this.title, this.location, this.startDate, this.endDate, this.volunteers, this.description, this.skills);
    }
}
