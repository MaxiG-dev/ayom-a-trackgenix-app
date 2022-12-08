import {
  getEmployeesPending,
  getEmployeesSuccess,
  getEmployeesError,
  getByIdEmployeesPending,
  getByIdEmployeesSuccess,
  getByIdEmployeesError,
  postEmployeesPending,
  postEmployeesSuccess,
  postEmployeesError,
  putEmployeesPending,
  putEmployeesSuccess,
  putEmployeesError,
  deleteEmployeesPending,
  deleteEmployeesSuccess,
  deleteEmployeesError
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

export const getByIdEmployees = (id, token) => {
  return async (dispatch) => {
    dispatch(getByIdEmployeesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        headers: { token }
      });
      const json = await response.json();
      if (response.status !== 200) {
        dispatch(getByIdEmployeesError(json.msg.toString()));
      } else {
        dispatch(getByIdEmployeesSuccess(json.data));
      }
    } catch (error) {
      dispatch(getByIdEmployeesError(error.toString()));
    }
  };
};

export const postEmployees = (newEmployees) => {
  return async (dispatch) => {
    dispatch(postEmployeesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(newEmployees)
      });
      if (response.status == 201) {
        dispatch(postEmployeesSuccess(response));
      } else {
        const data = await response.json();
        dispatch(postEmployeesError(data.data));
      }
    } catch (error) {
      dispatch(postEmployeesError(error.toString()));
    }
  };
};

export const putEmployees = (id, data, token) => {
  return async (dispatch) => {
    dispatch(putEmployeesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'PUT',
        headers: {
          token,
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
        dispatch(putEmployeesSuccess(response));
      } else {
        const data = await response.json();
        dispatch(putEmployeesError(data.data));
      }
    } catch (error) {
      dispatch(putEmployeesError(error.toString()));
    }
  };
};

export const deleteEmployees = (id) => {
  return async (dispatch) => {
    dispatch(deleteEmployeesPending());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      });
      if (response.status == 204) {
        dispatch(deleteEmployeesSuccess(id));
      } else {
        const data = await response.json();
        dispatch(deleteEmployeesError(data.data));
      }
    } catch (error) {
      dispatch(deleteEmployeesError(error.toString()));
    }
  };
};
