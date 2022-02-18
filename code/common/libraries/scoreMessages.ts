import { FunctionComponent } from 'react';
import Alphabet from '../components/icons/Alphabet';
import QuestionMark from '../components/icons/QuestionMark';

export const entryMessage = (word: string) =>
  `${word.toUpperCase()}`;

export const Messages: Record<number, (...args: any) => string> = {
  1: entryMessage,
};

export const Icons: Record<number, FunctionComponent<{ className?: string }>> = {
  1: QuestionMark,
  2: Alphabet,
};

export default Messages;
