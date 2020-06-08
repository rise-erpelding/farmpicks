import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/token-service'

const PrivateRoute = ({component: Component, ...rest}) => {
  return (
      <Route {...rest} render={props => (
          TokenService.hasAuthToken() ?
              <Component {...props} />
          : <Redirect to="/login" />
      )} />
  );
};

export default PrivateRoute;