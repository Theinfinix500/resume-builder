import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ResumesFacade } from '../../../store/facade/resumes.facade';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'rb-education-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    NgxsFormPluginModule,
    InputTextModule,
    ButtonModule,
  ],
  templateUrl: './education-form.component.html',
  styleUrl: './education-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EducationFormComponent {
  resumesFacade: ResumesFacade = inject(ResumesFacade);
  fb: FormBuilder = inject(FormBuilder);
  educationForm!: FormGroup;
  isEditMode$: Observable<boolean> = this.resumesFacade.isEditMode$;

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

  addEducation() {
    this.resumesFacade.addEducation();
  }
}
