import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { Link } from 'react-router-dom';

import styles from './home.module.css';
import { Spinner } from 'Components/Shared/Spinner';

const EmployeesHome = () => {
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(getProjects(token));
  }, []);

  const { list: projectsList, isLoading } = useSelector((state) => state.projects);

  useEffect(() => {
    setFilteredList(parseFilteredProjects());
  }, [projectsList]);

  const [filteredList, setFilteredList] = useState([]);

  const dispatch = useDispatch();

  const id = sessionStorage.getItem('id');

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const parseFilteredProjects = () => {
    let listData = [];
    projectsById.forEach((element) => {
      listData.push({
        id: element._id,
        name: element.name,
        description: element.description,
        clientName: element.clientName,
        startDate: fixDate(element.startDate),
        endDate: fixDate(element.endDate),
        role: element.employees.filter((employee) => employee.employeeId?._id === id)[0].role
      });
    });
    return listData;
  };

  const projectsById = projectsList.filter((projects) => {
    let result;
    if (projects.employees.length > 0) {
      for (let i = 0; i < projects.employees.length; i++) {
        result = projects.employees[i].employeeId?._id === id;
        if (result === true) {
          break;
        }
      }
    }
    return result;
  });

  const headers = [
    'Project Name',
    'Description',
    'Client Name',
    'Starting Date',
    'End Date',
    'Role'
  ];
  const dataValues = ['name', 'description', 'clientName', 'startDate', 'endDate', 'role'];

  const [search, setSearch] = useState('');

  const results = !search
    ? filteredList
    : filteredList.filter(
        (value) =>
          value.name?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.lastName?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.email?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.description?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.phone?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.clientName?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.startDate?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.endDate?.toLowerCase().includes(search.toLocaleLowerCase()) ||
          value.employees?.toLowerCase().includes(search.toLocaleLowerCase())
      );

  return (
    <div className={styles.projectsWrapper}>
      <div className={styles.title}>
        <h2>Projects</h2>
      </div>
      {isLoading ? (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <>
          {filteredList.length == 0 ? (
            <h1 className={styles.h1}>You are not assigned to any projects.</h1>
          ) : (
            <div className={styles.container}>
              <div className={styles.top}>
                <div className={styles.searchWrap}>
                  <div className={styles.searchBox}>
                    <input
                      type="text"
                      placeholder="Search..."
                      className="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    ></input>
                    <button className={styles.btn}>
                      <img src="/assets/images/lens.svg" alt="update" />
                    </button>
                  </div>
                </div>
                <Link to={`projects/form`}>
                  <button className={styles.createBtn}>+</button>
                </Link>
              </div>
              <table className={styles.table}>
                <thead className={styles.header}>
                  <tr>
                    {headers.map((header, index) => {
                      return <th key={index}>{header}</th>;
                    })}
                    <th key={headers.length + 1}>Add hours</th>
                    <th key={headers.length + 2}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {results.map((item) => {
                    return (
                      <>
                        <tr key={item.id} className={styles.row}>
                          {dataValues.map((value, index) => {
                            return (
                              <>
                                <td key={index}>{item[value]}</td>
                              </>
                            );
                          })}
                          <td key={item.id}>
                            <div className={styles.btnContainer}>
                              <Link to={`timesheets/${item.id}`}>
                                <button className={styles.button}>
                                  <img src="/assets/images/add.svg" alt="add" />
                                </button>
                              </Link>
                            </div>
                          </td>
                          <td>
                            {item.role === 'PM' && (
                              <>
                                <div className={styles.btnContainer}>
                                  <Link to={`projects/form/${item.id}`}>
                                    <button className={styles.button}>
                                      <img src="/assets/images/edit.svg" alt="edit" />
                                    </button>
                                  </Link>
                                  <Link to={`project/timesheets/${item.id}`}>
                                    <button className={styles.button}>
                                      <img src="/assets/images/clock.png" alt="clock" />
                                    </button>
                                  </Link>
                                </div>
                              </>
                            )}
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmployeesHome;
