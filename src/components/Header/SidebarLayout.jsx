import logo from '../../assets/logo.png';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LuFolderCog } from 'react-icons/lu';
import { ArrowRightStartOnRectangleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setPath, closeSidebar } from '../../services/store';
import Swal from 'sweetalert2';
import menara from '../../assets/menara.png';
import withReactContent from 'sweetalert2-react-content';
import './assets/css/CustomButtomAlertLogout.css';

const SidebarLayout = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();

    const sidebarVisible = useSelector((state) => state.sidebar);
    // eslint-disable-next-line no-unused-vars
    const swalWithBootstrapButtons = withReactContent(Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    }));

    const handleLinkClick = (path) => {
        dispatch(setPath(path));
        dispatch(closeSidebar());
    };

    const handleLogout = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-danger',
                cancelButton: 'btn btn-primary'
            },
            buttonsStyling: false
        });

        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                sessionStorage.removeItem('isLoggedIn');
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('isSuperAdmin');
                swalWithBootstrapButtons.fire(
                    'Logged out!',
                    'You have been logged out successfully.',
                    'success'
                ).then(() => {
                    navigate('/login');
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire(
                    'Cancelled',
                    'You are still logged in :)',
                    'error'
                );
            }
        });
    };


    return (
        <>
            {sidebarVisible && (
                <div className="fixed inset-0 bg-black opacity-50 lg:hidden" onClick={() => dispatch(closeSidebar())}></div>
            )}
            <div className={`fixed z-50 w-72 bg-main-color h-full ${sidebarVisible ? 'block' : 'hidden'} lg:block`}>
                <div className="flex justify-between items-center py-4 px-7">
                    <img src={logo} alt="logo" />
                    <button className="lg:hidden" onClick={() => dispatch(closeSidebar())}>
                        <XMarkIcon className="w-8 h-8 text-white" />
                    </button>
                </div>
                <div className="px-4 lg:mt-4">
                    <ul className="flex flex-col gap-2.5">
                        <li>
                            <Link
                                to="/dashboard"
                                onClick={() => handleLinkClick('/dashboard')}
                                className={`${location.pathname === '/dashboard'
                                    ? 'bg-white border-transparent hover:bg-gray-300'
                                    : 'border-b hover:bg-white border-black hover:border-transparent'
                                    } flex font-medium font-poppins text-lg lg:text-xl gap-4 rounded-md py-4 px-2.5 `}
                            >
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                >
                                    <rect width={24} height={24} fill="url(#pattern0_4038_5042)" />
                                    <defs>
                                        <pattern
                                            id="pattern0_4038_5042"
                                            patternContentUnits="objectBoundingBox"
                                            width={1}
                                            height={1}
                                        >
                                            <use xlinkHref="#image0_4038_5042" transform="scale(0.0078125)" />
                                        </pattern>
                                        <image
                                            id="image0_4038_5042"
                                            width={128}
                                            height={128}
                                            xlinkHref="data:image/png;base64,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"
                                        />
                                    </defs>
                                </svg>
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/complaint"
                                onClick={() => handleLinkClick('/complaint')}
                                className={`${location.pathname === '/complaint'
                                    ? 'bg-white border-transparent hover:bg-gray-300'
                                    : 'border-b hover:bg-white border-black hover:border-transparent'
                                    } flex font-medium font-poppins text-lg lg:text-xl gap-4 rounded-md py-4 px-2.5 `}
                            >
                                <svg
                                    width={22}
                                    height={22}
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_4038_2705)">
                                        <path
                                            d="M20.1658 0L14.6657 0.00183333C13.6574 0.00183333 12.8324 0.82775 12.8333 1.83608L12.8352 8.96042C12.8352 9.74692 13.7051 10.2236 14.3678 9.79917L16.6173 8.25092H22V1.83333C22 0.820417 21.1787 0 20.1658 0ZM17.8457 6.1105C17.4249 6.545 16.7273 6.54225 16.3102 6.10408L14.443 4.13142L15.7144 2.8105L17.0858 4.25975L19.4168 1.848L20.6983 3.15883L17.8447 6.11142L17.8457 6.1105ZM6.87408 11C9.65342 11 11.9157 8.73858 11.9157 5.95833C11.9157 3.17808 9.65433 0.916667 6.875 0.916667C4.09567 0.916667 1.83333 3.17808 1.83333 5.95833C1.83333 8.73858 4.09475 11 6.87408 11ZM6.87408 2.75C8.64325 2.75 10.0824 4.18917 10.0824 5.95833C10.0824 7.7275 8.64325 9.16667 6.87408 9.16667C5.10492 9.16667 3.66575 7.7275 3.66575 5.95833C3.66575 4.18917 5.10492 2.75 6.87408 2.75ZM13.7491 16.9583V22H11.9157V16.9583C11.9157 15.6952 10.8882 14.6667 9.62408 14.6667H4.12408C2.86 14.6667 1.83242 15.6952 1.83242 16.9583V22H0V16.9583C0 14.6841 1.85075 12.8333 4.125 12.8333H9.625C11.8993 12.8333 13.75 14.6841 13.75 16.9583H13.7491Z"
                                            fill="black"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4038_2705">
                                            <rect width={22} height={22} fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Complaint
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/chat-user"
                                onClick={() => handleLinkClick('/chat-user')}
                                className={`${location.pathname === '/chat-user'
                                    ? 'bg-white border-transparent hover:bg-gray-300'
                                    : 'border-b hover:bg-white border-black hover:border-transparent'
                                    } flex font-medium font-poppins text-lg lg:text-xl gap-4 rounded-md py-4 px-2.5 `}
                            >
                                <svg
                                    width={22}
                                    height={22}
                                    viewBox="0 0 22 22"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_4038_2705)">
                                        <path
                                            d="M20.1658 0L14.6657 0.00183333C13.6574 0.00183333 12.8324 0.82775 12.8333 1.83608L12.8352 8.96042C12.8352 9.74692 13.7051 10.2236 14.3678 9.79917L16.6173 8.25092H22V1.83333C22 0.820417 21.1787 0 20.1658 0ZM17.8457 6.1105C17.4249 6.545 16.7273 6.54225 16.3102 6.10408L14.443 4.13142L15.7144 2.8105L17.0858 4.25975L19.4168 1.848L20.6983 3.15883L17.8447 6.11142L17.8457 6.1105ZM6.87408 11C9.65342 11 11.9157 8.73858 11.9157 5.95833C11.9157 3.17808 9.65433 0.916667 6.875 0.916667C4.09567 0.916667 1.83333 3.17808 1.83333 5.95833C1.83333 8.73858 4.09475 11 6.87408 11ZM6.87408 2.75C8.64325 2.75 10.0824 4.18917 10.0824 5.95833C10.0824 7.7275 8.64325 9.16667 6.87408 9.16667C5.10492 9.16667 3.66575 7.7275 3.66575 5.95833C3.66575 4.18917 5.10492 2.75 6.87408 2.75ZM13.7491 16.9583V22H11.9157V16.9583C11.9157 15.6952 10.8882 14.6667 9.62408 14.6667H4.12408C2.86 14.6667 1.83242 15.6952 1.83242 16.9583V22H0V16.9583C0 14.6841 1.85075 12.8333 4.125 12.8333H9.625C11.8993 12.8333 13.75 14.6841 13.75 16.9583H13.7491Z"
                                            fill="black"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_4038_2705">
                                            <rect width={22} height={22} fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                Chat Page
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/category"
                                onClick={() => handleLinkClick('/category')}
                                className={`${location.pathname === '/category'
                                    ? 'bg-white border-transparent hover:bg-gray-300'
                                    : 'border-b hover:bg-white border-black hover:border-transparent'
                                    } flex font-medium font-poppins text-xl gap-4 rounded-md py-4 px-2.5 `}
                            >
                                <LuFolderCog className='w-6 h-6' />
                                Kategori
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/news"
                                onClick={() => handleLinkClick('/news')}
                                className={`${location.pathname === '/news'
                                    ? 'bg-white border-transparent hover:bg-gray-300'
                                    : 'border-b hover:bg-white border-black hover:border-transparent'
                                    } ${location.pathname === `/news-detail/${id}`
                                        ? 'bg-white border-transparent hover:bg-gray-300'
                                        : 'border-b hover:bg-white border-black hover:border-transparent'
                                    } ${location.pathname === '/news-create'
                                        ? 'bg-white border-transparent hover:bg-gray-300'
                                        : 'border-b hover:bg-white border-black hover:border-transparent'
                                    } ${location.pathname === `/news-detail/${id}/edit`
                                        ? 'bg-white border-transparent hover:bg-gray-300'
                                        : 'border-b hover:bg-white border-black hover:border-transparent'
                                    } flex font-medium font-poppins text-lg lg:text-xl gap-4 rounded-md py-4 px-2.5 `}
                            >
                                <svg
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M19 0H10C7.243 0 5 2.243 5 5V6H4.5C2.019 6 0 8.019 0 10.5V20.5C0 22.429 1.569 23.999 3.499 24H19C21.757 24 24 21.757 24 19V5C24 2.243 21.757 0 19 0ZM5 20.5C5 21.327 4.327 22 3.5 22C2.673 22 2 21.327 2 20.5V10.5C2 9.122 3.122 8 4.5 8H5V20.5ZM22 19C22 20.654 20.654 22 19 22H6.662C6.878 21.545 7 21.037 7 20.5V5C7 3.346 8.346 2 10 2H19C20.654 2 22 3.346 22 5V19ZM20 7C20 7.552 19.552 8 19 8H16C15.448 8 15 7.552 15 7C15 6.448 15.448 6 16 6H19C19.552 6 20 6.448 20 7ZM20 11C20 11.552 19.552 12 19 12H10C9.448 12 9 11.552 9 11C9 10.448 9.448 10 10 10H19C19.552 10 20 10.448 20 11ZM20 15C20 15.552 19.552 16 19 16H10C9.448 16 9 15.552 9 15C9 14.448 9.448 14 10 14H19C19.552 14 20 14.448 20 15ZM20 19C20 19.552 19.552 20 19 20H10C9.448 20 9 19.552 9 19C9 18.448 9.448 18 10 18H19C19.552 18 20 18.448 20 19ZM9 7V5C9 4.448 9.448 4 10 4H12C12.552 4 13 4.448 13 5V7C13 7.552 12.552 8 12 8H10C9.448 8 9 7.552 9 7Z"
                                        fill="black"
                                    />
                                </svg>
                                Berita
                            </Link>
                        </li>
                        {sessionStorage.getItem('isSuperAdmin') === 'true' && (
                            <li>
                                <Link
                                    to="/super-admin/admin"
                                    onClick={() => handleLinkClick('/super-admin/admin')}
                                    className={`${location.pathname === '/super-admin/admin'
                                        ? 'bg-white border-transparent hover:bg-gray-300'
                                        : 'border-b hover:bg-white border-black hover:border-transparent'
                                        } ${location.pathname === '/super-admin/user'
                                            ? 'bg-white border-transparent hover:bg-gray-300'
                                            : 'border-b hover:bg-white border-black hover:border-transparent'
                                        } flex font-medium font-poppins text-lg lg:text-xl gap-4 rounded-md py-4 px-2.5 `}
                                >
                                    <svg
                                        width={22}
                                        height={22}
                                        viewBox="0 0 22 22"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_4038_2705)">
                                            <path
                                                d="M20.1658 0L14.6657 0.00183333C13.6574 0.00183333 12.8324 0.82775 12.8333 1.83608L12.8352 8.96042C12.8352 9.74692 13.7051 10.2236 14.3678 9.79917L16.6173 8.25092H22V1.83333C22 0.820417 21.1787 0 20.1658 0ZM17.8457 6.1105C17.4249 6.545 16.7273 6.54225 16.3102 6.10408L14.443 4.13142L15.7144 2.8105L17.0858 4.25975L19.4168 1.848L20.6983 3.15883L17.8447 6.11142L17.8457 6.1105ZM6.87408 11C9.65342 11 11.9157 8.73858 11.9157 5.95833C11.9157 3.17808 9.65433 0.916667 6.875 0.916667C4.09567 0.916667 1.83333 3.17808 1.83333 5.95833C1.83333 8.73858 4.09475 11 6.87408 11ZM6.87408 2.75C8.64325 2.75 10.0824 4.18917 10.0824 5.95833C10.0824 7.7275 8.64325 9.16667 6.87408 9.16667C5.10492 9.16667 3.66575 7.7275 3.66575 5.95833C3.66575 4.18917 5.10492 2.75 6.87408 2.75ZM13.7491 16.9583V22H11.9157V16.9583C11.9157 15.6952 10.8882 14.6667 9.62408 14.6667H4.12408C2.86 14.6667 1.83242 15.6952 1.83242 16.9583V22H0V16.9583C0 14.6841 1.85075 12.8333 4.125 12.8333H9.625C11.8993 12.8333 13.75 14.6841 13.75 16.9583H13.7491Z"
                                                fill="black"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_4038_2705">
                                                <rect width={22} height={22} fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    Super Admin
                                </Link>
                            </li>
                        )}
                        <li>
                            <button
                                onClick={handleLogout}
                                className="w-full text-error-3 hover:bg-rose-300 border-b border-black hover:border-transparent flex font-medium font-poppins text-lg lg:text-xl gap-4 rounded-md py-4 px-2.5"
                            >
                                <ArrowRightStartOnRectangleIcon className="w-6 h-6 text-error-3" />
                                Keluar
                            </button>
                        </li>
                    </ul>
                </div>
                <img src={menara} alt="menara" className='w-[250px] h-[250px] flex absolute -z-50 bottom-[-50px] left-0 rotate-[18.34deg]' />
            </div>
        </>
    );
};

export default SidebarLayout;