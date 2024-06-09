import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from '../../project.service';

export interface DialogData {
  id: number;
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
  volunteers: Number;
  description: string;
  skills: string;
}

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: './add-project-dialog.component.html',
  styleUrls: ['./add-project-dialog.component.css'],
})
export class AddProjectDialogComponent implements OnInit {
  updateMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.updateMode = !!this.data.id;
  }

  save(): void {
    if (this.updateMode) {
      this.projectService.update(this.data.id, this.data).subscribe(() => {
        this.dialogRef.close(this.data);
      });
    } else {
      this.projectService.save(this.data).subscribe(() => {
        this.dialogRef.close(this.data);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
