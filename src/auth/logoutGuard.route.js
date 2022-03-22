import { Outlet, Navigate } from 'react-router-dom';
import Auth from './auth';

export const LogoutGuardRoute = () => {
    return (!Auth.isAuthinticated()) ? <Outlet /> : <Navigate to="/" />
}