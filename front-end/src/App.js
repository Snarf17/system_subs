import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./page/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from './page/register';
import Login from './page/login';
import AdminPage from './page/adminPage';
import { useContext, useEffect } from 'react';
import { UserContext } from './context/UserContext';
import { API, setAuthToken } from './config/api';
import { PrivateAdmin } from './privateroute/privateroute';


function App() {
  const [state, dispatch] = useContext(UserContext)
  
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

  const checkUser = async () => {
    try { 
      const response = await API.get('/check-auth');
  
      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }
  
      let payload = response.data.data;

      payload.token = localStorage.token;
  
      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });

    } catch (error) {
    }
  };
  
  useEffect(() => {
    checkUser();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          {/* <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>   */}
          <Route element={<PrivateAdmin/>}>
            <Route path='/admin-page' element={<AdminPage/>}/>  
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
