import { GameEntry, GameScore } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { clue, CluedLetter } from '../../../../../common/utils/clue';
import prisma from '../../../../../common/utils/prisma';

export interface GameEntryDetailedResponse {
  entry: GameEntry & { letters: CluedLetter[] };
  scores: GameScore[];
}

const VOWELS = ['a', 'e', 'i', 'o', 'u'];

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<GameEntryDetailedResponse>,
) => {
  if (req.method === 'POST' && typeof req.query.id === 'string') {
    const { row, answer }: { row: number; answer: string } = req.body;
    const { id } = req.query;

    const game = await prisma.game.findFirst({
      where: { id },
    });

    if (!game) {
      res.status(404).end();
      return;
    }

    const isCorrectAnswer = answer === game.solution;

    const gameEntry = await prisma.gameEntry.create({
      data: {
        gameId: game.id,
        row,
        answer,
        correct: isCorrectAnswer,
      },
    });

    if (isCorrectAnswer) {
      await prisma.game.update({
        where: { id },
        data: { status: 1 },
      });
    }

    const scores = [];
    if (!isCorrectAnswer) {
      scores.push(
        await prisma.gameScore.create({
          data: {
            gameId: game.id,
            gameEntryId: gameEntry.id,
            amount: -150,
            messageType: 1,
          },
        }),
      );
    }

    const vowelCount = answer
      .split('')
      .filter((letter) => VOWELS.includes(letter)).length;

    if (vowelCount > 3) {
      scores.push(
        await prisma.gameScore.create({
          data: {
            gameId: game.id,
            amount: (vowelCount - 3) * -50,
            messageType: 2,
          },
        }),
      );
    }

    res.status(200).json({
      entry: {
        ...gameEntry,
        letters: clue(gameEntry.answer, game.solution),
      },
      scores,
    });
  } else {
    res.status(404).end();
  }
};

export default handler;
