import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom'
import ReCAPTCHA from "react-google-recaptcha";

import axios from 'axios'
import { apiUserMaster, apiUserAccount } from '../../config/apiUrl'


const Daftar = () => {
    const[user_name, setUsername] = useState('');
    const[user_email, setEmail] = useState('');
    const[user_password, setPassword] = useState('');
    const[alert, setAlert] = useState('');
    const[error, setError] = useState('');

    // const [error, setError] = useState("");
    const [token, setToken] = useState("");
    // const [btnElement, setLoading] = useButtonLoader(
    //     "Create Account",
    //     "Creating..."
    // );
    const reCaptcha = useRef();

    // const[user_confpassword, setConfPassword] = useState('');



    const onChangeUsername = (e) => {
        const value = e.target.value
        setUsername(value)
        setError('')

    }

    const onChangeEmail = (e) => {
        const value = e.target.value
        setEmail(value)
        setError('')

    }

    const onChangePassword = (e) => {
        const value = e.target.value
        setPassword(value)
        setError('')

    }

    // const onChangeConfPassword = (e) => {
    //     const value = e.target.value
    //     setConfPassword(value)
    // }

    const klikDaftar = () => {
        if (!token) {
            setError("You must verify the captcha");
            setTimeout (() => {
                setError('')
            }, 2500)
            return;
        }

        setError("");


        const device_info = navigator.platform;
        const data = {
            
            user_name : user_name,
            user_email : user_email,
            user_password : user_password,
            user_device_info : device_info
        }
        // ================
        axios.post(`${apiUserMaster}/users/signup-with-recaptcha`, {
            token,
            user_name : user_name,
            user_email : user_email,
            user_password : user_password,
            user_device_info : device_info
        })
        .then(result => {
                if ( result ) {
                    console.log(result.data)
                    if (result.data) {
                        setUsername('')
                        setEmail('')
                        setPassword('')
                        setAlert(result.data.message)
                        setTimeout (() => {
                            setAlert('')
                        }, 2500)
                    }
                }
            })
            .catch (e => {
                setError(e.response.data.message)
    
            })
            .finally(() => {
                reCaptcha.current.reset();
                setToken("");
                // setLoading(false);
            });

        //=================
        // axios.post(`${apiUserMaster}/users/signup`, data)
        // .then(result => {
        //     if ( result ) {
        //         console.log(result.data)
        //         if (result.data) {
        //             setUsername('')
        //             setEmail('')
        //             setPassword('')
        //             setAlert(result.data.message)
        //             setTimeout (() => {
        //                 setAlert('')
        //             }, 2500)
        //         }
        //     }
        // })
        // .catch (e => {
        //     setError(e.response.data.message)

        // })
    }

    const tokenjwt = localStorage.getItem('token')
    // console.log(token)


    console.log(token)
    const a = axios.defaults.headers.common['Authorization'] = 'bearer ' + tokenjwt
    console.log(a)


    if (tokenjwt) {
        // alert("Tidak Bisa Akses Halaman Ini. Silakan Login Dulu!");
        return <Redirect to="/home" />
    }


    const handleKeypress = (event) => {
        if(event.key === 'Enter'){
          console.log('enter press here! ')
          klikDaftar()
        }
      }


    return (
    <div>



        <div className="min-h-screen text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
                <div className="relative mt-0 py-1 sm:max-w-xl mx-auto text-center">

                    {
                        error && (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                                <p>{error}</p>
                            </div>
                       )
                    }   

                    {
                        alert && (
                            <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                                <p>{alert}</p>
                            </div>
                        )
                    }   

                    <span className="text-2xl font-light">Sign Up</span>
                    <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                        <div className="h-2 bg-pink-600 rounded-t-md"></div>
                        <div className="py-6 px-8">
                        
                            <input type="text" placeholder="Fullname" className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-pink-600 rounded-md" value={user_name} onChange={onChangeUsername} onKeyPress={handleKeypress}/>
                            <input type="text" placeholder="Email" className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-pink-600 rounded-md" value={user_email} onChange={onChangeEmail} onKeyPress={handleKeypress}/>
                            <input type="password" placeholder="Password" className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-pink-600 rounded-md"  value={user_password} onChange={onChangePassword} onKeyPress={handleKeypress}/>
                            {/* <input type="password" placeholder="Confirm Password" className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"  value={user_confpassword} onChange={onChangeConfPassword} /> */}
                            <div className=" w-full h-5 px-3 py-5 mt-2 flex justify-center">
                                    <ReCAPTCHA
                                        ref={reCaptcha}
                                        sitekey='6LfvBY4aAAAAADEE_Orm6kn0W_JyzaSexXe7rzqu'
                                        onChange={token => setToken(token)}
                                        onExpired={e => setToken("")}
                                    />
                                </div>
                            <div className="flex justify-center items-baseline">
                                <button className="mt-20 bg-pink-600 hover:bg-pink-500 text-white py-2 px-6 rounded-lg" values="klikDaftar" onClick={klikDaftar}>Create Account</button>
                            </div>


                        <div className="text-center text-sm text-gray-400 mt-4">
                                By signing up, you agree to the &nbsp;
                            <a className="underline font-semibold border-b border-grey-dark text-grey-dark" href="#">
                                Terms of Service
                            </a> and &nbsp;
                            <a className="underline font-semibold border-b border-grey-dark text-grey-dark" href="#">
                                Privacy Policy
                            </a>
                        </div>


                        </div>
                    </div>
                    <div className="text-grey-dark mt-6">
                    Already have an account? &nbsp;
                    <a className="underline font-semibold text-pink-600" href="../login/">
                        Sign In
                    </a>.
                </div>
                </div>
            </div>


        
    </div>


    )
}

export default Daftar;