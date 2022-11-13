import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  CLOSE_MESSAGE_MODAL
} from './constants';

const INITIAL_STATE = {
  list: [],
  isLoading: false,
  modalContent: { title: '', content: '' },
  showModalMessage: false
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
        list: action.payload,
        isLoading: false
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        list: [],
        isLoading: false,
        modalContent: { title: 'ERROR!', content: `Could not GET projects!\n${action.payload}` },
        showModalMessage: true
      };
    case CLOSE_MESSAGE_MODAL:
      return {
        ...state,
        modalContent: { title: '', content: '' },
        showModalMessage: false
      };
    default:
      return state;
  }
};

export default projectsReducer;
