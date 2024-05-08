import { GETALLGROUPS } from "../types/AllTypes";

const initialState = {
  groups: [],
};
export const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLGROUPS:
      return {
        groups: action.data,
      };
    default:
      return state;
  }
};
