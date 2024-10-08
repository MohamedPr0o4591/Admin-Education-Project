import axios from "axios";
import {
  ALLBOOKS,
  ALLCLASSES,
  ALLSTATISTICS,
  EXAMRESULT,
  GETALLEXAMS,
  GETALLGROUPS,
  GETALLLESSONS,
  GETALLPROFILEDETAILS,
  GETALLSTUDENTS,
  GETNOTI,
  GETUNITS,
  PENDINGRESULT,
} from "../types/AllTypes";

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

export const getGroups = (id) => {
  return async (dispatch) => {
    let res = await axios.get(`${import.meta.env.VITE_API}group/class/${id}`);
    dispatch({
      type: GETALLGROUPS,
      data: res.data.groups,
    });
  };
};

export const getAllProfileDetails = (token) => {
  return async (dispatch) => {
    let res = await axios.get(`${import.meta.env.VITE_API}teacher`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({
      type: GETALLPROFILEDETAILS,
      data: res.data.teacher,
    });
  };
};

export const getAllStudents = (_) => {
  return async (dispatch) => {
    let res = await axios.get(`${import.meta.env.VITE_API}student`);
    dispatch({
      type: GETALLSTUDENTS,
      data: res.data.allStudents,
    });
  };
};

export const getAllExams = (_) => {
  return async (dispatch) => {
    let res = await axios.get(`${import.meta.env.VITE_API}exam`);

    dispatch({
      type: GETALLEXAMS,
      data: res.data.result,
    });
  };
};

export const getAllLessons = (_) => {
  return async (dispatch) => {
    let res = await axios.get(`${import.meta.env.VITE_API}lesson`);
    dispatch({
      type: GETALLLESSONS,
      data: res.data.Lessons,
    });
  };
};

export const getAllStatistics = (_) => {
  return async (dispatch) => {
    let res = await axios.get(`${import.meta.env.VITE_API}statistics`);

    dispatch({
      type: ALLSTATISTICS,
      data: res.data.classes,
    });
  };
};

export const getExamResult = (id) => {
  return async (dispatch) => {
    let res = await axios.get(
      `${import.meta.env.VITE_API}teacher/${id}/results`
    );

    dispatch({
      type: EXAMRESULT,
      resultData: res.data.results,
    });
  };
};

export const getAllNoti = (teacherId) => {
  return async (dispatch) => {
    let res = await axios.get(
      `${import.meta.env.VITE_API}notifications/${teacherId}/teacher`
    );

    dispatch({
      type: GETNOTI,
      data: res.data.notifications,
    });
  };
};

export const getAllStudentResult = (_) => {
  return async (dispatch) => {
    let res = await axios.get(
      `${import.meta.env.VITE_API}teacher/getPendingHomeWork`
    );

    dispatch({
      type: PENDINGRESULT,
      data: res.data.results,
    });
  };
};
