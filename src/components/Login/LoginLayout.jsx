import menara from '../../assets/menara.png';
import logo from '../../assets/logo.png';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errorLogin, setErrorLogin ] = useState(false);
    const navigate = useNavigate();
    const [ showPassword, setShowPassword ] = useState(false);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/v1/admins/login', {
                // Data yang dikirimkan dalam body request, sesuaikan dengan API Anda
                email: event.target.email.value,
                password: event.target.password.value,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Tidak perlu memeriksa response.ok, cukup cek response.status
            if (response.status !== 200) {
                throw new Error('Login failed');
            }

            const datastatusloginAdmin = response.data.data;

            // Simpan status login dan token ke Session Storage
            sessionStorage.setItem('isLoggedIn', true);
            sessionStorage.setItem('token', datastatusloginAdmin.token);

            // Redirect atau lakukan operasi lain setelah berhasil login sesuai role
            if (datastatusloginAdmin.is_super_admin) {
                sessionStorage.setItem('isSuperAdmin', true);
                navigate("/super-admin/admin");
            } else {
                sessionStorage.setItem('isSuperAdmin', false);
                navigate("/dashboard");
            }
        } catch (error) {
            setErrorLogin({ message: 'Email atau password salah.' });  // Mengatur errorLogin menjadi true saat login gagal
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(prevState => !prevState); // Mengubah nilai state showPassword menjadi kebalikan dari nilai sebelumnya
    };


    return (
        <div className="h-svh grid place-items-center md:flex md:flex-row py-6 px-6 md:px-0 md:py-0">
            <div className="hidden w-6/12 h-full bg-main-color justify-between md:flex flex-col">
                <img src={logo} alt="logo" className='mt-16 mx-auto' />
                <img src={menara} alt="menara image" className='mb-0 w-60 h-72 xl:h-96 xl:w-72' />
            </div>
            <div className="flex flex-col h-auto py-5 px-3 lg:h-full bg-white rounded-md lg:rounded-none w-full lg:w-6/12 lg:justify-center lg:gap-14 lg:px-28">
                <h2 className="text-wrap mx-auto text-main-color text-2xl text-center mb-3 lg:mb-0 md:text-4xl font-bold font-poppins leading-10">Selamat datang Admin !</h2>
                <h3 className="text-center text-gray-500 text-base lg:text-xl mb-4 lg:mb-0 font-bold font-poppins leading-relaxed">Silahkan login terlebih dahulu.</h3>
                <form onSubmit={handleLogin}>

                    {/* Input Email */}
                    <div className='flex flex-col gap-2.5 mb-2.5'>
                        <label htmlFor="email" className="text-zinc-900 text-base font-medium font-poppins leading-tight">Email</label>
                        <input
                            value={email}
                            onChange={(ev) => setEmail(ev.target.value)}
                            type="email" id='email'
                            className={`px-5 py-3 rounded-md w-full text-black placeholder:text-gray-400 text-base font-normal font-poppins leading-normal ${errorLogin ? 'text-error-3 border border-error-3' : 'border border-main-color'}`}
                            placeholder='Masukkan email'
                        />
                    </div>

                    {/* Input Password */}
                    <div className='flex flex-col gap-2.5 mb-2.5 w-full'>
                        <label htmlFor="password" className="text-zinc-900 text-base font-medium font-poppins leading-tight">Password</label>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only"> Password </label>

                            <input
                                type={showPassword ? "text" : "password"} // Menggunakan state showPassword untuk menentukan tipe input
                                id="password"
                                value={password}
                                onChange={(ev) => setPassword(ev.target.value)}
                                placeholder="Masukkan password"
                                className={`rounded-md w-full text-black placeholder:text-gray-400 text-base font-normal font-poppins leading-normal ps-5 pe-9 py-3 ${errorLogin ? 'text-error-3 border border-error-3' : 'border border-main-color'}`}
                            />

                            <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                                <button type="button" className="text-gray-600 hover:text-gray-700" onClick={toggleShowPassword}>
                                    <span className="sr-only">Password</span>
                                    {showPassword ? <EyeSlashIcon className={`size-6 text-black ${errorLogin ? 'text-error-3' : ''}`} /> : <EyeIcon className={`size-6 text-black ${errorLogin ? 'text-error-3' : ''}`} />}
                                </button>
                            </span>
                        </div>
                    </div>

                    {/* Tampilkan pesan error */}
                    {errorLogin.message && (
                        <p className="text-error-3 text-center text-sm mt-2">{errorLogin.message}</p>
                    )}

                    {/* Button Login */}
                    <button type="submit" className=" bg-main-color w-full px-6 mt-5 mb-3 lg:mb-0 lg:mt-8 py-2.5 justify-center items-center inline-flex rounded-md shadow-lg hover:bg-main-darker ">
                        <span className="text-center text-zinc-900 text-sm font-medium font-poppins">Login</span>
                    </button>

                </form>
            </div>
        </div>
    );
}
