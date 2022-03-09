import { StrategyOptions } from 'passport-google-oauth2';

export interface AppConfig {
  isDevelopment: boolean;
  hostingURL: string;
  google: StrategyOptions;
}

const getOAuthUrls: (
  hostName: string,
  app: string,
) => { callbackURL: string } = (hostName: string, app: string) => ({
  // Alternatively, use `[app].ts` filenames for paramaterized urls
  callbackURL: `${hostName}/api/auth/callback/${app}`,
});

const isDevelopment = process.env.NODE_ENV !== 'production';
const hostingURL = process.env.HOSTING_URL || 'http://localhost:3000';

const appConfig: AppConfig = {
  isDevelopment,
  hostingURL,
  google: {
    scope: ['email', 'profile'],
    clientID: '',
    clientSecret: '',
    ...getOAuthUrls(hostingURL, 'google'),
    callbackURL: 'http://localhost:3000/api/auth/callback/google',
  },
};

export default appConfig;
