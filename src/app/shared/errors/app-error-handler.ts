import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(error) {
    // improve with toast notification
    alert('Pojavila se greška');
    console.log(error);
  }
}
