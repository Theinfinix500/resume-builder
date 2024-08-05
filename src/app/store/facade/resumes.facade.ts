import { inject, Injectable } from '@angular/core';
import { Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Resume } from '../../models/resume.model';
import {
  HideEducationForm,
  OpenEducationEdit,
  OpenEducationNewEntry,
} from '../actions/education.actions';
import { LoadResumeList, PrintResume } from '../actions/resume.actions';
import { PersonalDetails, ResumeState } from '../state/resume.state';

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

  @Select(ResumeState.isEditMode)
  isEditMode$!: Observable<boolean>;

  loadResumes() {
    this.store.dispatch(LoadResumeList);
  }

  print() {
    this.store.dispatch(PrintResume);
  }
}
