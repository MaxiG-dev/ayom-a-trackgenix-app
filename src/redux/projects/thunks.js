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

export const postProjects = (input, employees) => {
  return async (dispatch) => {
    dispatch(postProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: input.name,
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
          clientName: input.clientName,
          employees
        })
      });
      if (response.status == 201) {
        const data = await response.json();
        dispatch(postProjectsSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(postProjectsError(data.data));
      }
    } catch (error) {
      dispatch(postProjectsError(error.toString()));
    }
  };
};

export const putProjects = (id, input, employees) => {
  return async (dispatch) => {
    dispatch(putProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: input.name,
          description: input.description,
          startDate: input.startDate,
          endDate: input.endDate,
          clientName: input.clientName,
          employees
        })
      });
      if (response.status == 200) {
        const data = await response.json();
        dispatch(putProjectsSuccess(data.data, data.message));
      } else {
        const data = await response.json();
        dispatch(putProjectsError(data.data));
      }
    } catch (error) {
      dispatch(putProjectsError(error.toString()));
    }
  };
};

export const deleteProjects = (id) => {
  return async (dispatch) => {
    dispatch(deleteProjectsPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'DELETE'
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
