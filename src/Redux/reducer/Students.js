import { GETALLSTUDENTS } from "../types/AllTypes";

let initialState = {
  studentsData: [],
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
