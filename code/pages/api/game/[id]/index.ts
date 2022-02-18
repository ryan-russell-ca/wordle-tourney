import { Game, GameEntry, GameScore } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clue, CluedLetter } from '../../../../common/utils/clue';
import prisma from '../../../../common/utils/prisma';

export interface GameDetailedResponse extends Game {
  entries: (GameEntry & { letters: CluedLetter[] })[];
  scores: GameScore[];
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GameDetailedResponse>,
) => {
  if (req.method === 'GET' && typeof req.query.id === 'string') {
    const game = await prisma.game.findFirst({
      where: { id: req.query.id },
      include: { entries: true, scores: true },
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
