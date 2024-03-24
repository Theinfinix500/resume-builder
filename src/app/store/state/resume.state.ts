import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Resume } from '../../models/resume.model';
import { RESUME_STATE_NAME } from '../state.name';
import { LoadResumeList } from '../actions/resume.actions';

export interface ResumeStateModel {
  resumes: Resume[];
}

@State<ResumeStateModel>({
  name: RESUME_STATE_NAME,
  defaults: {
    resumes: [],
  },
})
@Injectable()
export class ResumeState {
  @Selector()
  static resumes(state: ResumeStateModel) {
    return state.resumes;
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
}
