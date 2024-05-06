import { applyMiddleware, createStore } from "redux";
import { rootReducers } from "../reducer/Root";
import { thunk } from "redux-thunk";

export const store = createStore(rootReducers, applyMiddleware(thunk));
