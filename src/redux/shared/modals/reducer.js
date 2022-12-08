import {
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE
} from './constants';

const INITIAL_STATE = {
  modalContent: { title: '', content: '' },
  showModalMessage: false,
  showConfirmModal: false
};

const modalsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MESSAGE_MODAL_OPEN:
      return {
        ...state,
        modalContent: {
          title: action.payload.title,
          content: action.payload.content
        },
        showModalMessage: true
      };
    case MESSAGE_MODAL_CLOSE:
      return {
        ...state,
        showModalMessage: false
      };
    case CONFIRM_MODAL_OPEN:
      return {
        ...state,
        modalContent: {
          title: 'Confirm:',
          content: action.payload
        },
        showConfirmModal: true
      };
    case CONFIRM_MODAL_CLOSE:
      return {
        ...state,
        showConfirmModal: false
      };
    default:
      return state;
  }
};

export default modalsReducer;
