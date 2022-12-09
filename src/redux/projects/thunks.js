import {
  getProjectsPending,
  getProjectsSuccess,
  getProjectsError,
  getByIdProjectsPending,
  getByIdProjectsSuccess,
  getByIdProjectsError,
  postProjectsPending,
  postProjectsSuccess,
  postProjectsError,
  putProjectsPending,
  putProjectsSuccess,
  putProjectsError,
  deleteProjectsError,
  deleteProjectsSuccess,
  deleteProjectsPending
} from './actions';

export const getProjects = (token) => {
  return async (dispatch) => {
    dispatch(getProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        headers: { token }
      });
      const data = await response.json();
      dispatch(getProjectsSuccess(data.data));
    } catch (error) {
      dispatch(getProjectsError(error.toString()));
    }
  };
};

export const getByIdProjects = (id, token) => {
  return async (dispatch) => {
    dispatch(getByIdProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        headers: token
      });
      const data = await response.json();
      if (response.status == 200) {
        dispatch(getByIdProjectsSuccess(data.data));
      } else {
        dispatch(getByIdProjectsError(data.msg.toString()));
      }
    } catch (error) {
      dispatch(getByIdProjectsError(error.toString()));
    }
  };
};

export const postProjects = (newProject, employees, token) => {
  return async (dispatch) => {
    dispatch(postProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newProject,
          employees
        })
      });
      const data = await response.json();
      if (response.status == 201) {
        dispatch(postProjectsSuccess(data.data, data.message));
      } else {
        dispatch(postProjectsError(data.data));
      }
    } catch (error) {
      dispatch(postProjectsError(error.toString()));
    }
  };
};

export const putProjects = (id, newProject, employees, token) => {
  return async (dispatch) => {
    dispatch(putProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          newProject,
          employees
        })
      });
      const data = await response.json();
      if (response.status == 200) {
        dispatch(putProjectsSuccess(data.data, data.message));
      } else {
        dispatch(putProjectsError(data.data));
      }
    } catch (error) {
      dispatch(putProjectsError(error.toString()));
    }
  };
};

export const deleteProjects = (id, token) => {
  return async (dispatch) => {
    dispatch(deleteProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE',
        headers: {
          token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (response.status == 204) {
        dispatch(deleteProjectsPending(id));
      } else {
        const data = await response.json();
        dispatch(deleteProjectsPending(data.data));
      }
      dispatch(deleteProjectsSuccess(id));
    } catch (error) {
      dispatch(deleteProjectsError(error.toString()));
    }
  };
};
