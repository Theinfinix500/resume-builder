import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PersonalDetails } from '../../../store/state/resume.state';

@Component({
  selector: 'rb-personal-info-section',
  standalone: true,
  imports: [],
  templateUrl: './personal-info-section.component.html',
  styleUrl: './personal-info-section.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PersonalInfoSectionComponent {
  @Input() personalDetails: PersonalDetails | undefined;
}
