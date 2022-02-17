import { GameEntries, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GameEntries>
) => {
  const prisma = new PrismaClient();
  if (req.method === 'GET' && typeof req.query.entryId === 'string') {
    const gameEntries = await prisma.gameEntries.findFirst({
      where: { id: req.query.entryId },
    });

    if (gameEntries) {
      res.status(200).json(gameEntries);
      return;
    }
  }
  res.status(404).end();
};

export default handler;
