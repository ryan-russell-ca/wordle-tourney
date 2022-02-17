import { GameEntries, PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clue, CluedLetter } from '../../../../../common/utils/clue';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<(GameEntries & { letters: CluedLetter[] })[]>
) => {
  const prisma = new PrismaClient();

  if (req.method === 'POST' && typeof req.query.id === 'string') {
    const { row, answer } = req.body;
    const { id } = req.query;

    const game = await prisma.game.findFirst({
      where: { id },
      include: { entries: true },
    });

    if (!game) {
      res.status(404).end();
      return;
    }

    const gameEntry = await prisma.gameEntries.create({
      data: {
        gameId: game.id,
        row,
        answer,
        correct: answer === game.solution,
      },
    });

    if (answer === game.solution) {
      await prisma.game.update({
        where: { id },
        data: { status: 1 },
      });
    }

    const guesses = [...game.entries, gameEntry].map((guess) => ({
      ...guess,
      letters: clue(guess.answer, game.solution),
    }));

    res.status(200).json(guesses);
  } else {
    res.status(404).end();
  }
};

export default handler;
