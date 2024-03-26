import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Resume } from '../../models/resume.model';
import { RESUME_STATE_NAME } from '../state.name';
import { LoadResumeList, PrintResume } from '../actions/resume.actions';
import { PrintService } from '../../services/print.service';

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
  printService: PrintService = inject(PrintService);

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

  @Action(PrintResume)
  printResume() {
    this.printService.printTemplate();
  }
}
