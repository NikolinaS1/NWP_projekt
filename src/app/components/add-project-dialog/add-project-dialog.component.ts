import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../project.service';
import { Project } from '../../project.interface';

export interface DialogData {
  id?: number;
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
  volunteers: number;
  description: string;
  skills: string;
}

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css'],
})
export class AddProjectDialogComponent implements OnInit {
  isEditing: boolean = false;
  formData: DialogData = {
    id: undefined,
    title: '',
    location: '',
    startDate: new Date(),
    endDate: new Date(),
    volunteers: 0,
    description: '',
    skills: '',
  };

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.isEditing = this.data.id !== undefined;
    this.formData = { ...this.data };
  }

  save(): void {
    const projectData: Project = {
      id: this.formData.id || 0,
      title: this.formData.title,
      location: this.formData.location,
      startDate: this.formData.startDate,
      endDate: this.formData.endDate,
      volunteers: this.formData.volunteers,
      description: this.formData.description,
      skills: this.formData.skills,
    };

    if (this.isEditing) {
      this.projectService.update(projectData.id, projectData).subscribe(() => {
        this.dialogRef.close(projectData);
      });
    } else {
      this.projectService.save(projectData).subscribe(() => {
        this.dialogRef.close(projectData);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
