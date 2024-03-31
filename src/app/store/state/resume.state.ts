import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Resume } from '../../models/resume.model';
import { RESUME_STATE_NAME } from '../state.name';
import {
  HideEducationForm,
  LoadResumeList,
  PrintResume,
  ShowEducationForm,
} from '../actions/resume.actions';
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

export interface EducationForm {
  school: string;
  degree: string;
  startDate: string;
  endDate: string;
  location: string;
}

export interface ResumeForm {
  personalDetails: FormStatus<PersonalDetails>;
  // TODO should change these to a correct type
  experienceForm: {};
  educationForm: FormStatus<EducationForm>;
}

export interface ResumeUiState {
  isEducationFormVisible: boolean;
  isExperienceFormVisible: boolean;
}
export interface ResumeStateModel {
  resumes: Resume[];
  infos: ResumeForm;
  ui: ResumeUiState;
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
      educationForm: {
        model: {
          school: 'FST Settat',
          degree: 'Master',
          startDate: 'June 2021',
          endDate: 'June 2023',
          location: 'Casablanca, Morocco',
        },
        dirty: false,
        status: '',
        errors: {},
      },
      experienceForm: {},
    },
    ui: {
      isEducationFormVisible: false,
      isExperienceFormVisible: false,
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

  @Selector()
  static educationDetails(state: ResumeStateModel): EducationForm | undefined {
    return state.infos.educationForm.model;
  }

  @Selector()
  static isEducationFormVisible(state: ResumeStateModel): boolean {
    return state.ui.isEducationFormVisible;
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

  @Action(ShowEducationForm)
  showEducationForm({ getState, setState }: StateContext<ResumeStateModel>) {
    setState({
      ...getState(),
      ui: { ...getState().ui, isEducationFormVisible: true },
    });
  }

  @Action(HideEducationForm)
  hideEducationForm({ getState, setState }: StateContext<ResumeStateModel>) {
    setState({
      ...getState(),
      ui: { ...getState().ui, isEducationFormVisible: false },
    });
  }
}
