import { Route, Redirect } from "react-router-dom";

//Этот компонентом защитите роут /, чтобы на него не смогли перейти неавторизованные пользователи
export const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {props.isLoggedIn ? <Component {...props} /> : <Redirect to="/signin" />}
    </Route>
  );
};

