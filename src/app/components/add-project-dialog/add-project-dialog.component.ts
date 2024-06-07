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
  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectService: ProjectService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {}

  handleInput(event: Event, keyboard: KeyboardEvent) {
    const textarea = event.target as HTMLTextAreaElement;
    const text = textarea.value;

    if (!text.startsWith('\u2022')) {
      textarea.value = '\u2022 ' + text;
    }

    if (keyboard.key === 'Enter') {
      event.preventDefault();

      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;
      const newText =
        text.substring(0, startPos) + '\n\u2022 ' + text.substring(endPos);

      textarea.value = newText;
      textarea.setSelectionRange(startPos + 3, startPos + 3);
    }
  }

  save(): void {
    this.projectService.save(this.data);
    this.dialogRef.close();
  }
}
