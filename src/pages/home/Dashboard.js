import React, { useEffect } from 'react'

import { useState } from 'react'
// import { Transition } from '@headlessui/react'
import Daftar from '../users/Daftar'
import { Route, Switch, Redirect, BrowserRouter, render } from 'react-router-dom'

import Province from '../province/province'
import Users from '../users/users'
import City from '../city/city'
import Kecamatan from '../kecamatan/kecamatan'
import Kodepos from '../kodepos/kodepos'
import { apiProductTransaction } from '../../config/apiUrl'
const axios = require('axios');


const progress = 50;


const DashboardUsers = () => {
  const token = localStorage.getItem('token')

  const [isLogin, setisLogin] = useState(false)
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  const [loading, setLoading] = useState(false);
  const [Category, setCategory] = useState([]);
  const [Product, setProduct] = useState([]);
  // const token = localStorage.getItem('token')
  // console.log(token)

  const [openTab, setOpenTab] = React.useState(1);

  // const a = axios.defaults.headers.common['Authorization'] = 'bearer ' + token
  // console.log(a)


  // if (!token) {
  //   // alert("Tidak Bisa Akses Halaman Ini. Silakan Login Dulu!");
  //   return <Redirect to="/login" />
  // }
  // database product
  useEffect(() => {
    console.log(Product)
    setLoading(true);
    axios({
      url: `${apiProductTransaction}/product/`,
      method: "get",
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
  }, [])


  useEffect(() => {
    console.log(Category)
    setLoading(true);
    axios({
      url: `${apiProductTransaction}/category/`,
      method: "get",
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => setCategory(res.data))
      .catch((err) => console.error(err))
  }, [])

  const a = axios.defaults.headers.common['Authorization'] = 'bearer ' + token
  console.log(a)


  if (!token) {
    // alert("Tidak Bisa Akses Halaman Ini. Silakan Login Dulu!");
    return <Redirect to="/login" />
  }


  const renderProgress = progress => <strong>{progress}%</strong>;



  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-full md:full-mt-16 ">
          <ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-pink-600"
                    : "text-pink-600 bg-white border-2 border-pink-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#"
                role="tablist"
              >
                Dashboard
              </a>
            </li>



            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-pink-600"
                    : "text-pink-600 bg-white border-2 border-pink-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#/province"
                role="tablist"
              >
                Province
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-pink-600"
                    : "text-pink-600 bg-white border-2 border-pink-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#/city"
                role="tablist"
              >
                City
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 4
                    ? "text-white bg-pink-600"
                    : "text-pink-600 bg-white border-2 border-pink-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                Kecamatan
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 5
                    ? "text-white bg-pink-600"
                    : "text-pink-600 bg-white border-2 border-pink-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(5);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                Kodepos
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col box-border min-w-0 border-2 border-pink-600 break-words bg-pastel w-full mb-6 shadow-lg rounde">
            <div className="px-4 py-5 flex-auto">


              <div className="tab-content tab-space">


                <div className={openTab === 1 ? "block" : "hidden"} id="link1">

                  <div>
                    <Users />
                  </div>

                </div>


                <div className={openTab === 2 ? "block" : "hidden"} id="link1">

                  <div>
                    <Province />
                  </div>


                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link2">

                  <div>
                    <City />
                  </div>

                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link3">
                 

                  <div>
                    <Kecamatan />
                  </div>

                </div>
                <div className={openTab === 5 ? "block" : "hidden"} id="link4">
                  <Kodepos />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>




    </>



  )
}

export default DashboardUsers
