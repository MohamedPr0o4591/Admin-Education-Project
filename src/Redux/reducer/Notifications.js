import { GETNOTI } from "../types/AllTypes";

const initialState = {
  notifications: [],
};

export const notificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETNOTI:
      return {
        notifications: action.data,
      };
    default:
      return state;
  }
};
