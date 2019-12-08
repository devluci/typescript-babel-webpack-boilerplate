import * as sentry from '@sentry/browser';

import * as report from 'utils/report';
import '../css/main.css';
import '../css/normalize.css';


if (process.env.SENTRY_HOST) {
  sentry.init({dsn: process.env.SENTRY_HOST});
  report.enable();
}


document.addEventListener('DOMContentLoaded', (): void => {
  // do what you want
});
