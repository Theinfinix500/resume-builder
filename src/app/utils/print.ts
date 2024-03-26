import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const saveAsPdf = (pageRef: HTMLElement, quality = 100, type = 'a4') => {
  // if(saveAsPdfTimer){
  //     return;
  // }

  return new Promise<void>((resolve) => {
    //   saveAsPdfTimer = setTimeout(() => {
    setTimeout(() => {
      html2canvas(pageRef, {
        scale: 5,
        useCORS: true,
        allowTaint: true,
      }).then((canvas) => {
        const image = canvas.toDataURL('image/jpeg', quality / 100);
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format:
            type === 'unconstrained' ? [canvas.width, canvas.height] : 'a4',
        });

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();

        const widthRatio = pageWidth / canvas.width;
        const heightRatio = pageHeight / canvas.height;
        const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

        const canvasWidth = canvas.width * ratio;
        const canvasHeight = canvas.height * ratio;

        let marginX = 0;
        let marginY = 0;

        if (type !== 'unconstrained') {
          marginX = (pageWidth - canvasWidth) / 2;
          marginY = (pageHeight - canvasHeight) / 2;
        }

        doc.addImage(
          image,
          'JPEG',
          marginX,
          marginY,
          canvasWidth,
          canvasHeight,
          undefined,
          'SLOW'
        );
        doc.save(`RxResume_${Date.now()}.pdf`);
        // saveAsPdfTimer = null;
        resolve();
      });
    }, 250);
  });
};
