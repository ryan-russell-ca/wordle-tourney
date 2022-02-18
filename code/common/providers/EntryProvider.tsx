import { GameEntry } from '@prisma/client';
import {
  createContext,
  useReducer,
  FunctionComponent,
  useContext,
} from 'react';
import { CluedLetter } from '../utils/clue';

export interface Entry extends GameEntry {
  letters?: CluedLetter[];
}

enum EntryTypes {
  ADD_ENTRY = 'addEntry',
  SET_ENTRIES = 'setEntries',
}

type EntryAction =
  | { type: EntryTypes.ADD_ENTRY; entry: Entry }
  | { type: EntryTypes.SET_ENTRIES; entries: Entry[] };
type EntryDispatch = (action: EntryAction) => void;
type EntryState = { entries: Entry[]; entriesById: Record<string, Entry> };

const EntryContext = createContext<
  | {
      state: EntryState;
      dispatch: EntryDispatch;
    }
  | undefined
>(undefined);

const mapById = (entries: Entry[]) =>
  entries.reduce(
    (acc, entry) => ({
      ...acc,
      [entry.id]: entry,
    }),
    {},
  );

const entryReducer = (state: EntryState, action: EntryAction): EntryState => {
  switch (action.type) {
    case EntryTypes.ADD_ENTRY: {
      const entries = [...state.entries, action.entry];
      return { entries, entriesById: mapById(entries) };
    }
    case EntryTypes.SET_ENTRIES: {
      return { entries: action.entries, entriesById: mapById(action.entries) };
    }
    default: {
      throw new Error(`Unhandled action type: ${action['type']}`);
    }
  }
};

const EntryProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(entryReducer, {
    entries: [],
    entriesById: {},
  });
  const value = { state, dispatch };

  return (
    <EntryContext.Provider value={value}>{children}</EntryContext.Provider>
  );
};

export const useEntry = (): [EntryState, EntryDispatch] => {
  const context = useContext(EntryContext);

  if (context === undefined) {
    throw new Error('useEntry must be used within a EntryProvider');
  }

  return [context.state, context.dispatch];
};

export const addEntry = (dispatch: EntryDispatch, entry: Entry) => {
  dispatch({ type: EntryTypes.ADD_ENTRY, entry });
};

export const setEntries = (dispatch: EntryDispatch, entries: Entry[]) => {
  dispatch({ type: EntryTypes.SET_ENTRIES, entries });
};

export default EntryProvider;
