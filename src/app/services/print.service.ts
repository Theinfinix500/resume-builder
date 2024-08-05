import { Injectable } from '@angular/core';
import { saveAsPdf } from '../utils/print';

@Injectable({
  providedIn: 'root',
})
export class PrintService {
  constructor() {}

  printTemplate() {
    const template = document.getElementById('resumePages');
    saveAsPdf(template as HTMLElement);
  }
}
