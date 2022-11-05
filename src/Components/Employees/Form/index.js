import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Modal from '../Modal';

function Form() {
  const params = new URLSearchParams(window.location.search);
  let employeeId = params.get('id');

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`);
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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${employeeId}`, {
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
          <h2>{employeeId ? 'Edit Employee' : 'Create Employee'}</h2>
          <div className="form-item">
            <label htmlFor="input-name">Name</label>
            <input
              id="input-name"
              name="name"
              required
              value={formValues.name}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  name: e.target.value
                });
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="input-lastName">Last Name</label>
            <input
              id="input-lastName"
              name="lastName"
              required
              value={formValues.lastName}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  lastName: e.target.value
                });
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="input-email">Email</label>
            <input
              id="input-email"
              name="email"
              required
              value={formValues.email}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  email: e.target.value
                });
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="input-password">Password</label>
            <input
              id="input-password"
              type="password"
              name="password"
              required
              value={formValues.password}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  password: e.target.value
                });
              }}
            />
          </div>
          <div className="form-item">
            <label htmlFor="input-phone">Phone</label>
            <input
              id="input-phone"
              name="phone"
              required
              value={formValues.phone}
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  phone: e.target.value
                });
              }}
            />
          </div>
          <div>
            <a href={'../employees'}>
              <button type="button" className={styles.buttonCancel}>
                Cancel
              </button>
            </a>
            <button
              type="submit"
              className={styles.buttonSave}
              onClick={employeeId ? () => editEmployee() : () => createEmployee()}
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
