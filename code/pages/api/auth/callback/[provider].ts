import { NextApiResponse, NextApiRequest } from 'next';
import withPassport, {
  passport,
} from '../../../../lib/withPassport';

export interface GoogleUserResponse {
  provider: string;
  sub: string;
  id: string;
  displayName: string;
  name: { givenName: string; familyName: string };
  given_name: string;
  family_name: string;
  email_verified: true;
  verified: true;
  language: string;
  locale?: string;
  email: string;
  emails: [{ value: string; type: string }];
  photos: [
    {
      value: string;
      type: string;
    },
  ];
  picture: string;
  _raw: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
    hd: string;
    domain: string;
  };
}
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query;
  if (!provider) {
    return { statusCode: 404 };
  }

  const requestFn = passport.authenticate(
    provider,
    {
      failureRedirect: '/auth',
      successRedirect: '/',
    },
    (_: unknown, user: GoogleUserResponse) => {
      console.log('authenticate', user);
    },
  );

  requestFn(req, res, () => true);
};

export default withPassport(handler);
