import { GameEntry } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../common/utils/prisma';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GameEntry>
) => {
  if (req.method === 'GET' && typeof req.query.entryId === 'string') {
    const gameEntry = await prisma.gameEntry.findFirst({
      where: { id: req.query.entryId },
    });

    if (gameEntry) {
      res.status(200).json(gameEntry);
      return;
    }
  }
  res.status(404).end();
};

export default handler;
