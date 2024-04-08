import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { EducationFormComponent } from '../education-form/education-form.component';
import { ResumesFacade } from '../../../store/facade/resumes.facade';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Education } from '../../../store/state/resume.state';

@Component({
  selector: 'rb-education-list',
  standalone: true,
  imports: [ButtonModule, EducationFormComponent, AsyncPipe],
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

  editEducation(educationId?: number) {
    this.resumesFacade.openEducationEdit(educationId);
  }
}
