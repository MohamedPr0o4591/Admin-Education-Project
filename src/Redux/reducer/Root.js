import { combineReducers } from "redux";
import { booksReducer } from "./Books";
import { classReducer } from "./Classes";
import { unitsReducer } from "./Units";
import { groupsReducer } from "./Groups";
import { profileDetailsReducer } from "./ProfileDetails";
import { StudentsReducer } from "./Students";
import { examReducer } from "./Exam";
import { lessonsReducer } from "./Lessons";

export const rootReducers = combineReducers({
  BOOKS: booksReducer,
  CLASSES: classReducer,
  UNITS: unitsReducer,
  GROUPS: groupsReducer,
  PROFILEDETAILS: profileDetailsReducer,
  STUDENTS: StudentsReducer,
  GETALLEXAMS: examReducer,
  GETALLLESSONS: lessonsReducer,
});
