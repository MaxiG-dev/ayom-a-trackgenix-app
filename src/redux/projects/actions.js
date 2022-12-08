import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GETBYID_PROJECTS_PENDING,
  GETBYID_PROJECTS_SUCCESS,
  GETBYID_PROJECTS_ERROR,
  POST_PROJECTS_ERROR,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_SUCCESS,
  PUT_PROJECTS_ERROR,
  PUT_PROJECTS_PENDING,
  PUT_PROJECTS_SUCCESS,
  DELETE_PROJECTS_ERROR,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS
} from './constants';

export const getProjectsPending = () => {
  return {
    type: GET_PROJECTS_PENDING
  };
};

export const getProjectsSuccess = (data) => {
  return {
    type: GET_PROJECTS_SUCCESS,
    payload: data
  };
};

export const getProjectsError = (error) => {
  return {
    type: GET_PROJECTS_ERROR,
    payload: error
  };
};

export const getByIdProjectsPending = () => {
  return {
    type: GETBYID_PROJECTS_PENDING
  };
};

export const getByIdProjectsSuccess = (data) => {
  return {
    type: GETBYID_PROJECTS_SUCCESS,
    payload: data
  };
};

export const getByIdProjectsError = (error) => {
  return {
    type: GETBYID_PROJECTS_ERROR,
    payload: error
  };
};

export const postProjectsPending = () => {
  return {
    type: POST_PROJECTS_PENDING
  };
};

export const postProjectsSuccess = (data) => {
  return {
    type: POST_PROJECTS_SUCCESS,
    payload: data
  };
};

export const postProjectsError = (error) => {
  return {
    type: POST_PROJECTS_ERROR,
    payload: error
  };
};

export const putProjectsPending = () => {
  return {
    type: PUT_PROJECTS_PENDING
  };
};

export const putProjectsSuccess = (data) => {
  return {
    type: PUT_PROJECTS_SUCCESS,
    payload: data
  };
};

export const putProjectsError = (error) => {
  return {
    type: PUT_PROJECTS_ERROR,
    payload: error
  };
};

export const deleteProjectsPending = () => {
  return {
    type: DELETE_PROJECTS_PENDING
  };
};

export const deleteProjectsSuccess = (data) => {
  return {
    type: DELETE_PROJECTS_SUCCESS,
    payload: data
  };
};

export const deleteProjectsError = () => {
  return {
    type: DELETE_PROJECTS_ERROR
  };
};
