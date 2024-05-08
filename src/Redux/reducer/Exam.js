import { GETALLEXAMS } from "../types/AllTypes";

const initialState = {
  exams: [],
};
export const examReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLEXAMS:
      return {
        exams: action.data,
      };
    default:
      return state;
  }
};
