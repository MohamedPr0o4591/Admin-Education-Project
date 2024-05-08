import { GETALLLESSONS } from "../types/AllTypes";

const initialState = {
  lessons: [],
};

export const lessonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLLESSONS:
      return {
        lessons: action.data,
      };
    default:
      return state;
  }
};
