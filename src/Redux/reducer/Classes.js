import { ALLCLASSES } from "../types/AllTypes";

const initialState = {
  classes: [],
};

export const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALLCLASSES:
      return {
        classes: action.data,
      };
    default:
      return state;
  }
};
