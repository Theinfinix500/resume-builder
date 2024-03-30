import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'rb-personal-details',
  standalone: true,
  imports: [InputTextModule],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss',
})
export class PersonalDetailsComponent {}
