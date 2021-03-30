import axios from "axios";
import React, { useEffect, useState } from "react";
import Upload from "./upload";
import { apiUserMaster, apiUserAccount } from "../../config/apiUrl";

export default function RegisterAccount() {
  const userName = localStorage.getItem("dataUserName");
  console.log(userName);
  const user_id = localStorage.getItem("dataUserId");
  const acco_id = localStorage.getItem("dataAccountId")
  const jk = localStorage.getItem("dataAccountGender")

  const [value, setValue] = useState();
  const [isAccount, setisAccount] = useState(false);
  const [username, setUsername] = useState("");
  const [nama, setNama] = useState("");
  const [phone, setPhone] = useState("");
  const [shopName, setShopName] = useState("");
  const [gender, setGender] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");
  const [alert, setAlert] = useState("");
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [isImage, setisImage] = useState(false);


  const refresh = () => {
    // re-renders the component
    setValue({});
  };


  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'andri2621')
    setLoading(true)
    const res = await fetch(
      '	https://api.cloudinary.com/v1_1/codeid/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()

    setImage(file.secure_url)
    setLoading(false)
  }


  console.log(image)


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
      setNama(localStorage.getItem("dataUserName"))
      setPhone(localStorage.getItem("dataAccountPhone"))
      setShopName(localStorage.getItem("dataAccountShopName"))
      setNama(localStorage.getItem("dataAccountName"))
      setBirthdate(localStorage.getItem("dataAccountBirthdate"))
      setValue({});
    }
    setValue({});
  }, [localStorage.dataAccountId]);

  // ===== cek image =========
  useEffect(() => {
  if (
    localStorage.profilImage == null ||
    localStorage.profilImage == undefined
  ) {
    setisImage(false);
    setValue({});
  } else {
    setisImage(true);
    setValue({});
  }
  setValue({});
}, [localStorage.profilImage]);


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
    console.log(e)
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
      acco_avatar: image,
      acco_user_id: user_id,
    };

    axios
      .post(`${apiUserAccount}/account`, data)
      .then((result) => {
        if (result) {
          console.log(result.data);
          if (result.data) {
            // setUsername("");
            // setNama("");
            // setPhone("");
            // setShopName("");
            // setGender("");
            // setBirthdate("");
            console.log(result)
            setAlert(result.data.message);
            setTimeout(() => {
              setAlert("");
              localStorage.setItem("dataAccountId", result.data.data.acco_id);
              localStorage.setItem(
                "dataAccountShopName",
                result.data.data.acco_shopname
              );
              console.log(result.data)
              localStorage.setItem("dataAccountPhone", result.data.data.acco_phone);
              localStorage.setItem("dataAccountBirthdate", result.data.data.acco_birthdate);
              localStorage.setItem("dataAccountGender", result.data.data.acco_gender);
              localStorage.setItem("dataAccountName", result.data.data.acco_nama);
              localStorage.setItem('profilImage', image)
            }, 2500);
          }
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };

  // ======== EDIT ACCOUNT ==========


  const editAccount = () => {
    

    const data = {
      
      acco_username: userName,
      acco_nama: nama,
      acco_phone: phone,
      acco_shopname: shopName,
      acco_gender: gender? (gender):(jk),
      acco_birthdate: birthdate,
      acco_avatar: image,
      acco_user_id: user_id,

    };

    axios
      .put(`${apiUserAccount}/account/${localStorage.getItem('dataAccountId')}`, data)
      .then((result) => {
        if (result) {
          console.log(result.data);
          if (result.data) {
            // setUsername("");
            // setNama("");
            // setPhone("");
            // setShopName("");
            // setGender("");
            // setBirthdate("");
            console.log(result)
            setAlert(result.data.message);
            setTimeout(() => {
              setAlert("Akun Sudah di Update");
              const dataAccount = JSON.parse(result.config.data)
              console.log(dataAccount)
              localStorage.setItem("dataAccountShopName",dataAccount.acco_shopname);
              localStorage.setItem("dataAccountPhone", dataAccount.acco_phone);
              localStorage.setItem("dataAccountBirthdate", dataAccount.acco_birthdate);
              localStorage.setItem("dataAccountShopName", dataAccount.acco_shopname);
              localStorage.setItem("dataAccountGender", dataAccount.acco_gender);
              localStorage.setItem("dataAccountName", dataAccount.acco_nama);

              localStorage.setItem('profilImage', image)
            }, 2500);
          }
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
  };
  // ======== AKHIR EDIT ACCOUNT ==========

  return (
    <>
      <div className="relative py-1 sm:max-w-xl mx-auto text-center">
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}
        {/* {alert && (
          <div
            className="bg-pink-600 border-l-4 border-pink-800 text-white p-4"
            role="alert"
          >
            <p>{alert}</p>
          </div>
        )} */}
      </div>
      <div>
        <div className="mx-12">
          <h1 className="font-bold text-xl">Profil Saya</h1>
          <p>
            Kelola informasi profil Anda untuk mengontrol, melindungi dan
            mengamankan akun
          </p>
          <hr className="my-4"></hr>
          {/* {alert && (
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              role="alert"
            >
              <p>{alert}</p>
            </div>
          )} */}

          { isAccount? (
            <div>
          <div className=" flex-wrap">
            <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
              <h1 className="justify-self-end">Username : </h1>
              <h1>{localStorage.getItem("dataUserName")}</h1>
            </div>
            <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
              <h1 className="justify-self-end">Nama : </h1>

              <input
                type="text"
                id="nama"
                className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                placeholder={localStorage.getItem("dataAccountName")}
                value={nama}
                onChange={onChangeNama}
              />
            </div>
            <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
              <h1 className="justify-self-end">Email : </h1>
              <h1>{localStorage.getItem("dataUserEmail")}</h1>
            </div>
            <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
              <h1 className="justify-self-end">Nomor Telepon : </h1>
              <input
                type="text"
                id="notlp"
                className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                placeholder={localStorage.getItem("dataAccountPhone")}
                value={phone}
                onChange={onChangePhone}
              />
            </div>
            <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
              <h1 className="justify-self-end">Nama Toko : </h1>
              <input
                type="text"
                id="namaToko"
                className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                placeholder={localStorage.getItem("dataAccountShopName")}
                value={shopName}
                onChange={onChangeShopName}
              />
            </div>

            <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
              <label htmlFor="gender" className=" justify-self-end">
                Jenis Kelamin :
              </label>


              { localStorage.getItem("dataAccountGender") == "L" ? (
// ======= apakah cowo?

              <span className="col-span-2">
                <input
                  type="radio"
                  id="laki"
                  name="gender"
                  value="L"
                  onClick={onChangeGender}
                checked/>
                <label className="mr-10" htmlFor="male">
                  {" "}
                  Lelaki
                </label>
                <input
                  type="radio"
                  id="perempuan"
                  name="gender"
                  value="P"
                  onClick={onChangeGender}
                />
                <label htmlFor="female"> Perempuan </label>
              </span>


          ) : (


          <span className="col-span-2">
          <input
            type="radio"
            id="laki"
            name="gender"
            value="L"
            onClick={onChangeGender}
          />
          <label className="mr-10" htmlFor="male">
            {" "}
            Lelaki
          </label>
          <input
            type="radio"
            id="perempuan"
            name="gender"
            value="P"
            onClick={onChangeGender}
            checked/>
          <label htmlFor="female"> Perempuan </label>
        </span>) 
        
        }


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
                onChange={onChangeBirthdate}
              />
            </div>
          </div>
          <div className="flex justify-center items-baseline">
            {/* <Upload /> */}



            <h1>Upload Image</h1>
            <input
              type="file"
              name="file"
              // value=
              placeholder="upload an image"
              onChange={uploadImage}
            />
             
        

            {loading ? (
              <h3>Loading...</h3>
              ) : (
                 <img src={image} style={{ width: '300px' }} />
              )}
             



          </div> 
          
          </div>


          ):( 

            
          // KALAU bBELUm PUNYA AKUN===============================
          <div>
            <div className=" flex-wrap">
              <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                <h1 className="justify-self-end">Username : </h1>
                <h1>{localStorage.getItem("dataUserName")}</h1>
              </div>
              <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                <h1 className="justify-self-end">Nama : </h1>
  
                <input
                  type="text"
                  id="nama"
                  className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                  placeholder="Mohon masukkan"
                  value={nama}
                  onChange={onChangeNama}
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                <h1 className="justify-self-end">Email : </h1>
                <h1>{localStorage.getItem("dataUserEmail")}</h1>
              </div>
              <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                <h1 className="justify-self-end">Nomor Telepon : </h1>
                <input
                  type="text"
                  id="notlp"
                  className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                  placeholder="Mohon masukkan"
                  value={phone}
                  onChange={onChangePhone}
                />
              </div>
              <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                <h1 className="justify-self-end">Nama Toko : </h1>
                <input
                  type="text"
                  id="namaToko"
                  className="col-span-2 flex-1 appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                  placeholder="Mohon masukkan"
                  value={shopName}
                  onChange={onChangeShopName}
                />
              </div>
  
              <div className=" grid grid-cols-4 gap-4 my-4 content-center items-center justify-center place-content-center">
                <label htmlFor="gender" className=" justify-self-end">
                  Jenis Kelamin :
                </label>
                <span className="col-span-2">
                  <input
                    type="radio"
                    id="laki"
                    name="gender"
                    value="L"
                    onClick={onChangeGender}
                  />
                  <label className="mr-10" htmlFor="male">
                    {" "}
                    Lelaki
                  </label>
                  <input
                    type="radio"
                    id="perempuan"
                    name="gender"
                    value="P"
                    onClick={onChangeGender}
                  />
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
                  onChange={onChangeBirthdate}
                />
              </div>
            </div>
            <div className="flex justify-center items-baseline">
              {/* <Upload /> */}
  
  
  
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
                  <img src={image} style={{ width: '300px' }} />
                )}
  
  
  
            </div> 
            
            </div>) }
        </div>
        <>
        <div className="flex justify-center items-baseline">
          {isAccount ? (
            
            
            <button
              className="mt-4 bg-pink-500 hover:bg-pink-400 text-white py-2 px-6 rounded-lg flex justify-center items-baseline"
              values="daftarAccount"
              onClick={editAccount}
            >
              Update Account
            </button>
          ) : (
              <button
                className="mt-4 bg-pink-500 hover:bg-pink-400 text-white py-2 px-6 rounded-lg flex justify-center items-baseline"
                values="daftarAccount"
                onClick={daftarAccount}
              >
                Create Account
              </button>

            )}

        </div>
        </>
        <div className="relative py-1 sm:max-w-xl mx-auto text-center">

        
        </div>
        </div>
    </>
  );
}