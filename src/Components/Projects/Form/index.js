import { useEffect, useState } from 'react';
import styles from './createItem.module.css';
import Modal from '../Modals/modal.js';

const url = window.location.href;
const id = url.substring(url.lastIndexOf('=') + 1);
const initialValue = {
  clientName: '',
  description: '',
  endDate: '',
  name: '',
  startDate: ''
};
const AddProject = () => {
  const [project, setProject] = useState(initialValue);
  const [employees, setEmployees] = useState([]);
  const [employeeData, setEmployeeName] = useState([]);

  const [modalDisplay, setModalDisplay] = useState('');
  const [contentMessage, setContentMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');

  useEffect(async () => {
    if (window.location.href.includes('id')) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`);
        const data = await response.json();
        setProject({
          clientName: data.data.clientName,
          description: data.data.description,
          startDate: data.data.startDate.substr(0, 10),
          endDate: data.data.endDate.substr(0, 10),
          name: data.data.name
        });
        setEmployees(data.data.employees);
      } catch (error) {
        alert('Could not GET Project.', error);
      }
    } else {
      return null;
    }
  }, []);

  const createProject = async ({ clientName, description, endDate, name, startDate }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientName,
          description,
          employees,
          endDate,
          name,
          startDate
        })
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
      alert('Could not create Project.', error);
    }
  };
  const editProject = async ({ clientName, description, endDate, name, startDate }) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          clientName,
          description,
          employees,
          endDate,
          name,
          startDate
        })
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
      alert('Could not update Project.', error);
    }
  };

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      setEmployeeName(data.data);
    } catch (error) {
      alert('Could not get employees', error);
    }
  }, []);

  const employeesNames = employeeData.map((e) => [e.name, ' ', e.lastName, ' id:', e._id]);

  const cleanInputs = () => {
    setProject(initialValue);
    setEmployees([]);
  };

  const onSubmit = (e) => {
    if (!window.location.href.includes('id')) {
      e.preventDefault();
      createProject(project);
      cleanInputs();
    } else {
      e.preventDefault();
      editProject(project);
      cleanInputs();
    }
  };
  return (
    <>
      <div>
        <div className={styles.container}>
          <h2 className={styles.formTitle}>Project Form</h2>
          <form onSubmit={onSubmit} className={styles.form}>
            <div className={styles.formRaws}>
              <label>Client Name</label>
              <input
                className={styles.inputs}
                type="text"
                value={project.clientName}
                name="clientName"
                onChange={(e) => setProject({ ...project, clientName: e.target.value })}
              />
            </div>
            <div className={styles.formRaws}>
              <label>Project Name</label>
              <input
                className={styles.inputs}
                type="text"
                name="name"
                value={project.name}
                onChange={(e) => setProject({ ...project, name: e.target.value })}
              />
            </div>
            <div className={styles.formRaws}>
              <label>Description</label>
              <input
                className={styles.inputs}
                type="text"
                name="description"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
              />
            </div>
            <div className={styles.formRaws}>
              <label>Start Date</label>
              <input
                className={styles.inputs}
                type="date"
                name="startDate"
                value={project.startDate}
                onChange={(e) => setProject({ ...project, startDate: e.target.value })}
              />
            </div>
            <div className={styles.formRaws}>
              <label>End Date</label>
              <input
                className={styles.inputs}
                type="date"
                name="endDate"
                value={project.endDate}
                onChange={(e) => setProject({ ...project, endDate: e.target.value })}
              />
            </div>
            <div>
              {employees.map((employee, index) => (
                <div key={index} id="employee-form" className={styles.form}>
                  <label>Employee</label>
                  <select
                    className={styles.inputs}
                    type="text"
                    name="employeeId"
                    onChange={(e) =>
                      setEmployees([
                        ...employees.slice(0, index),
                        {
                          ...employee,
                          employeeId: e.target.value.slice(-24)
                        },
                        ...employees.slice(index + 1)
                      ])
                    }
                  >
                    {employeesNames.map((e, idx) => (
                      <>
                        <option></option>
                        <option key={idx}>{e}</option>
                      </>
                    ))}
                  </select>
                  <label>Rate</label>
                  <input
                    className={styles.inputs}
                    type="text"
                    name="rate"
                    onChange={(e) =>
                      setEmployees([
                        ...employees.slice(0, index),
                        {
                          ...employee,
                          rate: e.target.value
                        },
                        ...employees.slice(index + 1)
                      ])
                    }
                  />
                  <label>Role</label>
                  <select
                    className={styles.inputs}
                    type="text"
                    name="role"
                    onChange={(e) =>
                      setEmployees([
                        ...employees.slice(0, index),
                        {
                          ...employee,
                          role: e.target.value
                        },
                        ...employees.slice(index + 1)
                      ])
                    }
                  >
                    <option></option>
                    <option>DEV</option>
                    <option>QA</option>
                    <option>PM</option>
                    <option>TL</option>
                  </select>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.target.closest('div').remove();
                    }}
                  >
                    Delete
                  </button>
                </div>
              ))}
              <div className={styles.addEmployeeButton}>
                <button
                  onClick={() =>
                    setEmployees([
                      ...employees,
                      {
                        employeeId: '',
                        rate: 0,
                        role: ''
                      }
                    ])
                  }
                  type="button"
                >
                  Add Employee
                </button>
              </div>
            </div>
            <div className={styles.submitDiv}>
              <button type="submit">Submit</button>
            </div>
          </form>
          <a href={'http://localhost:3000/projects'}>
            <button type="text">Cancel</button>
          </a>
        </div>
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
};

export default AddProject;