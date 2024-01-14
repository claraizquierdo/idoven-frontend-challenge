import { createContext, useReducer, ReactNode } from "react";

export const ACTIONS = {
  UPDATE_AUTOADJUST_Y: 'UPDATE_AUTOADJUST_Y',
  UPDATE_USE_MEAN: 'UPDATE_USE_MEAN',
  UPDATE_ORIGINAL_DATA: 'UPDATE_ORIGINAL_DATA',
  UPDATE_IS_LOADING: 'UPDATE_IS_LOADING',
  UPDATE_ZOOM: 'UPDATE_ZOOM',
  UPDATE_RANGE: 'UPDATE_RANGE'
} as const;


export interface Context {
  state: State,
  dispatch: React.Dispatch<Action>
}

interface State {
  autoadjustY: boolean,
  originalData: Int16Array;
  isLoading: boolean;
  range: number[];
  zoom: number;
  useMean: boolean;
}

interface Action {
  type: string,
  payload?: boolean | number | number[] | Int16Array
}

const DEFAULT_STATE: State = {
  autoadjustY: false,
  originalData: new Int16Array(),
  isLoading: false,
  range: [0, 10000],
  zoom: 10000,
  useMean: false,
};

const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.UPDATE_AUTOADJUST_Y: {
      return {
        ...state,
        autoadjustY: action.payload as boolean
      };
    }
    case ACTIONS.UPDATE_USE_MEAN: {
      return {
        ...state,
        useMean: action.payload as boolean
      };
    }
    case ACTIONS.UPDATE_ORIGINAL_DATA: {
      if (action.payload) {
        return {
          ...state,
          originalData: action.payload as Int16Array
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



export const VisualizationContext = createContext<Context | null>(null);

export const VisualizationProvider = function ({ children }: { children: ReactNode }) {

  const [state, dispatch] = useReducer(stateReducer, DEFAULT_STATE);

  return <VisualizationContext.Provider value={{ state: state, dispatch: dispatch }}>
    {children}
  </VisualizationContext.Provider>

}

export default VisualizationContext;