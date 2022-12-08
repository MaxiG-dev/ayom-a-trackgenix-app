import {
  getTasksPending,
  getTasksSuccess,
  getTasksError,
  getByIdTasksPending,
  getByIdTasksSuccess,
  getByIdTasksError,
  postTasksSuccess,
  postTasksPending,
  postTasksError,
  putTasksSuccess,
  putTasksError,
  deleteTasksSuccess,
  deleteTasksPending,
  deleteTasksError
} from './actions';

export const getTasks = (token) => {
  return async (dispatch) => {
    dispatch(getTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { token }
      });
      const data = await response.json();
      dispatch(getTasksSuccess(data.data));
    } catch (error) {
      dispatch(getTasksError(error.toString()));
    }
  };
};

export const getByIdTasks = (id, token) => {
  return async (dispatch) => {
    dispatch(getByIdTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        headers: { token }
      });
      const data = await response.json();
      if (response.status == 200) {
        dispatch(getByIdTasksSuccess(data.data));
      } else {
        const data = await response.json();
        dispatch(getByIdTasksError(data.msg.toString()));
      }
    } catch (error) {
      dispatch(getByIdTasksError(error.toString()));
    }
  };
};

export const postTasks = (newTask) => {
  return async (dispatch) => {
    dispatch(postTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        body: JSON.stringify(newTask),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status === 201) {
        const data = await response.json();
        dispatch(postTasksSuccess(data.data));
      } else {
        const data = await response.json();
        dispatch(postTasksError(data.data));
      }
    } catch (error) {
      dispatch(postTasksError(error.toString()));
    }
  };
};

export const putTasks = (data, id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status === 200) {
        dispatch(putTasksSuccess(data, id));
      } else {
        const data = await response.json();
        dispatch(putTasksError(data.data));
      }
    } catch (error) {
      dispatch(putTasksError(error.toString()));
    }
  };
};

export const deleteTasks = (id) => {
  return async (dispatch) => {
    dispatch(deleteTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        dispatch(deleteTasksSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteTasksError(data.data));
      }
    } catch (error) {
      dispatch(deleteTasksError(error.toString()));
    }
  };
};
