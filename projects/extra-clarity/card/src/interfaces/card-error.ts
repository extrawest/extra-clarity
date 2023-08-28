import { HttpErrorResponse } from '@angular/common/http';

export interface EcCardError {
  httpError: HttpErrorResponse;
  message?: string;
  hint?: string;
  noRetryBtn?: boolean;
  noDetails?: boolean;
}
