import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GETBYID_TASK_PENDING,
  GETBYID_TASK_SUCCESS,
  GETBYID_TASK_ERROR,
  CREATE_TASKS_PENDING,
  CREATE_TASKS_SUCCESS,
  CREATE_TASKS_ERROR,
  UPDATE_TASKS_PENDING,
  UPDATE_TASKS_SUCCESS,
  UPDATE_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE,
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE
} from './constants';

export const getTasksPending = () => {
  return {
    type: GET_TASKS_PENDING
  };
};

export const getTasksSuccess = (data) => {
  return {
    type: GET_TASKS_SUCCESS,
    payload: data
  };
};

export const getTasksError = (error) => {
  return {
    type: GET_TASKS_ERROR,
    payload: error
  };
};

export const getByIdTaskPending = () => {
  return {
    type: GETBYID_TASK_PENDING
  };
};

export const getByIdTaskSuccess = (data) => {
  return {
    type: GETBYID_TASK_SUCCESS,
    payload: data
  };
};

export const getByIdTaskError = (error) => {
  return {
    type: GETBYID_TASK_ERROR,
    payload: error
  };
};
export const createTasksPending = () => {
  return {
    type: CREATE_TASKS_PENDING
  };
};

export const createTasksSuccess = (data) => {
  return {
    type: CREATE_TASKS_SUCCESS,
    payload: data
  };
};

export const createTasksError = (error) => {
  return {
    type: CREATE_TASKS_ERROR,
    payload: error
  };
};

export const updateTasksPending = () => {
  return {
    type: UPDATE_TASKS_PENDING
  };
};

export const updateTasksSuccess = (data) => {
  return {
    type: UPDATE_TASKS_SUCCESS,
    payload: data
  };
};

export const updateTasksError = (error) => {
  return {
    type: UPDATE_TASKS_ERROR,
    payload: error
  };
};

export const deleteTasksPending = () => {
  return {
    type: DELETE_TASKS_PENDING
  };
};

export const deleteTasksSuccess = (id) => {
  return {
    type: DELETE_TASKS_SUCCESS,
    payload: id
  };
};

export const deleteTasksError = (error) => {
  return {
    type: DELETE_TASKS_ERROR,
    payload: error
  };
};

export const confirmModalOpen = (content) => {
  return {
    type: CONFIRM_MODAL_OPEN,
    payload: content
  };
};

export const confirmModalClose = () => {
  return {
    type: CONFIRM_MODAL_CLOSE
  };
};

export const messageModalOpen = (content) => {
  return {
    type: MESSAGE_MODAL_OPEN,
    payload: content
  };
};

export const messageModalClose = () => {
  return {
    type: MESSAGE_MODAL_CLOSE
  };
};
