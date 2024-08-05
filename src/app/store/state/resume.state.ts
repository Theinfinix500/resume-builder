import { inject, Injectable } from '@angular/core';
import { ResetForm, UpdateFormValue } from '@ngxs/form-plugin';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { produce } from 'immer';
import { Resume } from '../../models/resume.model';
import { PrintService } from '../../services/print.service';
import { LoadResumeList, PrintResume } from '../actions/resume.actions';

import {
  HideEducationForm,
  OpenEducationEdit,
  OpenEducationNewEntry,
  SaveEducation,
  ToggleEducation,
} from '../actions/education.actions';
import { RESUME_STATE_NAME } from '../state.name';

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
  id?: number;
  school?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
}

export interface ExperienceForm {
  companyName: string;
  positionTitle: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
}

export interface ResumeSection<T, V = void, W = void> {
  form: T;
  ui?: W;
  list?: V;
}

export interface Education extends EducationForm {
  id?: number;
  isVisible: boolean;
}

export interface Experience extends ExperienceForm {
  id: number;
}

export interface EducationUiState {
  isEducationFormVisible?: boolean;
  isEditMode?: boolean;
}
export interface ExperienceUiState {
  isExperienceFormVisible: boolean;
}

export interface ResumeSections {
  personalDetails: ResumeSection<FormStatus<PersonalDetails>>;
  education: ResumeSection<
    FormStatus<EducationForm>,
    Education[],
    EducationUiState
  >;
  experience: ResumeSection<
    FormStatus<ExperienceForm>,
    Experience[],
    ExperienceUiState
  >;
}

export interface ResumeStateModel {
  resumes: Resume[];
  sections: ResumeSections;
}

@State<ResumeStateModel>({
  name: RESUME_STATE_NAME,
  defaults: {
    resumes: [],
    sections: {
      personalDetails: {
        form: {
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
      },
      education: {
        form: {
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
        list: [
          {
            id: 1,
            school: 'London City University',
            degree: 'Master',
            startDate: 'June 2021',
            endDate: 'June 2023',
            location: 'Casablanca, Morocco',
            isVisible: true,
          },
          {
            id: 2,
            school: 'Another University',
            degree: 'Master',
            startDate: 'June 2021',
            endDate: 'June 2023',
            location: 'Casablanca, Morocco',
            isVisible: false,
          },
        ],
        ui: {
          isEducationFormVisible: false,
          isEditMode: false,
        },
      },
      experience: {
        form: {
          model: {
            companyName: '',
            positionTitle: '',
            startDate: '',
            endDate: '',
            location: '',
            description: '',
          },
          dirty: false,
          status: '',
          errors: {},
        },
        list: [],
        ui: {
          isExperienceFormVisible: false,
        },
      },
    },
  },
})
@Injectable()
export class ResumeState {
  printService: PrintService = inject(PrintService);
  store: Store = inject(Store);

  @Selector()
  static resumes(state: ResumeStateModel) {
    return state.resumes;
  }

  @Selector()
  static personalDetails(state: ResumeStateModel): PersonalDetails | undefined {
    return state.sections.personalDetails.form.model;
  }

  @Selector()
  static educationFormDetails(
    state: ResumeStateModel,
  ): EducationForm | undefined {
    return state.sections.education.form.model;
  }

  @Selector()
  static educationList(state: ResumeStateModel): Education[] | undefined {
    return state.sections.education.list;
  }

  @Selector()
  static isEducationFormVisible(state: ResumeStateModel): boolean | undefined {
    return state.sections.education?.ui?.isEducationFormVisible;
  }

  @Selector()
  static isEditMode(state: ResumeStateModel): boolean | undefined {
    return state.sections.education?.ui?.isEditMode;
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

  @Action(OpenEducationNewEntry)
  openEducationNewEntry({
    getState,
    setState,
  }: StateContext<ResumeStateModel>) {
    this.resetEducationForm();
    setState({
      ...getState(),
      sections: {
        ...getState().sections,
        education: {
          ...getState().sections.education,
          ui: {
            ...getState().sections.education.ui,
            isEducationFormVisible: true,
            isEditMode: false,
          },
        },
      },
    });
  }

  @Action(SaveEducation)
  saveEducation({ getState, setState }: StateContext<ResumeStateModel>) {
    const sections = getState().sections;
    const education = sections.education;
    const isEditMode = education.ui?.isEditMode;
    const editForm = education.form;

    let educationList = (education.list as Education[]) || [];
    let editChanges = !isEditMode
      ? { ...editForm.model, id: new Date().getTime(), isVisible: true }
      : { ...editForm.model, isVisible: true };

    if (isEditMode) {
      educationList =
        educationList.filter((education) => education.id !== editChanges?.id) ||
        [];
    }

    setState(
      produce((draft) => {
        const educationDraft = draft.sections.education;
        educationDraft.list = [...educationList, { ...editChanges }];
        (educationDraft.ui as EducationUiState).isEducationFormVisible = false;
        (educationDraft.ui as EducationUiState).isEditMode = false;
      }),
    );

    this.resetEducationForm();
  }

  // TODO should use action stream to handle this type of actions (UI actions) https://www.ngxs.io/recipes/style-guide#action-operations
  @Action(OpenEducationEdit)
  openEducationEdit(
    { getState, setState }: StateContext<ResumeStateModel>,
    { educationId }: OpenEducationEdit,
  ) {
    /**
     TODO load the education by id
     then update the form with appropriate data
     *  */
    const educationToBeEdited = getState().sections.education.list?.find(
      (education) => education.id === educationId,
    );
    this.updateEducationForm(educationToBeEdited);
    // TODO should solve the getState mess
    setState({
      ...getState(),
      sections: {
        ...getState().sections,
        education: {
          ...getState().sections.education,
          ui: {
            ...getState().sections.education.ui,
            isEducationFormVisible: true,
            isEditMode: true,
          },
        },
      },
    });
  }

  @Action(HideEducationForm)
  hideEducationForm({ getState, setState }: StateContext<ResumeStateModel>) {
    setState({
      ...getState(),
      sections: {
        ...getState().sections,
        education: {
          ...getState().sections.education,
          ui: {
            ...getState().sections.education.ui,
            isEducationFormVisible: false,
          },
        },
      },
    });
  }

  @Action(ToggleEducation)
  toggleEducation(
    { getState, patchState }: StateContext<ResumeStateModel>,
    { educationId }: ToggleEducation,
  ) {
    const educationList = getState().sections.education.list;
    const educationById: Education | undefined = educationList?.find(
      (education) => education.id === educationId,
    );
    const filteredEducationList: Education[] = educationList?.filter(
      (education) => education.id !== educationId,
    ) as Education[];

    patchState({
      sections: {
        education: {
          form: getState().sections.education.form,
          list: [
            ...filteredEducationList,
            { ...educationById, isVisible: !educationById?.isVisible },
          ],
        },
        experience: getState().sections.experience,
        personalDetails: getState().sections.personalDetails,
      },
    });
  }

  private resetEducationForm() {
    this.store.dispatch(
      new ResetForm({ path: 'resumes.sections.education.form' }),
    );
  }

  private updateEducationForm(education?: Education) {
    this.store.dispatch(
      new UpdateFormValue({
        path: 'resumes.sections.education.form',
        value: education,
      }),
    );
  }
}
