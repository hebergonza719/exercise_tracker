import { FETCH_DATA } from '../actions';

const initialState = {
  logs: []
};

export const logsReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_DATA: {
      return {
        ...state,
        logs: action.payload
      };
    }
    default:
      return state;
  };
};