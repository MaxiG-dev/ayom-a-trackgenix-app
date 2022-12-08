import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GETBYID_TASKS_PENDING,
  GETBYID_TASKS_SUCCESS,
  GETBYID_TASKS_ERROR,
  POST_TASKS_PENDING,
  POST_TASKS_SUCCESS,
  POST_TASKS_ERROR,
  PUT_TASKS_PENDING,
  PUT_TASKS_SUCCESS,
  PUT_TASKS_ERROR,
  DELETE_TASKS_PENDING,
  DELETE_TASKS_SUCCESS,
  DELETE_TASKS_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false,
  showModalConfirm: false
};

const tasksReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: { title: 'ERROR!', content: `Could not GET Tasks! ${action.payload}` },
        showModalMessage: true
      };
    case GETBYID_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GETBYID_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: action.payload
      };
    case GETBYID_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not GET Task! ${action.payload}`
        },
        showModalMessage: true
      };
    case POST_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showModalConfirm: false,
        modalContent: {
          title: 'SUCCESS!',
          content: `Task Successfully CREATED`
        },
        showModalMessage: true,
        list: [...state.list, action.payload]
      };
    case POST_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: {
          title: 'ERROR!',
          content: `Could not CREATE Task! ${action.payload}`
        },
        showModalMessage: true
      };
    case PUT_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showModalConfirm: false,
        modalContent: {
          title: 'SUCCESS!',
          content: `Task Successfully UPDATED`
        },
        showModalMessage: true,
        list: [...state.list, action.payload]
      };
    case PUT_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not UPDATE Task! ${action.payload}`
        },
        showModalMessage: true
      };
    case DELETE_TASKS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list.filter((task) => task._id !== action.payload)],
        modalContent: {
          title: 'SUCCESS',
          content: `Task with id ${action.payload} successfully DELETED`
        },
        showModalMessage: true
      };
    case DELETE_TASKS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not DELETE Task! ${action.payload}`
        },
        showModalMessage: true
      };
    default:
      return state;
  }
};

export default tasksReducer;
