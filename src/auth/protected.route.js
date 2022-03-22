import { Outlet, Navigate } from 'react-router-dom';
import Auth from './auth';

export const ProtectedRoute = () => {
    return Auth.isAuthinticated() ? <Outlet /> : <Navigate to="/log-in" />
}