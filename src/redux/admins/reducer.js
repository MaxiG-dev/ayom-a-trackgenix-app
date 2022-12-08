import {
  GET_ADMINS_ERROR,
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GETBYID_ADMINS_ERROR,
  GETBYID_ADMINS_PENDING,
  GETBYID_ADMINS_SUCCESS,
  POST_ADMINS_PENDING,
  POST_ADMINS_SUCCESS,
  POST_ADMINS_ERROR,
  PUT_ADMINS_PENDING,
  PUT_ADMINS_SUCCESS,
  PUT_ADMINS_ERROR,
  DELETE_ADMINS_PENDING,
  DELETE_ADMINS_SUCCESS,
  DELETE_ADMINS_ERROR
} from './constants';

const INITIAL_STATE = {
  isLoading: false,
  list: [],
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false,
  showConfirmModal: false
};

const adminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: { title: 'ERROR!', content: `Could not GET Admins! ${action.payload}` },
        showModalMessage: true
      };
    case GETBYID_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GETBYID_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        admin: action.payload
      };
    case GETBYID_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: { title: 'ERROR!', content: `Could not GET Admin! ${action.payload}` },
        showModalMessage: true
      };
    case POST_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload],
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS',
          content: `Admins Successfully CREATED`
        },
        showModalMessage: true
      };
    case POST_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'ERROR',
          content: `Could not POST Admins! ${action.payload}`
        },
        showModalMessage: true
      };
    case PUT_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list, action.payload],
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS',
          content: 'Admins Successfully UPDATED'
        },
        showModalMessage: true
      };
    case PUT_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        showConfirmModal: false,
        modalContent: {
          title: 'ERROR',
          content: `Could not UPDATE Admins! ${action.payload}`
        },
        showModalMessage: true
      };
    case DELETE_ADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_ADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list.filter((item) => item._id !== action.payload)],
        modalContent: {
          title: 'SUCCESS',
          content: `Admins with id ${action.payload} successfully DELETED`
        },
        showModalMessage: true
      };
    case DELETE_ADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        modalContent: {
          title: 'Error',
          content: `Could not DELETE Admins! ${action.payload}`
        },
        showModalMessage: true
      };
    default:
      return state;
  }
};

export default adminsReducer;
