import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { EducationFacade } from '../../../store/facade/education.facade';
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
  educationFacade: EducationFacade = inject(EducationFacade);

  isEducationFormVisible$: Observable<boolean> =
    this.educationFacade.isEducationFormVisible$;
  educationList$: Observable<Education[] | undefined> =
    this.educationFacade.educationList$;

  addNewEducation() {
    this.educationFacade.openEducationNewEntry();
  }

  toggleEducation(event: Event, educationId?: number) {
    event.stopPropagation();
    this.educationFacade.toggleEducation(educationId as number);
  }

  editEducation(educationId?: number) {
    this.educationFacade.openEducationEdit(educationId);
  }
}
