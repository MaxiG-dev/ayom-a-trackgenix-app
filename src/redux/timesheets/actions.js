import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  GETBYID_TIMESHEETS_PENDING,
  GETBYID_TIMESHEETS_SUCCESS,
  GETBYID_TIMESHEETS_ERROR,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_SUCCESS,
  POST_TIMESHEETS_ERROR,
  PUT_TIMESHEETS_PENDING,
  PUT_TIMESHEETS_SUCCESS,
  PUT_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEETS_ERROR
} from './constants';

export const getTimesheetsPending = () => {
  return {
    type: GET_TIMESHEETS_PENDING
  };
};

export const getTimesheetsSuccess = (data) => {
  return {
    type: GET_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const getTimesheetsError = (error) => {
  return {
    type: GET_TIMESHEETS_ERROR,
    payload: error
  };
};

export const getByIdTimesheetsPending = () => {
  return {
    type: GETBYID_TIMESHEETS_PENDING
  };
};

export const getByIdTimesheetsSuccess = (data) => {
  return {
    type: GETBYID_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const getByIdTimesheetsError = (error) => {
  return {
    type: GETBYID_TIMESHEETS_ERROR,
    payload: error
  };
};

export const deleteTimesheetsPending = () => {
  return {
    type: DELETE_TIMESHEETS_PENDING
  };
};

export const deleteTimesheetsSuccess = (data) => {
  return {
    type: DELETE_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const deleteTimesheetsError = (error) => {
  return {
    type: DELETE_TIMESHEETS_ERROR,
    payload: error
  };
};

export const postTimesheetsPending = () => {
  return {
    type: POST_TIMESHEETS_PENDING
  };
};

export const postTimesheetsSuccess = (data) => {
  return {
    type: POST_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const postTimesheetsError = (error) => {
  return {
    type: POST_TIMESHEETS_ERROR,
    payload: error
  };
};
export const putTimesheetsPending = () => {
  return {
    type: PUT_TIMESHEETS_PENDING
  };
};

export const putTimesheetsSuccess = (data) => {
  return {
    type: PUT_TIMESHEETS_SUCCESS,
    payload: data
  };
};

export const putTimesheetsError = (error) => {
  return {
    type: PUT_TIMESHEETS_ERROR,
    payload: error
  };
};
