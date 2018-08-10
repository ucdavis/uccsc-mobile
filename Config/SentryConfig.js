import Sentry from 'sentry-expo';
import { SentrySeverity } from 'react-native-sentry';

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = true;

Sentry.config('https://acf949d93f0b47d6a9314b28aa2a322f@sentry.io/1260358').install();
Sentry.captureMessage('Application Loaded', SentrySeverity.Info);
