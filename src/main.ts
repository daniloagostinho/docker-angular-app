import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import * as Sentry from "@sentry/angular";

import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';

datadogLogs.init({
  clientToken: 'c537d1cb9e5e090ccfd0d6e734b17292', // Substitua pela sua chave da API Datadog
  site: 'datadoghq.com',
  forwardErrorsToLogs: true, // Captura e envia erros do console para o Datadog
});

datadogRum.init({
  applicationId: '<YOUR_APPLICATION_ID>', // ID da aplicação no Datadog
  clientToken: 'c537d1cb9e5e090ccfd0d6e734b17292', // Substitua pela sua chave da API Datadog
  site: 'datadoghq.com',
  service: 'docker-app', // Nome da aplicação
  version: '1.0.0', // Versão da aplicação
});

Sentry.init({
  dsn: "https://b978ef81c28586666fa38f80cf7e0c08@o4508033925316608.ingest.us.sentry.io/4508033927610368",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
