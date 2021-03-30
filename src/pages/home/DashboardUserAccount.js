// import React, { Component } from 'react'
import React, { useEffect, useState, Component } from "react";

// import { Transition } from '@headlessui/react'
import Daftar from "../users/Daftar";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter,
  render,
} from "react-router-dom";

import Province from "../province/province";
import Users from "../users/users";

import Donut from "react-svg-donuts";
import City from "../city/city";
import Kecamatan from "../kecamatan/kecamatan";
import Kodepos from "../kodepos/kodepos";
import Profil from "../userAccount/profil";
import Account from "../userAccount/account";
import Upload from "../userAccount/upload";
import RegisterAccount from "../userAccount/registerAccount2";
import UbahPassword from "../users/ubahpassword";
// import Address fro../address/Addressess";

import Profil2 from "../userAccount/profil2";
import Address from "../address/address";
import MyWallet from "../payment/WalletAndBank";
import DashboardOrder from "../users/DashboardOrder";
const axios = require("axios");

// const progress = 50;

const DashboardUserAccount = () => {
  const token = localStorage.getItem("token");
  // console.log(token)

  const [isAccount, setisAccount] = useState(false);

  const [value, setValue] = useState();

  useEffect(() => {
    // console.log(isAccount)
    if (
      localStorage.dataAccountId == null ||
      localStorage.dataAccountId == undefined
    ) {
      setisAccount(false);
      setValue({});
    } else {
      setisAccount(true);
      setValue({});
    }
    setValue({});
  }, [localStorage.dataAccountId]);

  const [openTab, setOpenTab] = React.useState(1);

  const a = (axios.defaults.headers.common["Authorization"] =
    "bearer " + token);
  console.log(a);

  if (!token) {
    alert("Tidak Bisa Akses Halaman Ini. Silakan Login Dulu!");
    return <Redirect to="/login" />;
  }

  const renderProgress = (progress) => <strong>{progress}%</strong>;

  return (
    <>
      <div className="flex flex-wrap">
        {isAccount ? (
          <div className="w-full md:full-mt-16">
            <ul
              className="flex mb-0 list-none  flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-pink-600"
                      : "text-pink-600 bg-white border-2 border-pink-600")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#/profile"
                  role="tablist"
                >
                  Profil
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
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#/akun"
                  role="tablist"
                >
                  Dashboard
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
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#/akun"
                  role="tablist"
                >
                  Akun Saya
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
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                  data-toggle="tab"
                  href="#/alamat"
                  role="tablist"
                >
                  Alamat
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
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(5);
                  }}
                  data-toggle="tab"
                  href="#ubahpassword"
                  role="tablist"
                >
                  Ubah Password
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 6
                      ? "text-white bg-pink-600"
                      : "text-pink-600 bg-white border-2 border-pink-600")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(6);
                  }}
                  data-toggle="tab"
                  href="#mywallet"
                  role="tablist"
                >
                  My Wallet
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col box-border min-w-0 border-2 border-pink-600 break-words bg-white w-full mb-6 shadow-lg rounde">
              <div className="px-4 py-5 flex-auto ">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <div className="">
                      <Profil2 />
                    </div>
                  </div>
                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link1"
                  >
                    <div className="">
                      <DashboardOrder />
                    </div>
                  </div>

                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link2"
                  >
                    <div>
                      <RegisterAccount />
                    </div>
                  </div>
                  <div
                    className={openTab === 4 ? "block" : "hidden"}
                    id="link3"
                  >
                    <div>
                      <Address />
                    </div>
                  </div>
                  <div
                    className={openTab === 5 ? "block" : "hidden"}
                    id="link4"
                  >
                    <div>
                      <UbahPassword />
                    </div>
                  </div>
                  <div
                    className={openTab === 6 ? "block" : "hidden"}
                    id="link5"
                  >
                    <div>
                      <MyWallet />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full md:full-mt-16">
            <ul
              className="flex mb-0 list-none  flex-wrap pt-3 pb-4 flex-row"
              role="tablist"
            >
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 1
                      ? "text-white bg-gray-600"
                      : "text-pink-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(1);
                  }}
                  data-toggle="tab"
                  href="#/profile"
                  role="tablist"
                >
                  Profil
                </a>
              </li>

              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 2
                      ? "text-white bg-gray-600"
                      : "text-pink-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(2);
                  }}
                  data-toggle="tab"
                  href="#/akun"
                  role="tablist"
                >
                  Akun Saya
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 3
                      ? "text-white bg-gray-600"
                      : "text-pink-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(3);
                  }}
                  data-toggle="tab"
                  href="#/alamat"
                  role="tablist"
                >
                  Alamat
                </a>
              </li>
              <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
                <a
                  className={
                    "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                    (openTab === 4
                      ? "text-white bg-gray-600"
                      : "text-pink-600 bg-white")
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenTab(4);
                  }}
                  data-toggle="tab"
                  href="#ubahpassword"
                  role="tablist"
                >
                  Ubah Password
                </a>
              </li>
            </ul>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="px-4 py-5 flex-auto">
                <div className="tab-content tab-space">
                  <div
                    className={openTab === 1 ? "block" : "hidden"}
                    id="link1"
                  >
                    <div>
                      <Profil2 />
                    </div>
                  </div>

                  <div
                    className={openTab === 2 ? "block" : "hidden"}
                    id="link2"
                  >
                    <div>
                      <RegisterAccount />
                    </div>
                  </div>
                  <div
                    className={openTab === 3 ? "block" : "hidden"}
                    id="link3"
                  >
                    <div>
                      <Address />
                    </div>
                  </div>
                  <div
                    className={openTab === 4 ? "block" : "hidden"}
                    id="link4"
                  >
                    <div>
                      <UbahPassword />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardUserAccount;
