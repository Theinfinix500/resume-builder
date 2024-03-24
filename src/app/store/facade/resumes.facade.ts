import { inject, Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Resume } from '../../models/resume.model';
import { ResumeState } from '../state/resume.state';
import { LoadResumeList } from '../actions/resume.actions';

@Injectable({ providedIn: 'root' })
export class ResumesFacade {
  @Select(ResumeState.resumes) resumes$!: Observable<Resume[]>;
  store: Store = inject(Store);

  loadResumes() {
    this.store.dispatch(LoadResumeList);
  }
}
