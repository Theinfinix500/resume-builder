import { inject, Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Resume } from '../../models/resume.model';
import {
  Education,
  EducationForm,
  PersonalDetails,
  ResumeState,
} from '../state/resume.state';
import {
  HideEducationForm,
  LoadResumeList,
  OpenEducationEdit,
  OpenEducationNewEntry,
  PrintResume,
} from '../actions/resume.actions';
import { ResetForm } from '@ngxs/form-plugin';

@Injectable({ providedIn: 'root' })
export class ResumesFacade {
  store: Store = inject(Store);

  @Select(ResumeState.resumes) resumes$!: Observable<Resume[]>;
  @Select(ResumeState.personalDetails) personalDetails$!: Observable<
    PersonalDetails | undefined
  >;
  @Select(ResumeState.educationList) educationList$!: Observable<
    Education[] | undefined
  >;
  @Select(ResumeState.isEducationFormVisible)
  isEducationFormVisible$!: Observable<boolean>;

  @Select(ResumeState.isEditMode)
  isEditMode$!: Observable<boolean>;

  loadResumes() {
    this.store.dispatch(LoadResumeList);
  }

  print() {
    this.store.dispatch(PrintResume);
  }

  openEducationNewEntry() {
    this.store.dispatch(OpenEducationNewEntry);
  }

  openEducationEdit(educationId: number) {
    this.store.dispatch(new OpenEducationEdit(educationId));
  }

  hideEducationForm() {
    this.store.dispatch(HideEducationForm);
  }
}
