import { inject, Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
    EditEducation,
    HideEducationForm,
    OpenEducationEdit,
    OpenEducationNewEntry,
    SaveEducation,
    ToggleEducation,
} from '../actions/education.actions';
import { Education, ResumeState } from '../state/resume.state';

@Injectable({ providedIn: 'root' })
export class EducationFacade {
  store: Store = inject(Store);

  @Select(ResumeState.educationList) educationList$!: Observable<
    Education[] | undefined
  >;
  @Select(ResumeState.educationFormDetails) educationFormDetails$!: Observable<
    Education[] | undefined
  >;

  @Select(ResumeState.isEducationFormVisible)
  isEducationFormVisible$!: Observable<boolean>;

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
