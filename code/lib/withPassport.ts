import passport from 'passport';
import cookieSession from 'cookie-session';
import url from 'url';
import { google } from './passport';
import { LOGIN_PAGE, UserIdentity } from './withIdentity';
import { NextApiRequest, NextApiResponse } from 'next';
export { default as passport } from 'passport';

passport.use(google);

export interface PassportSession {
  passport: { user: UserIdentity };
}

export interface GoogleUser {
  id: number;
  displayName: string;
  email: string;
  photos: {
    value: string;
    type: string;
  }[];
}

passport.serializeUser<User>((user: User, done) => {
  const { id, displayName, photos } = user;
  done(null, { id, displayName, photos });
});

passport.deserializeUser(async (serializedUser: User, done) => {
  if (!serializedUser) {
    return done(new Error(`User not found: ${serializedUser}`));
  }

  done(null, serializedUser);
});

const handler =
  (fn: (req: NextApiRequest, res: NextApiResponse) => void) =>
  (req: NextApiRequest, res: NextApiResponse) => {
    if (!req.url) {
      res.redirect(LOGIN_PAGE);
    }

    const sessionUrl = url.parse(req.url as string);

    cookieSession({
      name: 'passportSession',
      signed: false,
      domain: sessionUrl.host ? sessionUrl.host : undefined,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    })(req as any, res as any, () => {
      return passport.initialize()(req as any, res as any, () => {
        const session = passport.session()(req, res, () => fn(req, res));
        return session;
      });
    });
  };

export default handler;
