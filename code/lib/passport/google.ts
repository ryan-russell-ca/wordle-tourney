import { Strategy } from 'passport-google-oauth2';
import appConfig from '../appConfig';

const strategy = new Strategy(
  appConfig.google,
  (_accessToken, _refreshToken, googleProfile, cb) => {
    cb(null, googleProfile);
  },
);

export default strategy;
