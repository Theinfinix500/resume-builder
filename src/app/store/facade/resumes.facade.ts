import { inject, Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Resume } from '../../models/resume.model';
import {
  EducationForm,
  PersonalDetails,
  ResumeState,
} from '../state/resume.state';
import {
  HideEducationForm,
  LoadResumeList,
  PrintResume,
  ShowEducationForm,
} from '../actions/resume.actions';

@Injectable({ providedIn: 'root' })
export class ResumesFacade {
  store: Store = inject(Store);

  @Select(ResumeState.resumes) resumes$!: Observable<Resume[]>;
  @Select(ResumeState.personalDetails) personalDetails$!: Observable<
    PersonalDetails | undefined
  >;
  @Select(ResumeState.educationDetails) educationDetails$!: Observable<
    EducationForm | undefined
  >;
  @Select(ResumeState.isEducationFormVisible)
  isEducationFormVisible$!: Observable<boolean>;

  loadResumes() {
    this.store.dispatch(LoadResumeList);
  }

  print() {
    this.store.dispatch(PrintResume);
  }

  showEducationForm() {
    this.store.dispatch(ShowEducationForm);
  }

  hideEducationForm() {
    this.store.dispatch(HideEducationForm);
  }
}
