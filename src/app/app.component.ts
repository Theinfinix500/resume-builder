import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { FormWrapperComponent } from './components/form-wrapper/form-wrapper.component';
import { ResumeComponent } from './components/resume/resume.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { Resume } from './models/resume.model';
import { ResumesFacade } from './store/facade/resumes.facade';
import { SimpleTemplateComponent } from './templates/simple-template/simple-template.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    AsyncPipe,
    JsonPipe,
    SimpleTemplateComponent,
    ResumeComponent,
    FormWrapperComponent,
    SidebarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  resumesFacade: ResumesFacade = inject(ResumesFacade);
  resumes$: Observable<Resume[]> = this.resumesFacade.resumes$;

  loadResumes() {
    this.resumesFacade.loadResumes();
  }

  print() {
    this.resumesFacade.print();
  }
}
