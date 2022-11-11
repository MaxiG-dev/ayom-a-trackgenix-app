import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ModalConfirm from '../Shared/Modal/ModalConfirm';
import ModalMessage from '../Shared/Modal/ModalMessage';
import Table from '../Shared/Table/Table';
import styles from './super-admins.module.css';

const SuperAdminsList = () => {
  const [superAdminsList, setSuperAdminsList] = useState([]);
  const [showModalConfirm, setShowModalConfirm] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState(false);
  const [modalContent, setModalContent] = useState({ title: 'title', content: 'content' });
  const [itemId, setItemId] = useState(null);
  const location = useLocation();

  const modalWrapper = (id) => {
    setItemId(id);
    setModalContent({
      title: 'CONFIRM',
      content: `Are you sure you want to delete the SuperAdmin with id ${id}?`
    });
    setShowModalConfirm(true);
  };

  let delParams = {
    id: itemId,
    path: 'SuperAdmin',
    list: superAdminsList,
    setList: setSuperAdminsList,
    setModalContent,
    setShowModalMessage
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/superAdmin`);
      const data = await response.json();
      setSuperAdminsList(data.data);
    } catch (error) {
      setModalContent({ title: 'ERROR!', content: `Could not GET SuperAdmin! ${error.message}` });
      setShowModalMessage(true);
    }
  }, []);

  return (
    <>
      <ModalConfirm
        show={showModalConfirm}
        closeModal={setShowModalConfirm}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
        modalFunction={delParams}
        modalId={null}
      />
      <ModalMessage
        show={showModalMessage}
        closeModal={setShowModalMessage}
        modalTitle={modalContent.title}
        modalContent={modalContent.content}
      />
      <div className={styles.container}>
        <div className={styles.title}>
          <h2>superadmins</h2>
        </div>
        <Table
          data={superAdminsList}
          headers={['First name', 'Last name', 'Email']}
          dataValues={['name', 'lastName', 'email']}
          location={location}
          setShowModal={modalWrapper}
        />
      </div>
    </>
  );
};

export default SuperAdminsList;
