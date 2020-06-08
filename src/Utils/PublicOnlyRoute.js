import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/token-service'

const PublicOnlyRoute = ({component: Component, restricted, ...rest}) => {
  return (
      <Route {...rest} render={props => (
          TokenService.hasAuthToken() && restricted ?
              <Redirect to="/dashboard" />
          : <Component {...props} />
      )} />
  );
};

export default PublicOnlyRoute;