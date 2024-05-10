import { ALLSTATISTICS } from "../types/AllTypes";

let initialState = {
  statistics: [],
};

export const statisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLSTATISTICS:
      return {
        statistics: action.data,
      };
    default:
      return state;
  }
};
