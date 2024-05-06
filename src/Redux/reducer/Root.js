import { combineReducers } from "redux";
import { booksReducer } from "./Books";
import { classReducer } from "./Classes";
import { unitsReducer } from "./Units";

export const rootReducers = combineReducers({
  BOOKS: booksReducer,
  CLASSES: classReducer,
  UNITS: unitsReducer,
});
