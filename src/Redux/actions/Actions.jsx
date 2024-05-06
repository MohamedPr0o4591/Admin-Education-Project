import axios from "axios";
import { ALLBOOKS, ALLCLASSES, GETUNITS } from "../types/AllTypes";

export const getAllBooks = (_) => {
  return async (dispatch) => {
    let res = await axios.get(`${import.meta.env.VITE_API}book`);

    dispatch({
      type: ALLBOOKS,
      data: res.data.allBooks,
    });
  };
};

export const getAllClasses = (_) => {
  return async (dispatch) => {
    let res = await axios.get(`${import.meta.env.VITE_API}class`);

    dispatch({
      type: ALLCLASSES,
      data: res.data.classes,
    });
  };
};

export const getUnits = (id) => {
  return async (dispatch) => {
    let res = await axios.get(`${import.meta.env.VITE_API}unit/${id}`);
    dispatch({
      type: GETUNITS,
      data: res.data.units,
    });
  };
};
