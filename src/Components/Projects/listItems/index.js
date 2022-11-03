import './listItem.module.css';
const ListItem = ({ listItem, deleteItem }) => {
  const handleDelete = (id) => {
    deleteItem(id);
  };
  const projectsEmployeesNames = listItem.employees
    .map((employee) => employee.employeeId)
    .map((projectEmployee) => [projectEmployee.name, ' ', projectEmployee.lastName, ' ']);
  return (
    <tr>
      <td>{listItem.name} </td>
      <td>{listItem.description} </td>
      <td>{listItem.clientName} </td>
      <td>{listItem.startDate} </td>
      <td>{listItem.endDate} </td>
      <td>{projectsEmployeesNames}</td>
      <td>
        <button onClick={() => handleDelete(listItem._id)}>Delete</button>
        <button
          onClick={() => {
            window.location.assign(`/projects/form?id=${listItem._id}`);
          }}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};
export default ListItem;
