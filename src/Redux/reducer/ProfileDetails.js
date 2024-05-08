import { GETALLPROFILEDETAILS } from "../types/AllTypes";

let initialState = {
  profile: [],
};

export const profileDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLPROFILEDETAILS:
      return {
        profile: action.data,
      };
    default:
      return state;
  }
};
