import { combineReducers } from "redux";
import { booksReducer } from "./Books";
import { classReducer } from "./Classes";
import { unitsReducer } from "./Units";
import { groupsReducer } from "./Groups";
import { profileDetailsReducer } from "./ProfileDetails";
import { StudentsReducer, getPendingResult } from "./Students";
import { examReducer, examResultReducer } from "./Exam";
import { lessonsReducer } from "./Lessons";
import { statisticsReducer } from "./Statistics";
import { notificationsReducer } from "./Notifications";

export const rootReducers = combineReducers({
  BOOKS: booksReducer,
  CLASSES: classReducer,
  UNITS: unitsReducer,
  GROUPS: groupsReducer,
  PROFILEDETAILS: profileDetailsReducer,
  STUDENTS: StudentsReducer,
  GETALLEXAMS: examReducer,
  GETEXAMRESULT: examResultReducer,
  GETALLLESSONS: lessonsReducer,
  STATISTICS: statisticsReducer,
  NOTIFICATIONS: notificationsReducer,
  GETPENDINGSTUDENTRESULT: getPendingResult,
});
