import {
  getAdminsPending,
  getAdminsSuccess,
  getAdminsError,
  getByIdAdminsPending,
  getByIdAdminsSuccess,
  getByIdAdminsError,
  postAdminsPending,
  postAdminsSuccess,
  postAdminsError,
  putAdminsPending,
  putAdminsSuccess,
  putAdminsError,
  deleteAdminsPending,
  deleteAdminsSuccess,
  deleteAdminsError
} from './actions';

export const getAdmins = () => {
  return async (dispatch) => {
    dispatch(getAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`);
      const json = await response.json();
      dispatch(getAdminsSuccess(json.data));
    } catch (error) {
      dispatch(getAdminsError(error.toString()));
    }
  };
};

export const getByIdAdmin = (id) => {
  return async (dispatch) => {
    dispatch(getByIdAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`);
      const data = await response.json();
      if (response.status == 200) {
        dispatch(getByIdAdminsSuccess(data.data));
      } else {
        const data = await response.json();
        dispatch(getByIdAdminsError(data.msg.toString()));
      }
    } catch (error) {
      dispatch(getByIdAdminsError(error.toString()));
    }
  };
};

export const postAdmins = (input) => {
  return async (dispatch) => {
    dispatch(postAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: input.name,
          lastName: input.lastName,
          email: input.email,
          password: input.password
        })
      });
      if (response.status == 201) {
        const data = await response.json();
        dispatch(postAdminsSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(postAdminsError(data.data));
      }
    } catch (error) {
      dispatch(postAdminsError(error.toString()));
    }
  };
};

export const putAdmins = (input, id) => {
  return async (dispatch) => {
    dispatch(putAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: input.name,
          lastName: input.lastName,
          email: input.email,
          password: input.password
        })
      });
      if (response.status == 200) {
        const data = await response.json();
        dispatch(putAdminsSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(putAdminsError(data.data));
      }
    } catch (error) {
      dispatch(putAdminsError(error.toString()));
    }
  };
};

export const deleteAdmins = (id) => {
  return async (dispatch) => {
    dispatch(deleteAdminsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${id}`, {
        method: 'DELETE'
      });
      if (response.status == 204) {
        dispatch(deleteAdminsSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteAdminsError(data.data));
      }
    } catch (error) {
      dispatch(deleteAdminsError(error.toString()));
    }
  };
};
