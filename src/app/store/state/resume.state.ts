import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Resume } from '../../models/resume.model';
import { RESUME_STATE_NAME } from '../state.name';
import { LoadResumeList, PrintResume } from '../actions/resume.actions';
import { PrintService } from '../../services/print.service';

export interface FormStatus<T> {
  model?: T;
  dirty: boolean;
  status: string;
  errors: {};
}

// extends FormStatus
export interface PersonalDetails {
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
}

export interface ResumeForm {
  personalDetails: FormStatus<PersonalDetails>;
  // TODO should change these to a correct type
  experience: {};
  education: {};
}
export interface ResumeStateModel {
  resumes: Resume[];
  infos: ResumeForm;
}

@State<ResumeStateModel>({
  name: RESUME_STATE_NAME,
  defaults: {
    resumes: [],
    infos: {
      personalDetails: {
        model: {
          fullName: '',
          email: '',
          address: '',
          phoneNumber: '',
        },
        dirty: false,
        status: '',
        errors: {},
      },
      experience: {},
      education: {},
    },
  },
})
@Injectable()
export class ResumeState {
  printService: PrintService = inject(PrintService);

  @Selector()
  static resumes(state: ResumeStateModel) {
    return state.resumes;
  }

  @Selector()
  static personalDetails(state: ResumeStateModel): PersonalDetails | undefined {
    return state.infos.personalDetails.model;
  }

  @Action(LoadResumeList)
  loadAllResumes({ getState, setState }: StateContext<ResumeStateModel>) {
    setState({
      ...getState(),
      resumes: [
        {
          name: 'Resume No 1',
        },
      ],
    });
  }

  @Action(PrintResume)
  printResume() {
    this.printService.printTemplate();
  }
}
