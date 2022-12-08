import { combineReducers } from 'redux';

import authReducer from 'redux/auth/reducer';
import modalsReducer from 'redux/shared/modals/reducer';
import adminsReducer from 'redux/admins/reducer';
import empolyeesReducer from 'redux/employees/reducer';
import projectsReducer from 'redux/projects/reducer';
import superAdminsReducer from 'redux/super-admins/reducer';
import tasksReducer from 'redux/tasks/reducer';
import timesheetsReducer from 'redux/timesheets/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  modals: modalsReducer,
  employees: empolyeesReducer,
  admins: adminsReducer,
  projects: projectsReducer,
  superAdmins: superAdminsReducer,
  tasks: tasksReducer,
  timesheets: timesheetsReducer
});

export default rootReducer;
