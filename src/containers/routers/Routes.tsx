import { Route, Routes } from 'react-router';

import Home from '../../features/Home';
import Login from '../../features/Login';
import Error500 from '../../common/Error';
import Error403 from '../../common/Forbiden';
import NotFound from  '../../common/NotFound';
import PrivateRoute, { ProtectedRouteProps } from "./PrivateRoute";

function Routs(props: any){
  
  const {toggleTheme} = props;

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, 'outlet'> = {
    isAuthenticated: false,
    authenticationPath: '/login',
    redirectPath: "/error500",
    setRedirectPath: Login
  };

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home toggleTheme={toggleTheme}/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/notFound' element={<NotFound />} />
        <Route path='/error500' element={<Error500 />} />
        <Route path='/error403' element={<Error403 />} />
        <Route path='/home' element={<PrivateRoute {...defaultProtectedRouteProps} outlet={<Home />} />} />
      </Routes>
    </div>
  );
};

export default Routs;
