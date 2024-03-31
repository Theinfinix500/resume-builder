import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { EducationSectionComponent } from './education-section/education-section.component';
import { PersonalInfoSectionComponent } from './personal-info-section/personal-info-section.component';
import { ResumesFacade } from '../../store/facade/resumes.facade';
import { EducationForm, PersonalDetails } from '../../store/state/resume.state';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'rb-resume',
  standalone: true,
  imports: [
    ExperienceSectionComponent,
    EducationSectionComponent,
    PersonalInfoSectionComponent,
    AsyncPipe,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ResumeComponent {
  resumesFacade: ResumesFacade = inject(ResumesFacade);

  personalDetails$: Observable<PersonalDetails | undefined> =
    this.resumesFacade.personalDetails$;

  educationDetails$: Observable<EducationForm | undefined> =
    this.resumesFacade.educationDetails$;
}
