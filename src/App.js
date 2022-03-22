import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,createContext } from "react";
import SignupPage from './pages/Signup';
import LogInPage from './pages/Login';
import HomePage from './pages/Home'
import Navbar from './components/Navbar';
import User from './components/User';
import { ProtectedRoute } from "./auth/protected.route";
import { LogoutGuardRoute } from "./auth/logoutGuard.route";
import './App.css';


export const UsersContext = createContext([]);

function App() {
	const [users, setUsers] = useState([])
  return (
    <UsersContext.Provider value={{users, setUsers}}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<ProtectedRoute />}>
            <Route exact path='/' element={<HomePage />} />
          </Route>
          <Route path='/sign-up' element={<LogoutGuardRoute />}>
            <Route path="/sign-up" element={<SignupPage />} />
          </Route>
          <Route path='/log-in' element={<LogoutGuardRoute />}>
            <Route path="/log-in" element={<LogInPage />} />
          </Route>
          <Route path='/user/:id' element={<ProtectedRoute />}>
            <Route path="/user/:id" element={<User />} />
          </Route>
          <Route path="*" element={<div>404 - NotFound</div>} />
        </Routes>
      </BrowserRouter>
    </UsersContext.Provider>
  );
}

export default App;
