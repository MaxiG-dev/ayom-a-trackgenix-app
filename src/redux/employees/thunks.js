import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  getByIdEmployeePending,
  getByIdEmployeeSuccess,
  getByIdEmployeeError,
  deleteEmployeePending,
  deleteEmployeeSuccess,
  deleteEmployeeError,
  postEmployeePending,
  postEmployeeSuccess,
  postEmployeeError,
  putEmployeePending,
  putEmployeeSuccess,
  putEmployeeError
} from './actions';

export const getEmployees = () => {
  return async (dispatch) => {
    dispatch(getEmployeesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`);
      const data = await response.json();
      dispatch(getEmployeesSuccess(data.data));
    } catch (error) {
      dispatch(getEmployeesError(error.toString()));
    }
  };
};

export const getByIdEmployee = (id) => {
  return async (dispatch) => {
    dispatch(getByIdEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`);
      const json = await response.json();
      if (response.status !== 200) {
        dispatch(getByIdEmployeeError(json.msg.toString()));
      } else {
        dispatch(getByIdEmployeeSuccess(json.data));
      }
    } catch (error) {
      dispatch(getByIdEmployeeError(error.toString()));
    }
  };
};

export const deleteEmployee = (id) => {
  return async (dispatch) => {
    dispatch(deleteEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status == 204) {
        dispatch(deleteEmployeeSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteEmployeeError(data.data));
      }
    } catch (error) {
      dispatch(deleteEmployeeError(error.toString()));
    }
  };
};

export const createEmployee = (newEmployee) => {
  return async (dispatch) => {
    dispatch(postEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newEmployee)
      });
      if (response.status == 201) {
        dispatch(postEmployeeSuccess(response));
      } else {
        const data = await response.json();
        dispatch(postEmployeeError(data.data));
      }
    } catch (error) {
      dispatch(postEmployeeError(error.toString()));
    }
  };
};

export const updateEmployee = (id, data) => {
  return async (dispatch) => {
    dispatch(putEmployeePending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phone: data.phone
        })
      });
      if (response.status === 200) {
        dispatch(putEmployeeSuccess(response));
      } else {
        const data = await response.json();
        dispatch(putEmployeeError(data.data));
      }
    } catch (error) {
      dispatch(putEmployeeError(error.toString()));
    }
  };
};
