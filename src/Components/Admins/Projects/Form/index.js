import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { createProject, updateProject, getByIdProjects } from 'redux/projects/thunks';
import { useSelector, useDispatch } from 'react-redux';
import { confirmModalOpen, confirmModalClose, messageModalClose } from 'redux/projects/actions';
import { getEmployees } from 'redux/employees/thunks';
import { projectsSchema } from './validations';

import ModalConfirm from 'Components/Shared/Modal/ModalConfirm';
import ModalMessage from 'Components/Shared/Modal/ModalMessage';
import Input from 'Components/Shared/Inputs';
import Select from 'Components/Shared/Select/index';
import Buttons from 'Components/Shared/Button/index';
import styles from './form.module.css';
import { Spinner } from 'Components/Shared/Spinner';

const ProjectsForm = (props) => {
  const token = sessionStorage.getItem('token');
  const dispatch = useDispatch();
  const {
    handleSubmit,
    unregister,
    register,
    reset,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: joiResolver(projectsSchema) });

  const {
    modalContent,
    showModalMessage,
    showConfirmModal,
    isLoading,
    item: project
  } = useSelector((state) => state.projects);

  const { list: employees } = useSelector((state) => state.employees);
  const params = useParams();
  const id = params.id && params.id;
  const roles = [{ role: 'DEV' }, { role: 'QA' }, { role: 'PM' }, { role: 'TL' }];
  const [employeesProject, setEmployeesProject] = useState([]);
  const [projectInput, setProjectInput] = useState({});

  const onSubmit = (data) => {
    setProjectInput({
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      clientName: data.clientName
    });
    setEmployeesProject(data.employees);
    const content = `Are you sure you want to ${
      id ? 'edit this project' : 'create a new Project'
    }?`;
    dispatch(confirmModalOpen(content));
  };

  useEffect(() => {
    dispatch(getEmployees(token));
  }, []);

  const redirect = () => {
    props.history.push('/admins/home');
  };

  const modalFunction = () => {
    modalContent.title.includes('SUCCESS') && redirect();
    dispatch(messageModalClose());
  };

  const onCancel = () => {
    dispatch(confirmModalClose());
  };

  const onConfirm = () => {
    id
      ? dispatch(updateProject(id, projectInput, employeesProject, token))
      : dispatch(createProject(projectInput, employeesProject, token));
    dispatch(confirmModalClose());
  };

  useEffect(async () => {
    if (id) {
      dispatch(getByIdProjects(id, token));
    }
  }, []);

  useEffect(() => {
    if (project && id) {
      setProjectInput({
        name: project.name,
        description: project.description,
        startDate: fixDate(project.startDate),
        endDate: fixDate(project.endDate),
        clientName: project.clientName
      });
      setEmployeesProject(project.employees);
      setFormValues();
    }
  }, [project]);

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const setFormValues = () => {
    const { name, description, startDate, endDate, clientName, employees } = project;
    const formData = {
      name,
      description,
      startDate: fixDate(startDate),
      endDate: fixDate(endDate),
      clientName,
      employees
    };
    setEmployeesProject(employees);
    reset(formData);
  };

  const resetForm = () => {
    id ? setFormValues() : reset();
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
        {!isLoading ? (
          <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            {id ? <h2>UPDATE PROJECT</h2> : <h2>CREATE PROJECT</h2>}
            <Input
              label={'Project Name'}
              name="name"
              type="text"
              placeholder={'Project Name'}
              register={register}
              error={errors.name?.message}
            />
            <Input
              label={'Description'}
              name="description"
              type="text"
              placeholder={'Description'}
              register={register}
              error={errors.description?.message}
            />
            <Input
              label={'Start Date'}
              name="startDate"
              type="date"
              register={register}
              error={errors.startDate?.message}
            />
            <Input
              label={'End Date'}
              name="endDate"
              type="date"
              register={register}
              error={errors.endDate?.message}
            />
            <Input
              label={'Client Name'}
              name="clientName"
              type="text"
              placeholder={'Client Name'}
              register={register}
              error={errors.clientName?.message}
            />
            <div>
              {employeesProject?.map((option, index) => {
                return (
                  <div key={index} className={styles.employees}>
                    <label>Assign employee</label>
                    <Select
                      options={employees}
                      keyMap={'_id'}
                      title={'Employee'}
                      fieldToShow={'name'}
                      second={'lastName'}
                      isDisabled={false}
                      name={`employees[${index}].employeeId`}
                      register={register}
                      error={errors.employees && errors.employees[index].employeeId?.message}
                    />
                    <Input
                      label={'Rate'}
                      name={`employees[${index}].rate`}
                      type="number"
                      placeholder={'Rate'}
                      register={register}
                      error={errors.employees && errors.employees[index].rate?.message}
                    />
                    <label>Role</label>
                    <Select
                      options={roles}
                      keyMap={'role'}
                      title={'Role'}
                      fieldToShow={'role'}
                      isDisabled={false}
                      name={`employees[${index}].role`}
                      register={register}
                      error={errors.employees && errors.employees[index].role?.message}
                    />
                    <div className={styles.buttonContainer}>
                      <Buttons
                        type="button"
                        variant="delete"
                        name="DELETE"
                        onClick={() => {
                          setEmployeesProject([
                            ...employeesProject.slice(0, index),
                            ...employeesProject.slice(
                              index + 1 ? index + 1 : index,
                              employeesProject.length
                            )
                          ]);
                          unregister('employees');
                        }}
                      />
                    </div>
                  </div>
                );
              })}
              <div className={styles.buttonContainer}>
                <Buttons
                  type="button"
                  variant="add"
                  name="Add Employee"
                  onClick={() =>
                    setEmployeesProject([
                      ...employeesProject,
                      {
                        employeeId: '',
                        rate: 0,
                        role: ''
                      }
                    ])
                  }
                />
              </div>
            </div>
            <div className={styles.btnContainer}>
              <Buttons type="submit" variant="primary" name="Confirm" />
              <Buttons type="button" variant="submit" name="Reset" onClick={() => resetForm()} />
              <Buttons
                variant="secondary"
                name="Cancel"
                onClick={() => props.history.push('/admins/home')}
              />
            </div>
          </form>
        ) : (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsForm;
