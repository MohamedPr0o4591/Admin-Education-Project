import { EXAMRESULT, GETALLEXAMS } from "../types/AllTypes";

const initialState = {
  exams: [],
  examResult: [],
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

export const examResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case EXAMRESULT:
      return {
        examResult: action.resultData,
      };
    default:
      return state;
  }
};
