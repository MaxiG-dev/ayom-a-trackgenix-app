import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  GETBYID_SUPERADMINS_PENDING,
  GETBYID_SUPERADMINS_SUCCESS,
  GETBYID_SUPERADMINS_ERROR,
  POST_SUPERADMINS_ERROR,
  POST_SUPERADMINS_PENDING,
  POST_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_PENDING,
  PUT_SUPERADMINS_SUCCESS,
  PUT_SUPERADMINS_ERROR,
  DELETE_SUPERADMINS_PENDING,
  DELETE_SUPERADMINS_SUCCESS,
  DELETE_SUPERADMINS_ERROR
} from './constants';

const INITIAL_STATE = {
  isLoading: false,
  list: [],
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false,
  showConfirmModal: false
};

const superAdminsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: { title: 'ERROR', content: `Could not GET SuperAdmin! ${action.payload}` },
        showModalMessage: true
      };
    case GETBYID_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GETBYID_SUPERADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: action.payload
      };
    case GETBYID_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR',
          content: `Could not GET SuperAdmin! ${action.payload}`
        },
        showModalMessage: true
      };
    case POST_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_SUPERADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showConfirmModal: false,
        list: [...state.list, action.payload],
        modalContent: {
          title: 'SUCCESS!',
          content: 'SuperAdmin Successfully CREATED'
        },
        showModalMessage: true
      };
    case POST_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'ERROR!',
          content: 'Could not CREATE SuperAdmin'
        },
        showModalMessage: true
      };
    case PUT_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS!',
          content: 'SuperAdmin Successfully UPDATED'
        },
        showModalMessage: true
      };
    case PUT_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR',
          content: 'Could not UPDATE SuperAdmin'
        },
        showModalMessage: true
      };
    case DELETE_SUPERADMINS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_SUPERADMINS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list.filter((item) => item._id !== action.payload)],
        modalContent: {
          title: 'SUCCESS!',
          content: 'SuperAdmin successfully DELETED'
        },
        showModalMessage: true
      };
    case DELETE_SUPERADMINS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR!',
          content: 'Could not DELETE SuperAdmin'
        },
        showModalMessage: true
      };
    default:
      return state;
  }
};

export default superAdminsReducer;
