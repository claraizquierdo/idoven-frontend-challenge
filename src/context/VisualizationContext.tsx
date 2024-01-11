import { createContext, useReducer, ReactNode } from "react";

export const ACTIONS = {
  UPDATE_DATA: 'UPDATE_DATA',
  UPDATE_IS_LOADING: 'UPDATE_IS_LOADING'
} as const;


export interface Context {
  state: State,
  dispatch: React.Dispatch<Action>
}

export interface Row {
  time: number;
  signal: number;
}

interface State {
  data: Row[];
  isLoading: boolean;
}

interface Action {
  type: string,
  payload?: Row[] | boolean
}

const DEFAULT_STATE: State = {
  data: [],
  isLoading: false,
};

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.UPDATE_DATA: {
      if (action.payload) {
        return {
          ...state,
          data: action.payload as Row[]
        };
      }
      return state;
    }
    case ACTIONS.UPDATE_IS_LOADING: {
      return {
        ...state,
        isLoading: action.payload as boolean
      };
    }
    default:
      return state;
  }
}



const VisualizationContext = createContext<Context | null>(null);

export const VisualizationProvider = function ({ children }: { children: ReactNode }) {

  const [state, dispatch] = useReducer(stateReducer, DEFAULT_STATE);

  return <VisualizationContext.Provider value={{ state: state, dispatch: dispatch }}>
    {children}
  </VisualizationContext.Provider>

}

export default VisualizationContext;