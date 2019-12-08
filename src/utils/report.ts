import * as sentry from '@sentry/browser';

let enabled = false;


export function enable(): void {
  enabled = true;
}


export function disable(): void {
  enabled = false;
}


export function report(error: string | Error, throwError = false): void {
  console.error(error);
  if (enabled) {
    if (error instanceof Error) {
      sentry.captureException(error);
    } else {
      sentry.captureMessage(error as string);
    }
  }
  if (throwError && error instanceof Error) throw error;
}
