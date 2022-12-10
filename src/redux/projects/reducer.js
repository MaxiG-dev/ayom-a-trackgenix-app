import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GETBYID_PROJECTS_PENDING,
  GETBYID_PROJECTS_SUCCESS,
  GETBYID_PROJECTS_ERROR,
  POST_PROJECTS_PENDING,
  POST_PROJECTS_SUCCESS,
  POST_PROJECTS_ERROR,
  PUT_PROJECTS_PENDING,
  PUT_PROJECTS_SUCCESS,
  PUT_PROJECTS_ERROR,
  DELETE_PROJECTS_PENDING,
  DELETE_PROJECTS_SUCCESS,
  DELETE_PROJECTS_ERROR
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  error: '',
  modalContent: { title: '', content: '' },
  showModalMessage: false,
  showConfirmModal: false
};

const projectsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: action.payload
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: { title: 'ERROR!', content: `Could not GET Projects! ${action.payload}` },
        showModalMessage: true
      };
    case GETBYID_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case GETBYID_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        item: action.payload
      };
    case GETBYID_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not GET Project! ${action.payload}`
        },
        showModalMessage: true
      };
    case POST_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case POST_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showConfirmModal: false,
        list: [...state.list, action.payload],
        modalContent: {
          title: 'SUCCESS!',
          content: 'Project Successfully CREATED'
        },
        showModalMessage: true
      };
    case POST_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not CREATE Project! ${action.payload}`
        },
        showModalMessage: true
      };
    case PUT_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case PUT_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        showConfirmModal: false,
        modalContent: {
          title: 'SUCCESS!',
          content: 'Project Successfully UPDATED'
        },
        showModalMessage: true,
        list: [...state.list, action.payload]
      };
    case PUT_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR',
          content: `Could not UPDATE Project! ${action.payload}`
        },
        showModalMessage: true
      };
    case DELETE_PROJECTS_PENDING:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        list: [...state.list.filter((item) => item._id !== action.payload)],
        modalContent: {
          title: 'SUCCESS!',
          content: 'Project successfully DELETED'
        },
        showModalMessage: true
      };
    case DELETE_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        modalContent: {
          title: 'ERROR!',
          content: `Could not DELETE project! ${action.payload}`
        },
        showModalMessage: true
      };
    default:
      return state;
  }
};

export default projectsReducer;
