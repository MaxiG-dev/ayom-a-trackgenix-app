import {
  MESSAGE_MODAL_OPEN,
  MESSAGE_MODAL_CLOSE,
  CONFIRM_MODAL_OPEN,
  CONFIRM_MODAL_CLOSE
} from './constants';

export const messageModalOpen = (data) => {
  return {
    type: MESSAGE_MODAL_OPEN,
    payload: data
  };
};

export const messageModalClose = () => {
  return {
    type: MESSAGE_MODAL_CLOSE
  };
};

export const confirmModalOpen = (data) => {
  return {
    type: CONFIRM_MODAL_OPEN,
    payload: data
  };
};

export const confirmModalClose = () => {
  return {
    type: CONFIRM_MODAL_CLOSE
  };
};
