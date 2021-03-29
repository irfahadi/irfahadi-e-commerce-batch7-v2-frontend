import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUserMaster } from "../../config/apiUrl";
const UbahPassword = (props) => {
  const [email, setEmail] = useState("");
  const [currPassword, setCurrPassword] = useState("");
  const [errorCurrPassword, setErrorCurrPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");
  const [error, setError] = useState("");
  let [valid, setValid] = useState(null);
  const changeCurrPassword = (e) => {
    const value = e.target.value;
    setCurrPassword(value);
    setError("");
    if (!value) {
      setErrorCurrPassword("tidak boleh kosong");
    } else {
      setErrorCurrPassword("");
    }
  };
  const changePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
    if (!value) {
      setErrorPassword("password tidak boleh kosong");
    } else {
      setErrorPassword("");
    }
  };
  const changeConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setError("");
    if (!value) {
      setErrorConfirmPassword("confirm password tidak boleh kosong");
    } else if (password !== value) {
      setErrorConfirmPassword("password tidak cocok");
    } else {
      setErrorConfirmPassword("");
    }
  };
  const simpan = () => {
    const data = {
      user_password: currPassword,
      newpassword: password,
      user_email: localStorage.getItem("dataUserEmail"),
    };
    console.log(data);
    axios
      .post(`${apiUserMaster}/users/ubahpassword`, data)
      .then((res) => {
        if (res) {
          setPassword("");
          setConfirmPassword("");
          setCurrPassword("");
          setAlert("password berhasil diganti");
          setTimeout(() => {
            setAlert("");
          }, 2500);
        }
      })
      .catch((e) => {
        console.log(e.response.data.message);
        setError(e.response.data.message);
      });
  };
  useEffect(() => {
    setValid(password === confirmPassword);
  }, [password, confirmPassword]);
  return (
    <div>
      <div className="mx-12">
        <h1 className="font-bold text-xl">Ubah Password</h1>
        <p>
          Untuk keamanan akun Anda, mohon untuk tidak menyebarkan password Anda
          ke orang lain.
        </p>
        <hr className="my-4"></hr>
        <div className=" flex-wrap">
          <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
            <span></span>
            {error && (
              <div
                className="bg-red-100 border-l-4 content-center items-center text-center border-blue-500 col-span-2 text-red-700 p-4"
                role="alert"
              >
                <p>{error}</p>
              </div>
            )}
            {alert && (
              <div
                className="bg-blue-100 border-l-4 content-center items-center text-center border-blue-500 col-span-2 text-blue-700 p-4"
                role="alert"
              >
                <p>{alert}</p>
              </div>
            )}
            <h1 hidden className="justify-self-end">
              Email :{" "}
            </h1>
            <h1 hidden value={email}>
              {localStorage.getItem("dataUserEmail")}
            </h1>
          </div>
          <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
            <h1 className="justify-self-end">Password Saat Ini : </h1>
            <input
              type="password"
              id="currPassword"
              className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
              placeholder="Mohon masukkan password lama"
              value={currPassword}
              onChange={changeCurrPassword}
            />
            {errorCurrPassword && (
              <p className="text-red-600">{errorCurrPassword}</p>
            )}
          </div>
          <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
            <h1 className="justify-self-end">Password Yang Baru : </h1>
            <input
              type="password"
              id="newPassword"
              className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
              placeholder="Mohon masukkan password baru"
              value={password}
              onChange={changePassword}
            />
            {errorPassword && <p className="text-red-600">{errorPassword}</p>}
          </div>
          <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
            <h1 className="justify-self-end">Konfirmasi Password : </h1>
            <input
              type="password"
              id="confPassword"
              className={
                valid === false
                  ? "col-span-2 flex-1 appearance-none border border-red-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-red-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent mb-2"
                  : "col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
              }
              placeholder="Mohon konfirmasi password baru"
              value={confirmPassword}
              onChange={changeConfirmPassword}
            />
            {errorConfirmPassword && (
              <p className="text-red-600">{errorConfirmPassword}</p>
            )}
          </div>
          <div className="flex justify-center items-baseline">
            <button
              className="mt-4 bg-white text-pink-600 hover:bg-pink-600 hover:text-white border-2 border-pink-600 py-2 px-6 rounded-lg flex justify-center items-baseline"
              values="daftarAccount"
              onClick={simpan}
            >
              Ubah Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UbahPassword;
