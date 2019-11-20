import * as sentry from '@sentry/browser';

let enabled = false;


export function enable(): void {
  enabled = true;
}


export function disable(): void {
  enabled = false;
}


export function report(error: string | Error): void {
  // eslint-disable-next-line no-console
  console.error(error);
  if (enabled) {
    if (report instanceof Error) {
      sentry.captureException(error);
    } else {
      sentry.captureMessage(error as string);
    }
  }
}
