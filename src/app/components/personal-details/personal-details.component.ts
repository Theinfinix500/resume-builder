import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@Component({
  selector: 'rb-personal-details',
  standalone: true,
  imports: [
    InputTextModule,
    ReactiveFormsModule,
    AsyncPipe,
    JsonPipe,
    NgxsFormPluginModule,
  ],
  templateUrl: './personal-details.component.html',
  styleUrl: './personal-details.component.scss',
})
export class PersonalDetailsComponent implements OnInit {
  fb: FormBuilder = inject(FormBuilder);
  personalDetailsForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.personalDetailsForm = this.fb.group({
      fullName: '',
      email: '',
      address: '',
      phoneNumber: '',
    });
  }
}
