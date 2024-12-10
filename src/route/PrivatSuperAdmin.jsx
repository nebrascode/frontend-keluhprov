import { Navigate, Outlet } from 'react-router-dom';
import { useEffect } from 'react';

const PrivatSuperAdmin = () => {
    const isSuperAdmin = sessionStorage.getItem('isSuperAdmin') === 'true';
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    const tokenExpiration = sessionStorage.getItem('token');

    useEffect(() => {
        const checkTokenExpiration = () => {
            if (tokenExpiration) {
                const now = new Date().getTime();
                const expirationTime = new Date(tokenExpiration).getTime();

                if (now >= expirationTime) {
                    handleLogout();
                }
            }
        };

        checkTokenExpiration();
        const interval = setInterval(checkTokenExpiration, 1000); // Check every second

        return () => clearInterval(interval);
    }, [tokenExpiration]);

    const handleLogout = () => {
        sessionStorage.clear();
        window.location.href = '/login'; // Redirect to login
    };

    if (!isLoggedIn || !isSuperAdmin) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default PrivatSuperAdmin;
