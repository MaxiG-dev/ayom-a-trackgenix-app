import {
  getSuperAdminsPending,
  getSuperAdminsSuccess,
  getSuperAdminsError,
  getByIdSuperAdminsPending,
  getByIdSuperAdminsSucces,
  getByIdSuperAdminsError,
  postSuperAdminsPending,
  postSuperAdminsSuccess,
  postSuperAdminsError,
  putSuperAdminsPending,
  putSuperAdminsSuccess,
  putSuperAdminsError,
  deleteSuperAdminsPending,
  deleteSuperAdminsSuccess,
  deleteSuperAdminsError
} from './actions';

export const getSuperAdmins = () => {
  return async (dispatch) => {
    dispatch(getSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin`);
      const data = await response.json();
      if (response.status !== 200) {
        dispatch(getSuperAdminsError(data.toString()));
      } else {
        dispatch(getSuperAdminsSuccess(data.data));
      }
    } catch (error) {
      dispatch(getSuperAdminsError(error.toString()));
    }
  };
};

export const getByIdSuperAdmins = (id) => {
  return async (dispatch) => {
    dispatch(getByIdSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`);
      const data = await response.json();
      if (response.status !== 200) {
        dispatch(getByIdSuperAdminsError(data.msg.toString()));
      } else {
        dispatch(getByIdSuperAdminsSucces(data.data));
      }
    } catch (error) {
      dispatch(getByIdSuperAdminsError(error.toString()));
    }
  };
};

export const postSuperAdmin = (newSuperAdmin) => {
  return async (dispatch) => {
    dispatch(postSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSuperAdmin)
      });
      const data = await response.json();
      if (response.status == 201) {
        dispatch(postSuperAdminsSuccess(data.data, data.message));
      } else {
        dispatch(postSuperAdminsError(data.data));
      }
    } catch (error) {
      dispatch(postSuperAdminsError(error.toString()));
    }
  };
};

export const putSuperAdmin = (newSuperAdmin, id) => {
  return async (dispatch) => {
    dispatch(putSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newSuperAdmin)
      });
      const data = await response.json();
      if (response.status == 200) {
        dispatch(putSuperAdminsSuccess(data.data, data.message));
      } else {
        dispatch(putSuperAdminsError(data.data));
      }
    } catch (error) {
      dispatch(putSuperAdminsError(error.toString()));
    }
  };
};

export const deleteSuperAdmin = (id) => {
  return async (dispatch) => {
    dispatch(deleteSuperAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin/${id}`, {
        method: 'DELETE'
      });
      if (response.status == 204) {
        dispatch(deleteSuperAdminsSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteSuperAdminsError(data.data));
      }
    } catch (error) {
      dispatch(deleteSuperAdminsError(error.toString()));
    }
  };
};
