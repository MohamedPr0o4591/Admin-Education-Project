import { ALLBOOKS } from "../types/AllTypes";

const initialValue = {
  books: [],
};
export const booksReducer = (state = initialValue, action) => {
  switch (action.type) {
    case ALLBOOKS:
      return {
        books: action.data,
      };
    default:
      return state;
  }
};
