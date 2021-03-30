import React, { useState, Fragment } from 'react';
import { Redirect, useHistory } from 'react-router-dom'
import axios from 'axios'
import { apiUserMaster, apiUserAccount } from '../../config/apiUrl'
import { toast } from 'react-toastify'
import swal from 'sweetalert';



const Login = () => {
    const [user_email, setEmail] = useState('');
    const [user_password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [error, setError] = useState('');
    const history = useHistory()

    toast.configure()
    localStorage.getItem('dataUserName')
   
    const notify = () => {
        swal(`Halo ${localStorage.getItem('dataUserName')}`, "Selamat Berbelanja!", "success");
    }

    const notifyErr = () => {

        toast.error('Gagal Login', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
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
    const submitLogin = () => {
        const data = {
            user_email: user_email,
            user_password: user_password
        }
        // console.log(data)
        axios.post(`${apiUserAccount}/users/signin`, data)
            .then(result => {
                console.log(result)
                if (result.data.users.accounts != null) {
                    // console.log(result)
                    let acco_id = result.data.users.accounts.acco_id
                    localStorage.setItem('dataAccountId', acco_id)
                    let acco_nama = result.data.users.accounts.acco_nama
                    localStorage.setItem('dataAccountName', acco_nama)
                    let acco_shopname = result.data.users.accounts.acco_shopname
                    localStorage.setItem('dataAccountShopName', acco_shopname)
                    let acco_birthdate = result.data.users.accounts.acco_birthdate
                    localStorage.setItem('dataAccountBirthdate', acco_birthdate)
                    let acco_phone = result.data.users.accounts.acco_phone
                    localStorage.setItem('dataAccountPhone', acco_phone)
                    let acco_gender = result.data.users.accounts.acco_gender
                    localStorage.setItem('dataAccountGender', acco_gender)
                    let acco_avatar = result.data.users.accounts.acco_avatar
                    localStorage.setItem('profilImage', acco_avatar)
                    localStorage.setItem('dataUserName', result.data.users.user_name)
                    localStorage.setItem('token', result.data.token)
                    // localStorage.setItem('dataUserPass', data.user_password)
                    localStorage.setItem('dataUserEmail', data.user_email)
                    localStorage.setItem('dataUserId', result.data.users.user_id)


                    const a = axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.token

                    const tokenParts = result.data.token.split('.')
                    const encodedPayload = tokenParts[1]
                    const rawPayload = atob(encodedPayload)
                    const hasiltoken = JSON.parse(rawPayload)
                    console.log(hasiltoken) // outputs 'bob'
                    console.log(result.data.token) // outputs 'bob'
                    // dispatch(fetchAdv()) // redux adv
                    // console.log(a)
                    // setRedirect(true)
                    history.push('/home')
                    notify()
                }
                else {
                    console.log(result)

                    localStorage.setItem('dataUserName', result.data.users.user_name)
                    localStorage.setItem('token', result.data.token)
                    // localStorage.setItem('dataUserPass', data.user_password)
                    localStorage.setItem('dataUserEmail', data.user_email)
                    localStorage.setItem('dataUserId', result.data.users.user_id)
                    const a = axios.defaults.headers.common['Authorization'] = 'Bearer ' + result.data.token
                    const tokenParts = result.data.token.split('.')
                    const encodedPayload = tokenParts[1]
                    const rawPayload = atob(encodedPayload)
                    const hasiltoken = JSON.parse(rawPayload)
                    console.log(hasiltoken) // outputs 'bob'
                    console.log(result.data.token) // outputs 'bob'
                    // console.log(a)
                    setRedirect(true)
                }

            })
            .catch(e => {

                setError(e.response.data.message)
            })



        // const config = {
        //     headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
        // };

        // const bodyParameters = {
        //    key: "value"
        // };

        // axios.post( 
        //   'http://192.168.100.35:3001/api/users',
        //   bodyParameters,
        //   config
        // ).then(console.log).catch(console.log);



    }

    
    const token = localStorage.getItem('token')
    // console.log(token)
    const a = axios.defaults.headers.common['Authorization'] = 'bearer ' + token
    console.log(a)
    if (token) {
        // alert("Tidak Bisa Akses Halaman Ini. Silakan Login Dulu!");
        if (localStorage.getItem('dataUserName')== 'Admin') {
            return <Redirect to="/admin" />
        } else {
            return <Redirect to="/home" />
        }
    }

    const handleKeypress = (event) => {
        if(event.key === 'Enter'){
          console.log('enter press here! ')
          submitLogin()
        }
      }


    return (
        <Fragment>
            {
                redirect && (
                    <Redirect to="/home" />
                )
            }
            <div>
                <div className="min-h-screen text-gray-800 antialiased px-4 py-6 flex flex-col justify-center sm:py-12">
                    <div className="relative py-3 sm:max-w-xl mx-auto text-center">
                        {
                            error && (
                                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                                    <p>{error}</p>
                                </div>
                            )
                        }
                        <span className="text-2xl font-light">Login to your account</span>
                        <div className="relative mt-4 bg-white shadow-md sm:rounded-lg text-left">
                            <div className="h-2 bg-pink-600 rounded-t-md"></div>
                            <div className="py-6 px-8">
                                <label className="block font-semibold">Email</label>
                                <input type="text" placeholder="Email" id="myInput" className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-pink-600 rounded-md" value={user_email} onChange={onChangeEmail} onKeyPress={handleKeypress}/>
                                <label className="block mt-3 font-semibold">Password</label>
                                <input type="password" placeholder="Password" id="myInput" className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-pink-600 rounded-md" value={user_password} onChange={onChangePassword} onKeyPress={handleKeypress}/>
                                <div className="flex justify-between items-baseline">
                                    <button className="mt-4 bg-pink-600 hover:bg-pink-500 text-white py-2 px-6 rounded-lg" id="myBtn" onClick={submitLogin}>Login</button>
                                    <a href="#" className="text-sm hover:underline">Forgot password?</a>
                                </div>
                            </div>
                        </div>
                        <div className="text-grey-dark mt-6">
                            don't have an account? &nbsp;
                    <a className="underline font-semibold text-pink-600" href="/daftar">
                                Sign Up
                    </a>.
            </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Login;
