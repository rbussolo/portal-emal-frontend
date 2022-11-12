import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider/useAuth';
import { Home } from '../pages/LoggedIn/Home';
import { OrderCreate } from '../pages/LoggedIn/Order/Create';
import { OrderList } from '../pages/LoggedIn/Order/List';
import { FirstAccess } from '../pages/LoggedOut/FirstAccess';
import { ForgetPassword } from '../pages/LoggedOut/ForgetPassword';

import { Login } from '../pages/LoggedOut/Login';
import { ResetPassword } from '../pages/LoggedOut/ResetPassword';

const RoutesApp = () => {
  const auth = useAuth();

  return (
    <>
      { auth.email ? (
        <BrowserRouter>
          <Fragment>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/order/list" element={<OrderList />} />
              <Route path="/order/create" element={<OrderCreate />} />
            </Routes>
          </Fragment>
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <Fragment>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/first-access" element={<FirstAccess />} />
              <Route path="/forget-password" element={<ForgetPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
          </Fragment>
        </BrowserRouter>
      )}
    </>
  )
}

export { RoutesApp };