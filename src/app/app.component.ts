import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { Resume } from './models/resume.model';
import { Select, Store } from '@ngxs/store';
import { ResumeState } from './store/state/resume.state';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { LoadResumeList } from './store/actions/resume.actions';
import { ResumesFacade } from './store/facade/resumes.facade';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, AsyncPipe, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  resumesFacade: ResumesFacade = inject(ResumesFacade);
  resumes$: Observable<Resume[]> = this.resumesFacade.resumes$;

  loadResumes() {
    this.resumesFacade.loadResumes();
  }
}
