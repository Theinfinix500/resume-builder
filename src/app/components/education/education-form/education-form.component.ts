import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ResumesFacade } from '../../../store/facade/resumes.facade';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@Component({
  selector: 'rb-education-form',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe, NgxsFormPluginModule],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EducationFormComponent {
  resumesFacade: ResumesFacade = inject(ResumesFacade);
  fb: FormBuilder = inject(FormBuilder);
  educationForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.educationForm = this.fb.group({
      school: '',
      degree: '',
      startDate: '',
      endDate: '',
      location: '',
    });
  }

  hideForm() {
    this.resumesFacade.hideEducationForm();
  }
}
