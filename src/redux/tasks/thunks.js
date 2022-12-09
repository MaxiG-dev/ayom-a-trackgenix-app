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
  putTasksPending,
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

export const postTasks = (newTask, token) => {
  return async (dispatch) => {
    dispatch(postTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          token,
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newTask)
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

export const putTasks = (data, id, token) => {
  return async (dispatch) => {
    dispatch(putTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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

export const deleteTasks = (id, token) => {
  return async (dispatch) => {
    dispatch(deleteTasksPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          token,
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
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
