import React, { lazy } from 'react';
import { Suspense } from 'react';
import { useRouteMatch, Route, Switch, BrowserRouter } from 'react-router-dom';

const AdminsHome = lazy(() => import('Components/Admins/Home'));
const ProjectsForm = lazy(() => import('Components/Admins/Projects/Form'));
const Employees = lazy(() => import('Components/Admins/Employees'));
const EmployeesForm = lazy(() => import('Components/Admins/Employees/Form'));
const AdminProfile = lazy(() => import('Components/Admins/Profile'));

const AdminsRouter = () => {
  const { url } = useRouteMatch();
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div>
            <img src="/assets/images/spinner.gif" alt="spinner" />
          </div>
        }
      >
        <Switch>
          <Route exact path={`${url}/home`} component={AdminsHome} />
          <Route exact path={`${url}/admins/home/form`} component={ProjectsForm} />
          <Route exact path={`${url}/home/:id`} component={ProjectsForm} />
          <Route exact path={`${url}/employees`} component={Employees} />
          <Route exact path={`${url}/admins/employees/form`} component={EmployeesForm} />
          <Route exact path={`${url}/employees/:id`} component={EmployeesForm} />
          <Route exact path={`${url}/profile`} component={AdminProfile} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};

export default AdminsRouter;
