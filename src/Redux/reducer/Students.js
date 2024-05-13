import { GETALLSTUDENTS, PENDINGRESULT } from "../types/AllTypes";

let initialState = {
  studentsData: [],
  pendingResult: [],
};

export const StudentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLSTUDENTS:
      return {
        studentsData: action.data,
      };
    default:
      return state;
  }
};

export const getPendingResult = (state = initialState, action) => {
  switch (action.type) {
    case PENDINGRESULT:
      return {
        pendingResult: action.data,
      };
    default:
      return state;
  }
};
