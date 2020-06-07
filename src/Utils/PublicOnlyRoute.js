import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/token-service'


// export default function PublicOnlyRoute({ component, ...props }) {
//   const Component = component
//   return (
//     <Route
//       {...props}
//       render={componentProps => (
//         TokenService.hasAuthToken()
//           ? <Redirect to={'/'} />
//           : <Component {...componentProps} />
//       )}
//     />
//   )
// }


const PublicOnlyRoute = ({component: Component, restricted, ...rest}) => {
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
          TokenService.hasAuthToken() && restricted ?
              <Redirect to="/dashboard" />
          : <Component {...props} />
      )} />
  );
};

export default PublicOnlyRoute;