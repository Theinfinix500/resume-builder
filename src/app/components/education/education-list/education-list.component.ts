import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { ResumesFacade } from '../../../store/facade/resumes.facade';
import { Education } from '../../../store/state/resume.state';
import { EducationFormComponent } from '../education-form/education-form.component';

@Component({
  selector: 'rb-education-list',
  standalone: true,
  imports: [ButtonModule, EducationFormComponent, AsyncPipe, NgClass],
  templateUrl: './education-list.component.html',
  styleUrl: './education-list.component.scss',
})
export class EducationListComponent {
  resumesFacade: ResumesFacade = inject(ResumesFacade);

  isEducationFormVisible$: Observable<boolean> =
    this.resumesFacade.isEducationFormVisible$;
  educationList$: Observable<Education[] | undefined> =
    this.resumesFacade.educationList$;

  addNewEducation() {
    this.resumesFacade.openEducationNewEntry();
  }

  toggleEducation(event: Event, educationId?: number) {
    event.stopPropagation();
    this.resumesFacade.toggleEducation(educationId as number);
  }

  editEducation(educationId?: number) {
    this.resumesFacade.openEducationEdit(educationId);
  }
}
