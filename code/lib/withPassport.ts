import passport from 'passport';
import cookieSession from 'cookie-session';
import url from 'url';
import { google } from './passport';
import { LOGIN_PAGE, UserIdentity } from './withIdentity';
export { default as passport } from 'passport';

passport.use(google);

export interface PassportSession {
  passport: { user: UserIdentity };
}

export interface User {
  id: string;
  displayName: string;
  photos: {
    value: string;
    type: string;
  }[];
}

passport.serializeUser<User>((user: User, done) => {
  console.log(user);
  
  const { id, displayName, photos } = user;
  done(null, { id, displayName, photos });
});

passport.deserializeUser(async (serializedUser: User, done) => {
  if (!serializedUser) {
    return done(new Error(`User not found: ${serializedUser}`));
  }

  done(null, serializedUser);
});

// export middleware to wrap api/auth handlers
const handler =
  (fn: any) =>
  (
    req: any,
    res: any,
  ) => {
    if (!req.url) {
      res.redirect(LOGIN_PAGE);
    }

    const sessionUrl = url.parse(req.url);

    cookieSession({
      name: 'passportSession',
      signed: false,
      domain: sessionUrl.host ? sessionUrl.host : undefined,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })(req, res, () =>
      passport.initialize()(req, res, () =>
        passport.session()(req, res, () => fn(req, res)),
      ),
    );
  };

export default handler;
