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
    clientID:
      '504642468809-ifi5l3i8ccmnq61jk6k1gj6go9vahp39.apps.googleusercontent.com',
    clientSecret: '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',
    ...getOAuthUrls(hostingURL, 'google'),
    callbackURL: 'http://localhost:3000/api/auth/callback/google',
  },
};

export default appConfig;
