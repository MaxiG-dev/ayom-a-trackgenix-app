import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getEmployees, deleteEmployee } from 'redux/employees/thunks';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/employees/actions';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Table from 'Components/Shared/Table/Table';
import styles from './employees.module.css';
import { logout } from 'redux/auth/thunks';
import { Spinner } from 'Components/Shared/Spinner';

const Employees = () => {
  const token = sessionStorage.getItem('token');
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  const {
    isLoading,
    list: employeesList,
    modalContent,
    showModalMessage,
    showConfirmModal
  } = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const modalWrapper = (id) => {
    const content = 'Are you sure you want to delete this Employee?';
    setItemId(id);
    dispatch(confirmModalOpen(content));
  };

  const onConfirm = () => {
    !modalContent.content.includes('logout')
      ? (dispatch(deleteEmployee(itemId, token)), dispatch(confirmModalClose()))
      : dispatch(logout()),
      dispatch(confirmModalClose());
  };
  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  useEffect(() => {
    dispatch(getEmployees(token));
  }, []);

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS');
    dispatch(messageModalClose());
  };

  return (
    <>
      <ModalConfirm
        show={showConfirmModal}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <ModalMessage
        show={showModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={modalFunction}
      />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>Employees</h2>
        </div>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <Table
            data={employeesList}
            headers={['First name', 'Last name', 'Phone', 'Email']}
            dataValues={['name', 'lastName', 'phone', 'email']}
            location={location}
            setShowModal={modalWrapper}
            displayCreateButton={false}
            displayActions={true}
          />
        )}
      </div>
    </>
  );
};

export default Employees;
