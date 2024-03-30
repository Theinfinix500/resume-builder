import { Component, inject, ViewEncapsulation } from '@angular/core';
import { ExperienceSectionComponent } from './experience-section/experience-section.component';
import { EducationSectionComponent } from './education-section/education-section.component';
import { PersonalInfoSectionComponent } from './personal-info-section/personal-info-section.component';

@Component({
  selector: 'rb-resume',
  standalone: true,
  imports: [
    ExperienceSectionComponent,
    EducationSectionComponent,
    PersonalInfoSectionComponent,
  ],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ResumeComponent {}
