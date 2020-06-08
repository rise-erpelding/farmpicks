import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/token-service'

const PrivateRoute = ({component: Component, ...rest}) => {
  return (

      // Show the component only when the user is logged in
      // Otherwise, redirect the user to /signin page
      <Route {...rest} render={props => (
          TokenService.hasAuthToken() ?
              <Component {...props} />
          : <Redirect to="/login" />
      )} />
  );
};

export default PrivateRoute;

// export default function PrivateRoute({ component, ...props }) {
//   const Component = component
//   return (
//     <Route
//       {...props}
//       render={componentProps => (
//         TokenService.hasAuthToken()
//           ? <Component {...componentProps} />
//           : <Redirect
//               to={{
//                 pathname: '/login',
//                 state: { from: componentProps.location }
//               }}
//             />
//       )}
//     />
//   )
// }