import { Link, useLocation } from 'react-router-dom';

function SuperAdminPanel() {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case '/super-admin/admin':
                return 'Kelola Admin';
            case '/super-admin/user':
                return 'Kelola User';
            default:
                return 'Kelola Super Admin';
        }
    };

    return (
        <main className="py-6 px-3 lg:ml-80">
            <h1 className="font-poppins text-3xl mb-9 font-bold">{getTitle()}</h1>
            <section
                className="flex row gap-4">
                <Link
                    to="/super-admin/user"
                    className={`${location.pathname === '/super-admin/user' ? 'bg-main-color text-white hover:bg-main-darker' : 'border border-main-color text-main-color hover:bg-main-color hover:text-white'} p-3 rounded-lg font-montserrat`}>User</Link>
                <Link
                    to="/super-admin/admin"
                    className={`${location.pathname === '/super-admin/admin' ? 'bg-main-color text-white hover:bg-main-darker' : 'border border-main-color text-main-color hover:bg-main-color hover:text-white'} p-3 rounded-lg font-montserrat`}>Admin</Link>
            </section>
        </main>
    )
}

export default SuperAdminPanel