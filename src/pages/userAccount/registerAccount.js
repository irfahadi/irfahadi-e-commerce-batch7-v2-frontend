import axios from "axios";
import React, { useEffect, useState } from "react";
import Upload from "./upload";
import { apiUserMaster, apiUserAccount } from "../../config/apiUrl";

export default function RegisterAccount() {
  const userName = localStorage.getItem("dataUserName");
  console.log(userName);
  const user_id = localStorage.getItem("dataUserId");
  const [value, setValue] = useState();
  const [isAccount, setisAccount] = useState(false)
  const [username, setUsername] = useState('');
  const [nama, setNama] = useState('');
  const [phone, setPhone] = useState('');
  const [shopName, setShopName] = useState('');
  const [gender, setGender] = useState('');
  const[birthdate, setBirthdate] = useState('');

  const[error, setError] = useState('');
  const[alert, setAlert] = useState('');
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)


  const refresh = () => {
    // re-renders the component
    setValue({});
  };

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

  const onChangeUsername = (e) => {
    const value = e.target.value;
    setUsername(value);
    setError("");
  };

  const onChangeNama = (e) => {
    const value = e.target.value;
    setNama(value);
    setError("");
  };

  const onChangePhone = (e) => {
    const value = e.target.value;
    setPhone(value);
    setError("");
  };

  const onChangeShopName = (e) => {
    const value = e.target.value;
    setShopName(value);
    setError("");
  };

  const onChangeGender = (e) => {
    const value = e.target.value;
    setGender(value);
    setError("");
  };

  const onChangeBirthdate = (e) => {
    const value = e.target.value;
    setBirthdate(value);
    setError("");
  };

  const daftarAccount = () => {
    const data = {
      acco_username: userName,
      acco_nama: nama,
      acco_phone: phone,
      acco_shopname: shopName,
      acco_gender: gender,
      acco_birthdate: birthdate,
      acco_avatar: null,
      acco_user_id: user_id,
    };

    axios
      .post(`${apiUserAccount}/account`, data)
      .then((result) => {
        if (result) {
          console.log(result.data);
          if (result.data) {
            console.log(result.data)
            localStorage.setItem("dataAccountId", result.data.data.acco_id);
            localStorage.setItem("dataAccountShopName",result.data.data.acco_shopname);
            localStorage.setItem("dataAccountPhone", result.data.data.acco_phone);
            localStorage.setItem("dataAccountBirthdate",result.data.data.acco_birthdate);
            setUsername("");
            setNama("");
            setPhone("");
            setShopName("");
            setGender("");
            setBirthdate("");
            setAlert(result.data.message);
            setTimeout(() => {
              setAlert("");
            }, 2500);
          }
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

return (
    <>
                <div className="relative py-1 sm:max-w-xl mx-auto text-center">
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
</div>
<div>
            <div className="mx-12">
                <h1 className="font-bold text-xl">Profil Saya</h1>
                <p>Kelola informasi profil Anda untuk mengontrol, melindungi dan mengamankan akun</p>
                <hr className="my-4"></hr>
                <div className="grid grid-cols-6 relative p-6 flex-auto mb-2 ">
                  <div className="col-span-5">
                    <div className=" grid grid-cols-4 gap-4 my-2 content-center items-center justify-center place-content-center">
                        <h1 className="justify-self-end">Username : </h1>
                        <h1>{localStorage.getItem('dataUserName')}</h1>
                    </div>
                    <div className=" grid grid-cols-4 gap-4 my-4 c">
                        <h1 className="justify-self-end">Nama : </h1>
    
                        <input type="text" id="nama" className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2" placeholder="Mohon masukkan" value={nama}
                        onChange={onChangeNama}/>
    
                    </div>
                    <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                        <h1 className="justify-self-end">Email : </h1>
                        <h1>{localStorage.getItem('dataUserEmail')}</h1>
                    </div>
                    <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                        <h1 className="justify-self-end">Nomor Telepon : </h1>
                        <input type="text" id="notlp" className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2" placeholder={localStorage.getItem('dataAccountPhone')} value={phone}
                        onChange={onChangePhone}/>
                        
                    </div>
                    <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                        <h1 className="justify-self-end">Nama Toko : </h1>
                        <input type="text" id="namaToko" className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2" placeholder="Mohon masukkan"  value={shopName}
                        onChange={onChangeShopName}/>
                    </div>
                  
                    <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                        <label
                            htmlFor="gender"
                            className=" justify-self-end">
                            Jenis Kelamin :
                        </label>
                        <span className="col-span-2">
                            <input type="radio" id="laki" name="gender" value="L" {...(`${gender}=="L"`) ?(`checked`):(`checked`)} onClick={onChangeGender}/>
                            <label className="mr-10" htmlFor="male"> Lelaki</label>
                            <input type="radio" id="perempuan" name="gender" value="P" {...(`${gender}=="P"`)?`checked`:("")} onClick={onChangeGender}/>
                            <label htmlFor="female"> Perempuan </label>
                        </span>
                    </div>
                    <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                        
                      <label htmlFor="birthdate" className=" justify-self-end">
                        Tanggal Lahir
                      </label>
                      <input
                      type="date"
                      placeholder="Tanggal lahir"
                      className=" border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-1 focus:ring-indigo-600 rounded-md"
                      value={birthdate}
                      onChange={onChangeBirthdate}/>
                    </div>
                    </div>
                <div className="flex justify-center items-baseline col-span-1 my-4 -mx-40">
                  {/* <Upload  /> */}





                  <h1>Upload Image</h1>
                  <input
                    type="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                  />
                  {loading ? (
                    <h3>Loading...</h3>
                  ) : (
                    <div>
                    <img src={image} style={{ width: '300px' }} />
                    </div>
                  )}





                  



                </div>
              </div>
            </div>
            <div className="flex justify-center items-baseline">
              { isAccount ? (
            <button
              className="mt-4 bg-pink-500 text-white py-2 px-6 rounded-lg flex justify-center items-baseline"
              values="daftarAccount"
              // onClick={updateAccount}
            >
              Update Account
            </button>
            ):(
              <button
              className="mt-4 bg-pink-500 text-white py-2 px-6 rounded-lg flex justify-center items-baseline"
              values="daftarAccount"
              onClick={daftarAccount}
            >
              Create Account
            </button>
            )
              }
          </div>
          </div>
    </>
  );
}
