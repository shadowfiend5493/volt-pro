import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../store/auth-store';

const ProtectedRoute = ({ allowedRoles = [] }) => {
    const { hasRole, isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const hasAllowedRole = allowedRoles.length === 0 || allowedRoles.some((role) => hasRole(role));

    if (!hasAllowedRole) {
        return <Navigate to="/account" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
