import { inject, Injectable } from '@angular/core';
import {
  Actions,
  ofAction,
  ofActionDispatched,
  Select,
  Store,
} from '@ngxs/store';
import { Observable } from 'rxjs';
import { Resume } from '../../models/resume.model';
import { Education, PersonalDetails, ResumeState } from '../state/resume.state';
import {
  SaveEducation,
  EditEducation,
  HideEducationForm,
  LoadResumeList,
  OpenEducationEdit,
  OpenEducationNewEntry,
  PrintResume,
  ToggleEducation,
} from '../actions/resume.actions';

@Injectable({ providedIn: 'root' })
export class ResumesFacade {
  store: Store = inject(Store);
  actions$: Actions = inject(Actions);

  constructor() {
    this.actions$
      .pipe(
        ofActionDispatched(
          OpenEducationNewEntry,
          OpenEducationEdit,
          HideEducationForm,
        ),
      )
      .subscribe((action) => {
        // TODO check how to implement this using actions$
        switch (action) {
          case action instanceof OpenEducationNewEntry:
            // isEducationFormVisible: true,
            // isEditMode: false,
            return;
        }
      });
  }

  @Select(ResumeState.resumes) resumes$!: Observable<Resume[]>;
  @Select(ResumeState.personalDetails) personalDetails$!: Observable<
    PersonalDetails | undefined
  >;
  @Select(ResumeState.educationList) educationList$!: Observable<
    Education[] | undefined
  >;
  @Select(ResumeState.educationFormDetails) educationFormDetails$!: Observable<
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

  openEducationEdit(educationId?: number) {
    this.store.dispatch(new OpenEducationEdit(educationId));
  }

  saveEducation() {
    this.store.dispatch(SaveEducation);
  }

  editEducation() {
    this.store.dispatch(EditEducation);
  }

  hideEducationForm() {
    this.store.dispatch(HideEducationForm);
  }

  toggleEducation(educationId: number) {
    this.store.dispatch(new ToggleEducation(educationId));
  }
}
