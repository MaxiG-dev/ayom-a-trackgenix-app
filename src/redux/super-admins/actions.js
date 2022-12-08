import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  GETBYID_SUPERADMINS_PENDING,
  GETBYID_SUPERADMINS_SUCCESS,
  GETBYID_SUPERADMINS_ERROR,
  POST_SUPERADMINS_ERROR,
  POST_SUPERADMINS_PENDING,
  POST_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_PENDING,
  PUT_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR
} from './constants';

export const getSuperAdminsPending = () => {
  return {
    type: GET_SUPERADMINS_PENDING
  };
};

export const getSuperAdminsSuccess = (data) => {
  return {
    type: GET_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const getSuperAdminsError = (error) => {
  return {
    type: GET_SUPERADMINS_ERROR,
    payload: error
  };
};
export const getByIdSuperAdminsPending = () => {
  return {
    type: GETBYID_SUPERADMINS_PENDING
  };
};

export const getByIdSuperAdminsSucces = (data) => {
  return {
    type: GETBYID_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const getByIdSuperAdminsError = (error) => {
  return {
    type: GETBYID_SUPERADMINS_ERROR,
    payload: error
  };
};

export const postSuperAdminPending = () => {
  return {
    type: POST_SUPERADMINS_PENDING
  };
};

export const postSuperAdminSuccess = (data) => {
  return {
    type: POST_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const postSuperAdminError = (error) => {
  return {
    type: POST_SUPERADMINS_ERROR,
    payload: error
  };
};

export const putSuperAdminPending = () => {
  return {
    type: PUT_SUPERADMINS_PENDING
  };
};

export const putSuperAdminSuccess = (data) => {
  return {
    type: PUT_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const putSuperAdminError = (error) => {
  return {
    type: PUT_SUPERADMINS_ERROR,
    payload: error
  };
};

export const deleteSuperAdminPending = () => {
  return {
    type: DELETE_SUPERADMINS_PENDING
  };
};

export const deleteSuperAdminSuccess = (data) => {
  return {
    type: DELETE_SUPERADMINS_SUCCESS,
    payload: data
  };
};

export const deleteSuperAdminError = (error) => {
  return {
    type: DELETE_SUPERADMINS_ERROR,
    payload: error
  };
};
