import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  GETBYID_TIMESHEETS_PENDING,
  GETBYID_TIMESHEETS_SUCCESS,
  GETBYID_TIMESHEETS_ERROR,
  POST_TIMESHEETS_PENDING,
  POST_TIMESHEETS_SUCCESS,
  POST_TIMESHEETS_ERROR,
  PUT_TIMESHEETS_PENDING,
  PUT_TIMESHEETS_SUCCESS,
  PUT_TIMESHEETS_ERROR,
  DELETE_TIMESHEETS_PENDING,
  DELETE_TIMESHEETS_SUCCESS,
  DELETE_TIMESHEETS_ERROR
} from './constants';

const INITIAL_STATE = {
  isLoading: false,
  list: [],
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false,
  showConfirmModal: false
};

const timesheetsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: { title: 'ERROR!', content: `Could not GET Timesheets! ${action.payload}` },
        showModalMessage: true
      };
    case GETBYID_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GETBYID_TIMESHEETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: action.payload
      };
    case GETBYID_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not GET Timesheets! ${action.payload}`
        },
        showModalMessage: true
      };
    case POST_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS!',
          content: `TimeSheet Successfully CREATED`
        },
        showModalMessage: true
      };
    case POST_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not CREATE TimeSheet! ${action.payload}`
        },
        showModalMessage: true
      };
    case PUT_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS!',
          content: `TimeSheet Successfully UPDATED`
        },
        showModalMessage: true
      };
    case PUT_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not UPDATE TimeSheet! ${action.payload}`
        },
        showModalMessage: true
      };
    case DELETE_TIMESHEETS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_TIMESHEETS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list.filter((item) => item._id !== action.payload)],
        modalContent: {
          title: 'SUCCESS!',
          content: `Timesheet whit id ${action.payload} successfully DELETED`
        },
        showModalMessage: true
      };
    case DELETE_TIMESHEETS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not DELETE Timesheet! ${action.payload}`
        },
        showModalMessage: true
      };
    default:
      return state;
  }
};

export default timesheetsReducer;
