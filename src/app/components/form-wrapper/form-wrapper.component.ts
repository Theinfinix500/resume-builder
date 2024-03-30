import { Component } from '@angular/core';
import { PersonalDetailsComponent } from '../personal-details/personal-details.component';
import { ExperienceListComponent } from '../experience/experience-list/experience-list.component';
import { EducationListComponent } from '../education/education-list/education-list.component';

@Component({
  selector: 'rb-form-wrapper',
  standalone: true,
  imports: [
    PersonalDetailsComponent,
    ExperienceListComponent,
    EducationListComponent,
  ],
  templateUrl: './form-wrapper.component.html',
  styleUrl: './form-wrapper.component.scss',
})
export class FormWrapperComponent {}
