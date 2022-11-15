/* eslint-disable react-hooks/exhaustive-deps */

import { Fragment, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { Template } from '../components/Template';
import { useAuth } from '../contexts/AuthProvider/useAuth';
import { Home } from '../pages/LoggedIn/Home';
import { OrderCreate } from '../pages/LoggedIn/Order/Create';
import { OrderList } from '../pages/LoggedIn/Order/List';
import { FirstAccess } from '../pages/LoggedOut/FirstAccess';
import { ForgetPassword } from '../pages/LoggedOut/ForgetPassword';

import { Login } from '../pages/LoggedOut/Login';
import { ResetPassword } from '../pages/LoggedOut/ResetPassword';

const Redirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return <></>
}

const RoutesClient = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/order/list" element={<OrderList />} />
          <Route path="/order/create" element={<OrderCreate />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

const RoutesAdmin = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/order/list" element={<OrderList />} />
          <Route path="/order/create" element={<OrderCreate />} />
          <Route path="*" element={<Redirect />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

const RoutesLogin = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/first-access" element={<FirstAccess />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

const RoutesApp = () => {
  const auth = useAuth();

  return (
    <>
      <Template>
        { auth.user?.type === "client" ? (
          <RoutesClient />
        ) : auth.user?.type === "admin" ? (
          <RoutesAdmin />
        ) : (
          <RoutesLogin />
        )}
      </Template>
    </>
  )
}

export { RoutesApp };