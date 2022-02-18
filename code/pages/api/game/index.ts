import { Game } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import targets from '../../../common/libraries/targets';
import prisma from '../../../common/utils/prisma';
import { pick } from './../../../common/utils/functions';

const randomTarget = (): string => {
  let candidate: string;
  do {
    candidate = pick(targets);
  } while (/\*/.test(candidate));
  return candidate;
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Game>) => {
  if (req.method === 'POST') {
    const game = await prisma.game.create({
      data: {
        score: -1,
        solution: randomTarget(),
      },
    });
    res.status(200).json(game);
  } else {
    res.status(404).end();
  }
};

export default handler;
