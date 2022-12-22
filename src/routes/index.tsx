/* eslint-disable react-hooks/exhaustive-deps */

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Template } from '../components/Template';
import { useAuth } from '../contexts/AuthProvider/useAuth';
import { Home } from '../pages/LoggedIn/Home';
import { MotoristaList } from '../pages/LoggedIn/Motorista/List';
import { OrderCreate } from '../pages/LoggedIn/Order/Create';
import { OrderList } from '../pages/LoggedIn/Order/List';
import { UserClientCreate } from '../pages/LoggedIn/User/Client';
import { UserCreate } from '../pages/LoggedIn/User/Create';
import { UserList } from '../pages/LoggedIn/User/List';
import { Company } from '../pages/LoggedOut/Company';
import { FirstAccess } from '../pages/LoggedOut/FirstAccess';
import { ForgetPassword } from '../pages/LoggedOut/ForgetPassword';
import { Login } from '../pages/LoggedOut/Login';
import { ResetPassword } from '../pages/LoggedOut/ResetPassword';

const LoginLayout = () => {
  const user = useAuth().getCurrentUser();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return (
    <>
      <Template>
        <Outlet />
      </Template>
    </>
  )
}

const ProtectedRoute = () => {
  const user = useAuth().getCurrentUser();

  if (!user) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <>
      <Template>
        <Outlet />
      </Template>
    </>
  )
};

const OpenRoute = () => {
  return (
    <>
      <Template>
        <Outlet />
      </Template>
    </>
  )
}

const RoutesApp = () => {
  const user = useAuth().getCurrentUser();

  return (
    <>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/first-access" element={<FirstAccess />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/order/list" element={<OrderList />} />
          <Route path="/order/create" element={<OrderCreate />} />
          <Route path="/user/list" element={<UserList />} />
          <Route path="/user/create/:mode/:user_id" element={<UserCreate />} />
          <Route path="/user/client/:user_id" element={<UserClientCreate />} />
          <Route path="/driver/list" element={<MotoristaList />} />
          <Route path="/driver/create/:mode/:user_id" element={<UserCreate />} />
        </Route>

        <Route element={<OpenRoute />}>
          <Route path="/company" element={<Company />} />
        </Route>

        <Route path="*" element={user ? (
          <Template>
            <Home />
          </Template>
        ) : (
          <Template>
            <Login />
          </Template>
        )} />
      </Routes>
    </>
  )
}

export { RoutesApp };