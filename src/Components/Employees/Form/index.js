import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './form.module.css';
import Input from '../../Shared/Inputs';
import Modal from '../Modal';

function Form() {
  const params = useParams();
  const id = params.id ? params.id : '';
  const [formValues, setFormValues] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`);
      const data = await response.json();
      setFormValues({
        name: data.data.name,
        lastName: data.data.lastName,
        email: data.data.email,
        password: data.data.password,
        phone: data.data.phone
      });
    } catch (error) {
      setContentMessage(error);
    }
  }, []);

  const createEmployee = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      const data = await response.json();
      setContentMessage(data.message);
      if (response.ok) {
        setModalTitle('Success');
      } else {
        setModalTitle('Error');
      }
      setModalDisplay(true);
    } catch (error) {
      setContentMessage(error);
    }
  };

  const editEmployee = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues)
      });
      const data = await response.json();
      setContentMessage(data.message);
      if (response.ok) {
        setModalTitle('Success');
      } else {
        setModalTitle('Error');
      }
      setModalDisplay(true);
    } catch (error) {
      setContentMessage(error);
    }
    setModalDisplay(true);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className={styles.container}>
        <form onSubmit={onSubmit}>
          <h2>{id ? 'Edit Employee' : 'Create Employee'}</h2>
          <Input
            label={'Name'}
            id="input-name"
            name="name"
            required
            type="text"
            value={formValues.name}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                name: e.target.value
              });
            }}
            placeholder={'Name'}
          />
          <Input
            label={'Last Name'}
            id="input-lastName"
            name="lastName"
            required
            type="text"
            value={formValues.lastName}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                lastName: e.target.value
              });
            }}
            placeholder={'Last Name'}
          />
          <Input
            label={'Email'}
            id="input-email"
            name="email"
            required
            type="text"
            value={formValues.email}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                email: e.target.value
              });
            }}
            placeholder={'Email'}
          />
          <Input
            label={'Password'}
            id="input-password"
            name="password"
            required
            type="password"
            value={formValues.password}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                password: e.target.value
              });
            }}
            placeholder={'Password'}
          />
          <Input
            label={'Phone'}
            id="input-phone"
            name="phone"
            required
            type="number"
            value={formValues.phone}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                phone: e.target.value
              });
            }}
            placeholder={'Phone'}
          />
          <div>
            <Link to={'/employees'}>
              <button type="button" className={styles.buttonCancel}>
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className={styles.buttonSave}
              onClick={id ? () => editEmployee() : () => createEmployee()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
      {modalDisplay ? (
        <Modal
          title={modalTitle}
          contentMessage={contentMessage}
          setModalDisplay={setModalDisplay}
        />
      ) : null}
    </>
  );
}

export default Form;
