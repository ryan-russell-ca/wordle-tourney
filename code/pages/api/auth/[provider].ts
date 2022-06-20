import { NextApiResponse, NextApiRequest } from 'next'
import withPassport, { passport } from '../../../lib/withPassport'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const { provider } = req.query
  if (!provider) {
    return { statusCode: 404 }
  }

  passport.authenticate(provider)(req, res, (...args: unknown[]) => {
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.log('=======================================');
    console.info('passport authenticated', args)
  })
}

export default withPassport(handler)