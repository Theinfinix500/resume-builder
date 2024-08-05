import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ResumesFacade } from '../../store/facade/resumes.facade';
import { EducationListComponent } from '../education/education-list/education-list.component';
import { ExperienceListComponent } from '../experience/experience-list/experience-list.component';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';

@Component({
  selector: 'rb-form-wrapper',
  standalone: true,
  imports: [
    PersonalDetailsComponent,
    ExperienceListComponent,
    EducationListComponent,
    ButtonModule,
  ],
  templateUrl: './form-wrapper.component.html',
  styleUrl: './form-wrapper.component.scss',
})
export class FormWrapperComponent {
  resumesFacade: ResumesFacade = inject(ResumesFacade);

  download() {
    this.resumesFacade.print();
  }
}
