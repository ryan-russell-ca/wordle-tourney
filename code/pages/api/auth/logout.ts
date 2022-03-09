import { NextApiResponse, NextApiRequest } from 'next';
import withPassport from '../../../lib/withPassport';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  req.logout();
  res.redirect('/');
};

export default withPassport(handler);
