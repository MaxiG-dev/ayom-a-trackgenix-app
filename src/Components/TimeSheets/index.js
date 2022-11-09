import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ModalConfirm from '../Shared/Modal/Modal.confirm';
import styles from './timeSheets.module.css';

const TimeSheets = (props) => {
  const [timeSheets, setTimesheet] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [timeSheetId, setTimeSheetId] = useState(undefined);

  useEffect(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/`);
      const json = await response.json();
      setTimesheet(json.data);
    } catch (error) {
      alert('Could not GET TimeSheets.', error);
    }
  }, []);

  const fixDate = (date) => {
    let dateFormated = date.substr(0, 10);
    return dateFormated;
  };

  const deleteTimeSheet = async (id) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/timesheets/${id}`, {
        method: 'DELETE'
      });
      if (response.status === 204) {
        alert('TimeSheet removed.');
        setTimesheet([...timeSheets.filter((timeSheet) => timeSheet._id !== id)]);
      } else {
        alert('TimeSheet could not be removed.');
      }
    } catch (error) {
      alert('TimeSheet could not be removed.', error);
    }
  };

  return (
    <section>
      <ModalConfirm
        show={showModal}
        closeModal={setShowModal}
        modalTitle={'Delete TimeSheet'}
        modalContent={`Do you want to delete this TimeSheet?`}
        modalFunction={deleteTimeSheet}
        modalId={timeSheetId}
      />
      <div className={styles.list}>
        <div className={styles.tableTitle}>
          <h2>TimeSheets</h2>
          <button
            className={styles.add}
            onClick={() => {
              props.history.push('/timesheets/form');
            }}
          >
            <img src="/assets/images/add.svg" alt="add TimeSheet" />
            <a>Add new timeSheet</a>
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th className={styles.textLeft}>Description</th>
              <th className={styles.textLeft}>Date</th>
              <th className={styles.textLeft}>Hours</th>
              <th className={styles.textLeft}>Task</th>
              <th className={styles.textLeft}>Employee</th>
              <th className={styles.textLeft}>Project</th>
              <th className={styles.button}></th>
            </tr>
          </thead>
          <tbody>
            {timeSheets.map((timeSheet) => {
              return (
                <tr key={timeSheet._id}>
                  <td className={styles.textLeft}>{timeSheet.description}</td>
                  <td className={styles.textLeft}>{fixDate(timeSheet.date)}</td>
                  <td className={styles.textLeft}>{timeSheet.hours}</td>
                  <td className={styles.textLeft}>
                    {timeSheet.task === null ? 'Not found in DB' : timeSheet.task['description']}
                  </td>
                  <td className={styles.textLeft}>
                    {timeSheet.employee === null
                      ? 'Not found in DB'
                      : timeSheet.employee['lastName'] + timeSheet.employee['name']}
                  </td>
                  <td className={styles.textLeft}>
                    {timeSheet.project === null ? 'Not found in DB' : timeSheet.project['name']}
                  </td>
                  <td className={styles.buttons}>
                    <Link to={`/timesheets/${timeSheet._id}`}>
                      <button className={styles.update}>
                        <img src="/assets/images/edit.svg" alt="update" />
                      </button>
                    </Link>
                    <button
                      className={styles.delete}
                      onClick={() => {
                        setShowModal(true);
                        setTimeSheetId(timeSheet._id);
                      }}
                    >
                      <img src="/assets/images/trash.svg" alt="delete" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TimeSheets;
