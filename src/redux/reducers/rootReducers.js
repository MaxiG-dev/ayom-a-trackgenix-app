import { combineReducers } from 'redux';

import authReducer from '../auth/reducer';
import adminsReducer from '../admins/reducer';
import empolyeesReducer from '../employees/reducer';
import projectsReducer from '../projects/reducer';
import superAdminsReducer from '../super-admins/reducer';
import tasksReducer from '../tasks/reducer';
import timesheetsReducer from '../timesheets/reducer';
import routesReducer from '../routes/reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  routes: routesReducer,
  employees: empolyeesReducer,
  admins: adminsReducer,
  projects: projectsReducer,
  superAdmins: superAdminsReducer,
  tasks: tasksReducer,
  timesheets: timesheetsReducer
});

export default rootReducer;
