import { joiResolver } from '@hookform/resolvers/joi';
import Input from 'Components/Shared/Inputs';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { passwords } from './validations';

import styles from './modalPassword.module.css';
import Buttons from 'Components/Shared/Button';
import { useDispatch } from 'react-redux';
import { confirmModalOpen, passwordModalClose } from 'redux/employees/actions';

const ModalPassword = ({ show, onCancel, setData, userData }) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: joiResolver(passwords)
  });

  const [showPassword, setShowPassword] = useState(false);
  const passwordShow = () => {
    setShowPassword(!showPassword);
  };
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const repeatPasswordShow = () => {
    setShowRepeatPassword(!showRepeatPassword);
  };
  const dispatch = useDispatch();

  const passwordSubmit = (data) => {
    dispatch(passwordModalClose());
    setData({
      name: userData.name,
      lastName: userData.lastName,
      email: userData.email,
      password: data.password,
      phone: userData.phone
    });

    const content = 'Are you sure you want to change your password?';
    dispatch(confirmModalOpen(content));
  };

  return (
    show && (
      <div className={styles.modalContainer}>
        <div className={styles.container}>
          <form className={styles.form}>
            <h2 className={styles.modalTitle}>Reset password:</h2>
            <Input
              register={register}
              label={'Password'}
              name="password"
              type={showPassword ? 'text' : 'password'}
              error={errors.password?.message}
              placeholder={'Password'}
              show={passwordShow}
              showState={showPassword}
            />
            <Input
              register={register}
              label={'Repeat Password'}
              name="repeatPassword"
              type={showRepeatPassword ? 'text' : 'password'}
              error={errors.repeatPassword?.message}
              placeholder={'Repeat Password'}
              show={repeatPasswordShow}
              showState={showRepeatPassword}
            />
            <div className={styles.buttons}>
              <Buttons variant="secondary" name="Cancel" onClick={onCancel} />
              <Buttons
                type="submit"
                variant="primary"
                name="Confirm"
                onClick={handleSubmit(passwordSubmit)}
              />
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default ModalPassword;
