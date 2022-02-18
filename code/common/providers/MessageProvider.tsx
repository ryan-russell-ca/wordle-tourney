import {
  createContext,
  useReducer,
  FunctionComponent,
  useContext,
} from 'react';

enum MessageTypes {
  ADD_MESSAGES = 'addMessages',
  SET_MESSAGES = 'setMessage',
}
type MessageAction =
  | { type: MessageTypes.ADD_MESSAGES; messages: string[] }
  | { type: MessageTypes.SET_MESSAGES; messages: string[] };
type MessageDispatch = (action: MessageAction) => void;
type MessageState = { messages: string[] };

const MessageContext = createContext<
  | {
      state: MessageState;
      dispatch: MessageDispatch;
    }
  | undefined
>(undefined);

const messageReducer = (
  state: MessageState,
  action: MessageAction,
): MessageState => {
  switch (action.type) {
    case MessageTypes.ADD_MESSAGES: {
      const messages = [...state.messages, ...action.messages];
      return {
        messages,
      };
    }
    case MessageTypes.SET_MESSAGES: {
      return {
        messages: action.messages,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action['type']}`);
    }
  }
};

const MessageProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, {
    messages: ['Enter your first guess!'],
  });
  const value = { state, dispatch };

  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
};

export const useMessage = (): [MessageState, MessageDispatch] => {
  const context = useContext(MessageContext);

  if (context === undefined) {
    throw new Error('useMessage must be used within a MessageProvider');
  }

  return [context.state, context.dispatch];
};

export const addMessages = (dispatch: MessageDispatch, messages: string[]) => {
  dispatch({ type: MessageTypes.ADD_MESSAGES, messages });
};

export const setMessages = (dispatch: MessageDispatch, messages: string[]) => {
  dispatch({ type: MessageTypes.SET_MESSAGES, messages });
};

export default MessageProvider;
