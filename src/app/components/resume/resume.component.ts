import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { EducationFacade } from '../../store/facade/education.facade';
import { ResumesFacade } from '../../store/facade/resumes.facade';
import { Education, PersonalDetails } from '../../store/state/resume.state';
import { EducationSectionComponent } from './education-section/education-section.component';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { PersonalInfoSectionComponent } from './personal-info-section/personal-info-section.component';

@Component({
  selector: 'rb-resume',
  standalone: true,
  imports: [
    ExperienceSectionComponent,
    EducationSectionComponent,
    PersonalInfoSectionComponent,
    AsyncPipe,
    JsonPipe,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ResumeComponent {
  showEducationList: boolean = false;
  resumesFacade: ResumesFacade = inject(ResumesFacade);
  educationFacade: EducationFacade = inject(EducationFacade);

  personalDetails$: Observable<PersonalDetails | undefined> =
    this.resumesFacade.personalDetails$;

  educationList$: Observable<Education[] | undefined> =
    this.educationFacade.educationList$.pipe(
      tap((educationList) => {
        this.showEducationList = educationList?.some(
          (education) => education.isVisible,
        ) as boolean;
      }),
    );
}
