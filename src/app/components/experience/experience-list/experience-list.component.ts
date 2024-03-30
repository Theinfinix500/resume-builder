import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'rb-experience-list',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './experience-list.component.html',
  styleUrl: './experience-list.component.scss',
})
export class ExperienceListComponent {}
