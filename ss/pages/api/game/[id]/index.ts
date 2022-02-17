import { Game, GameEntries, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clue, CluedLetter } from '../../../../common/utils/clue';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<
    Game & { entries: (GameEntries & { letters: CluedLetter[] })[] }
  >
) => {
  const prisma = new PrismaClient();
  if (req.method === 'GET' && typeof req.query.id === 'string') {
    const game = await prisma.game.findFirst({
      where: { id: req.query.id },
      include: { entries: true },
    });

    if (game) {
      res.status(200).json({
        ...game,
        entries: game.entries.map((guess) => ({
          ...guess,
          letters: clue(guess.answer, game.solution),
        })),
      });
      return;
    }
  }
  res.status(404).end();
};

export default handler;
