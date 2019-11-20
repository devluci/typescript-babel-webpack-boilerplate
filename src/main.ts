import '../css/normalize.css';
import '../css/main.css';

import * as report from 'utils/report';
import * as sentry from '@sentry/browser';


if (process.env.SENTRY_HOST) {
  sentry.init({ dsn: process.env.SENTRY_HOST });
  report.enable();
}


document.addEventListener('DOMContentLoaded', (): void => {
  // do what you want
});
