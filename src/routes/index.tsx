import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider/useAuth';
import { Home } from '../LoggedIn/Home';
import { FirstAccess } from '../LoggedOut/FirstAccess';
import { ForgetPassword } from '../LoggedOut/ForgetPassword';
import { Login } from '../LoggedOut/Login';

interface IPrivate {
  children: JSX.Element
}

const ProtectedLayout = ({ children }: IPrivate): JSX.Element => {
  const auth = useAuth();

  if(!auth.email){
    return <Login />;
  }

  return children;
}

const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/first-access" element={<FirstAccess />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/home" element={
            <ProtectedLayout>
              <Home />
            </ProtectedLayout>} />
          <Route path="*" element={
            <ProtectedLayout>
              <Home />
            </ProtectedLayout>} />
        </Routes>
      </Fragment>
    </BrowserRouter>
  )
}

export { RoutesApp };