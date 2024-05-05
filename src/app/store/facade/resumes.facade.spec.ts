import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { LoadResumeList } from '../actions/resume.actions';
import { ResumeState } from '../state/resume.state';
import { ResumesFacade } from './resumes.facade';

describe('ResumesFacade', () => {
  let resumeFacade: ResumesFacade;
  let store: Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([ResumeState], {
          developmentMode: true,
        }),
      ],
      providers: [ResumesFacade],
    }).compileComponents();
    resumeFacade = TestBed.inject(ResumesFacade);
    store = TestBed.inject(Store);
  });

  it('loadResumes', () => {
    spyOn(store, 'dispatch');
    resumeFacade.loadResumes();
    expect(store.dispatch).toHaveBeenCalledWith(LoadResumeList);
  });
});
