import { createContext, useReducer, ReactNode } from "react";

export const ACTIONS = {
  UPDATE_AUTOADJUST_Y: 'UPDATE_AUTOADJUST_Y',
  UPDATE_DATA: 'UPDATE_DATA',
  UPDATE_IS_LOADING: 'UPDATE_IS_LOADING',
  UPDATE_ZOOM: 'UPDATE_ZOOM',
  UPDATE_RANGE: 'UPDATE_RANGE'
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
  autoadjustY: boolean,
  data: Row[];
  isLoading: boolean;
  range: number[];
  zoom: number;
}

interface Action {
  type: string,
  payload?: Row[] | boolean | number | number[]
}

const DEFAULT_STATE: State = {
  autoadjustY: false,
  data: [],
  isLoading: false,
  range: [0, 10000],
  zoom: 1000
};

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.UPDATE_AUTOADJUST_Y: {
      return {
        ...state,
        autoadjustY: action.payload as boolean
      };
    }
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
    case ACTIONS.UPDATE_RANGE: {
      return {
        ...state,
        range: action.payload as number[]
      };
    }
    case ACTIONS.UPDATE_ZOOM: {
      return {
        ...state,
        zoom: action.payload as number
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