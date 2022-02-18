import { GameScore } from '@prisma/client';
import {
  createContext,
  useReducer,
  FunctionComponent,
  useContext,
} from 'react';

enum ScoreTypes {
  ADD_SCORES = 'addScores',
  SET_SCORES = 'setScore',
}
type ScoreAction =
  | { type: ScoreTypes.ADD_SCORES; scores: GameScore[] }
  | { type: ScoreTypes.SET_SCORES; scores: GameScore[] };
type ScoreDispatch = (action: ScoreAction) => void;
type ScoreState = { scores: GameScore[]; totalScore: number };

const ScoreContext = createContext<
  | {
      state: ScoreState;
      dispatch: ScoreDispatch;
    }
  | undefined
>(undefined);

const computeScore = (scores: GameScore[]) =>
  scores.reduce((total, { amount }) => total + amount, 1000);

const scoreReducer = (state: ScoreState, action: ScoreAction): ScoreState => {
  switch (action.type) {
    case ScoreTypes.ADD_SCORES: {
      const scores = [...state.scores, ...action.scores];
      return {
        scores,
        totalScore: computeScore(scores),
      };
    }
    case ScoreTypes.SET_SCORES: {
      return {
        scores: action.scores,
        totalScore: computeScore(action.scores),
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action['type']}`);
    }
  }
};

const ScoreProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(scoreReducer, {
    scores: [],
    totalScore: 1000,
  });
  const value = { state, dispatch };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
};

export const useScore = (): [ScoreState, ScoreDispatch] => {
  const context = useContext(ScoreContext);

  if (context === undefined) {
    throw new Error('useScore must be used within a ScoreProvider');
  }

  return [context.state, context.dispatch];
};

export const addScores = (dispatch: ScoreDispatch, scores: GameScore[]) => {
  dispatch({ type: ScoreTypes.ADD_SCORES, scores });
};

export const setScores = (dispatch: ScoreDispatch, scores: GameScore[]) => {
  dispatch({ type: ScoreTypes.SET_SCORES, scores });
};

export default ScoreProvider;
