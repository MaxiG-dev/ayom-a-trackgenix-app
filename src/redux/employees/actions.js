import {
  GET_EMPLOYEES_PENDING,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_ERROR,
  GETBYID_EMPLOYEES_PENDING,
  GETBYID_EMPLOYEES_SUCCESS,
  GETBYID_EMPLOYEES_ERROR,
  POST_EMPLOYEES_PENDING,
  POST_EMPLOYEES_SUCCESS,
  POST_EMPLOYEES_ERROR,
  PUT_EMPLOYEES_PENDING,
  PUT_EMPLOYEES_SUCCESS,
  PUT_EMPLOYEES_ERROR,
  DELETE_EMPLOYEES_PENDING,
  DELETE_EMPLOYEES_SUCCESS,
  DELETE_EMPLOYEES_ERROR
} from './constants';

export const getEmployeesPending = () => {
  return {
    type: GET_EMPLOYEES_PENDING
  };
};

export const getEmployeesSuccess = (data) => {
  return {
    type: GET_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const getEmployeesError = (error) => {
  return {
    type: GET_EMPLOYEES_ERROR,
    payload: error
  };
};

export const getByIdEmployeesPending = () => {
  return {
    type: GETBYID_EMPLOYEES_PENDING
  };
};

export const getByIdEmployeesSuccess = (data) => {
  return {
    type: GETBYID_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const getByIdEmployeesError = (error) => {
  return {
    type: GETBYID_EMPLOYEES_ERROR,
    payload: error
  };
};

export const postEmployeesPending = () => {
  return {
    type: POST_EMPLOYEES_PENDING
  };
};

export const postEmployeesSuccess = (data) => {
  return {
    type: POST_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const postEmployeesError = (error) => {
  return {
    type: POST_EMPLOYEES_ERROR,
    payload: error
  };
};
export const putEmployeesPending = () => {
  return {
    type: PUT_EMPLOYEES_PENDING
  };
};

export const putEmployeesSuccess = (data) => {
  return {
    type: PUT_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const putEmployeesError = (error) => {
  return {
    type: PUT_EMPLOYEES_ERROR,
    payload: error
  };
};

export const deleteEmployeesPending = () => {
  return {
    type: DELETE_EMPLOYEES_PENDING
  };
};

export const deleteEmployeesSuccess = (data) => {
  return {
    type: DELETE_EMPLOYEES_SUCCESS,
    payload: data
  };
};

export const deleteEmployeesError = (error) => {
  return {
    type: DELETE_EMPLOYEES_ERROR,
    payload: error
  };
};
