import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GETBYID_ADMINS_PENDING,
  GETBYID_ADMINS_SUCCESS,
  GETBYID_ADMINS_ERROR,
  POST_ADMINS_PENDING,
  POST_ADMINS_SUCCESS,
  POST_ADMINS_ERROR,
  PUT_ADMINS_PENDING,
  PUT_ADMINS_SUCCESS,
  PUT_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_SUCCESS,
  DELETE_ADMINS_ERROR
} from './constants';

export const getAdminsPending = () => {
  return {
    type: GET_ADMINS_PENDING
  };
};

export const getAdminsSuccess = (data) => {
  return {
    type: GET_ADMINS_SUCCESS,
    payload: data
  };
};

export const getAdminsError = (error) => {
  return {
    type: GET_ADMINS_ERROR,
    payload: error
  };
};
export const getByIdAdminsPending = () => {
  return {
    type: GETBYID_ADMINS_PENDING
  };
};

export const getByIdAdminsSuccess = (data) => {
  return {
    type: GETBYID_ADMINS_SUCCESS,
    payload: data
  };
};

export const getByIdAdminsError = (error) => {
  return {
    type: GETBYID_ADMINS_ERROR,
    payload: error
  };
};

export const postAdminsPending = () => {
  return {
    type: POST_ADMINS_PENDING
  };
};

export const postAdminsSuccess = (data) => {
  return {
    type: POST_ADMINS_SUCCESS,
    payload: data
  };
};

export const postAdminsError = (error) => {
  return {
    type: POST_ADMINS_ERROR,
    payload: error
  };
};

export const putAdminsPending = () => {
  return {
    type: PUT_ADMINS_PENDING
  };
};

export const putAdminsSuccess = (data) => {
  return {
    type: PUT_ADMINS_SUCCESS,
    payload: data
  };
};

export const putAdminsError = (error) => {
  return {
    type: PUT_ADMINS_ERROR,
    payload: error
  };
};

export const deleteAdminsPending = () => {
  return {
    type: DELETE_ADMINS_PENDING
  };
};

export const deleteAdminsSuccess = (data) => {
  return {
    type: DELETE_ADMINS_SUCCESS,
    payload: data
  };
};

export const deleteAdminsError = (error) => {
  return {
    type: DELETE_ADMINS_ERROR,
    payload: error
  };
};
