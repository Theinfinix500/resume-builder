import { AsyncPipe } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Observable, tap } from 'rxjs';
import { ResumesFacade } from '../../../store/facade/resumes.facade';

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
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.initForm();
    this.isEditMode$.pipe(
      tap((isEditMode) => {
        this.isEditMode = isEditMode;
      }),
    );
  }

  private initForm() {
    this.educationForm = this.fb.group({
      id: '',
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

  saveEducation() {
    this.resumesFacade.saveEducation();
  }
}
