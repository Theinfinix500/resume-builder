import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Education, EducationForm } from '../../../store/state/resume.state';

@Component({
  selector: 'rb-education-section',
  standalone: true,
  imports: [],
  templateUrl: './education-section.component.html',
  styleUrl: './education-section.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EducationSectionComponent {
  @Input() educationList: Education[] | undefined;
}
