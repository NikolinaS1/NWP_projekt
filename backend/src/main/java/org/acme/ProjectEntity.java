package org.acme;

import org.acme.Project;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import jakarta.persistence.Entity;
import java.util.Date;
import jakarta.persistence.*;


@Entity
@Table(name = "projects")
public class ProjectEntity extends PanacheEntity {

    private String title;
    private String location;
    private Date startDate;
    private Date endDate;
    private String description;
    private String skills;

    public String getTitle() {
        return title;
    }

    public ProjectEntity(String title, String location, Date startDate, Date endDate, String description, String skills) {
        this.title = title;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.description = description;
        this.skills = skills;
    }

    public ProjectEntity() {}

    public void setTitle(String title) {
        this.title = title;
    }

    public String getLocation() {
		return this.location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public Date getStartDate() {
		return this.startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return this.endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getDescription() {
		return this.description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSkills() {
		return this.skills;
	}

	public void setSkills(String skills) {
		this.skills = skills;
	}


    public Project toDomain() {
        return new Project(this.id, this.title, this.location, this.startDate, this.endDate, this.description, this.skills);
    }
}