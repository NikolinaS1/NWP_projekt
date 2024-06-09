package org.acme;

import org.acme.ProjectEntity;
import java.util.Date;

public class ProjectRequest {
    private String title;
    private String location;
    private Date startDate;
    private Date endDate;
    private int volunteers;
    private String description;
    private String skills;

    public ProjectRequest() {}

    public ProjectRequest(String title, String location, Date startDate, Date endDate, int volunteers, String description, String skills) {
        this.title = title;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
        this.volunteers = volunteers;
        this.description = description;
        this.skills = skills;
    }

	public String getTitle() {
		return this.title;
	}

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

	public int getVolunteers() {
		return this.volunteers;
	}

	public void setVolunteers(int volunteers) {
		this.volunteers = volunteers;
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
}