import { Education } from '../state/resume.state';

export class LoadResumeList {
  static readonly type = '[RESUME] LoadResumeList';
}

export class PrintResume {
  static readonly type = '[RESUME] PrintResume';
}

export class OpenEducationNewEntry {
  static readonly type = '[RESUME UI] AddNewEducation';
}
export class OpenEducationEdit {
  static readonly type = '[RESUME UI] EditEducation';

  constructor(public educationId?: number) {}
}

export class SaveEducation {
  static readonly type = '[RESUME UI] SaveEducation';
}

export class EditEducation {
  static readonly type = '[RESUME UI] EditEducation';
}

export class HideEducationForm {
  static readonly type = '[RESUME UI] HideEducationForm';
}
