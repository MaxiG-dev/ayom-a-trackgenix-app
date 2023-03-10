import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const auth = useSelector((store) => {
    return store.auth;
  });

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (auth.isLoading) {
          return <></>;
        }
        if (auth.role === rest.role) {
          return <RouteComponent {...routeProps} />;
        }
        if (!auth.isAuthenticated) {
          return <Redirect to={'/home'} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
