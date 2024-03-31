import { inject, Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Resume } from '../../models/resume.model';
import { PersonalDetails, ResumeState } from '../state/resume.state';
import { LoadResumeList, PrintResume } from '../actions/resume.actions';

@Injectable({ providedIn: 'root' })
export class ResumesFacade {
  store: Store = inject(Store);

  @Select(ResumeState.resumes) resumes$!: Observable<Resume[]>;
  @Select(ResumeState.personalDetails) personalDetails$!: Observable<
    PersonalDetails | undefined
  >;

  loadResumes() {
    this.store.dispatch(LoadResumeList);
  }

  print() {
    this.store.dispatch(PrintResume);
  }
}
