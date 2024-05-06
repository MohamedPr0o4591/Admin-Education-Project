import { GETUNITS } from "../types/AllTypes";

const initialState = {
  units: [],
};

export const unitsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETUNITS:
      return {
        units: action.data,
      };

    default:
      return state;
  }
};
