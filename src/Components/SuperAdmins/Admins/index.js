import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { messageModalClose, confirmModalOpen, confirmModalClose } from 'redux/admins/actions';
import { createAdmins, updateAdmins, getByIdAdmin } from 'redux/admins/thunks';
import { useForm } from 'react-hook-form';
import { Schema } from './validations';
import { joiResolver } from '@hookform/resolvers/joi';
import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Buttons from 'Components/Shared/Button/index';
import styles from './Form.module.css';
import { logout } from 'redux/auth/thunks';

const Form = (props) => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem('token');
  const params = useParams();
  const id = params.id ? params.id : '';
  const [showPassword, setShowPassword] = useState(false);
  const [adminData, setAdminData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: ''
  });

  const { admin, modalContent, showConfirmModal, showModalMessage } = useSelector(
    (state) => state.admins
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    reset
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(Schema)
  });

  useEffect(async () => {
    if (id) {
      dispatch(getByIdAdmin(id, token));
    } else {
      return null;
    }
  }, []);

  useEffect(() => {
    if (admin && id) {
      setValue('name', admin.name);
      setValue('lastName', admin.lastName);
      setValue('email', admin.email);

      setAdminData({
        name: admin.name,
        lastName: admin.lastName,
        email: admin.email
      });
    }
  }, [admin]);

  const onConfirm = () => {
    !modalContent.content.includes('logout')
      ? id
        ? dispatch(updateAdmins(adminData, id, token))
        : dispatch(createAdmins(adminData, token))
      : dispatch(logout()),
      dispatch(confirmModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const redirect = () => {
    props.history.push('/super-admins');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const onSubmit = (event) => {
    setAdminData({
      name: event.name,
      lastName: event.lastName,
      email: event.email,
      password: event.password
    });

    const content = `Are you sure you want to ${id ? 'edit this Admin' : 'create a new Admin'}?`;
    dispatch(confirmModalOpen(content));
  };

  const resetInputs = () => {
    reset(adminData);
  };

  const passwordShow = () => {
    setShowPassword(!showPassword);
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
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {id ? <h2>UPDATE ADMIN</h2> : <h2>CREATE ADMIN</h2>}
          <Input
            label={'Name'}
            type="text"
            name="name"
            placeholder={'Name'}
            register={register}
            error={errors.name?.message}
          />
          <Input
            label={'Last Name'}
            type="text"
            name="lastName"
            placeholder={'Last Name'}
            register={register}
            error={errors.lastName?.message}
          />
          <Input
            label={'Email'}
            type="text"
            name="email"
            placeholder={'Email'}
            register={register}
            error={errors.email?.message}
          />
          {!id && (
            <Input
              label={'Password'}
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={'Password'}
              register={register}
              error={errors.password?.message}
              show={passwordShow}
              showState={showPassword}
            />
          )}
          <div>
            <Link to={'/super-admins'}>
              <Buttons variant="secondary" name="Cancel" />
            </Link>
            <Buttons type="button" variant="submit" name="Reset" onClick={() => resetInputs()} />
            <Buttons type="submit" variant="primary" name="Confirm" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
