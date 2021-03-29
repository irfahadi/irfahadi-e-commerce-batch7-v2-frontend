import axios from "axios";
import react from "react";
import React, { useEffect, useState } from "react";
import { apiUserMaster, apiUserAccount } from "../../config/apiUrl";
import { useHistory } from "react-router";

// asda

const Address = () => {
  
  const [alamat, setAddress] = useState([]);
  const [showModal, setShowModal] = React.useState(false);
  const [provinsi, setProvinsi] = useState([]);
  const [kota, setKota] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [kodepos, setKodepos] = useState([]);
  const [zipCode, setZipCode] = useState("");
  const [jalan, setJalan] = useState("");
  const [optional, setOptional] = useState("");
  const [primary, setPrimary] = useState(true);
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  // const ProvId = localStorage.getItem("AddProvId")
  const [provId, setProvId] = useState(0);
  const [cityId, setCityId] = useState(0);
  const [kecId, setKecId] = useState(0);
  const [error, setError] = useState("");
  const apiAccoId = localStorage.getItem('dataAccountId');
  const lengthAlamat = alamat.length;
  const [input, setInput] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [Isedit, setIsEdit] = useState(false)
  let history = useHistory();

  const GetAlamat = async () => {
    const response = await axios.get(`${apiUserAccount}/address/search/${apiAccoId}`);
    return response.data;
  };

  const GetProvinsi = async () => {
    const response = await axios.get(`${apiUserAccount}/province`);
    return response.data;
  };

  useEffect(() => {
    const getListProvinsi = async () => {
      const listProvinsi = await GetProvinsi();
      if (listProvinsi) setProvinsi(listProvinsi);
    };
    getListProvinsi();
  }, []);

  let GetKota = async (Prov_Id) => {
    const response = await axios.get(`${apiUserAccount}/city/search/${Prov_Id}`);
    return response.data;
  };

  useEffect(() => {
    const getListKota = async () => {
      const listKota = await GetKota(provId);
     setKota(listKota);
    };
    getListKota();
  }, [provId]);

  let OnChangeProvince = (e) => {
    let value = e.target.options[e.target.selectedIndex].value;
    // localStorage.setItem('AddProvId',value)
    setProvId(value)
     console.log(value);
   };

   useEffect(() => {
     
     const getListAlamat = async () => {
        let listAlamat = await GetAlamat();
        console.log(listAlamat);
        if (listAlamat) setAddress(listAlamat);
        // setProvinsi(listAlamat)
        setInput(false);
        setHapus(false);
        if (listAlamat.length > 0) {
         setPrimary(false)
       } else {
         setPrimary(true)
       }
      };
      getListAlamat();
   }, [input,hapus]);
 
  //  console.log(alamat);
  //  console.log(provinsi);

   let GetKecamatan = async (City_Id) => {
    const response = await axios.get(`${apiUserAccount}/kecamatan/search/${City_Id}`);
    return response.data;
  };

  useEffect(() => {
    const getListKecamatan = async () => {
      const listKecamatan = await GetKecamatan(cityId);
     setKecamatan(listKecamatan);
    };
    getListKecamatan();
  }, [cityId]);

  let onChangeCity = (e) => {
    let value = e.target.options[e.target.selectedIndex].value;
    // localStorage.setItem('AddProvId',value)
    setCityId(value)
     console.log(value);
   };

   let GetKodepos = async (Kec_Id) => {
    const response = await axios.get(`${apiUserAccount}/kodepos/search/${Kec_Id}`);
    return response.data;
  };

  useEffect(() => {
    const getListKodepos = async () => {
      const listKodepos = await GetKodepos(kecId);
     setKodepos(listKodepos);
    };
    getListKodepos();
  }, [kecId]);

  let onChangeKecamatan = (e) => {
    let value = e.target.options[e.target.selectedIndex].value;
    // localStorage.setItem('AddProvId',value)
    setKecId(value)
     console.log(value);
   };

   let onChangeKodepos = (e) => {
    let value = e.target.options[e.target.selectedIndex].value;
    // localStorage.setItem('AddProvId',value)
    setZipCode(value)
     console.log(value);
   };

   const onChangeJalan = (e) => {
    const value = e.target.value;
    setJalan(value);
    setError("");
  };

  const onChangeOptional = (e) => {
    const value = e.target.value;
    setOptional(value);
    setError("");
  };

   

   const onClose = () => {
    setShowModal(false);
    
    setKota([]);
    setKecamatan([]);
    setKodepos([]);
   }



   const inputAddress = async () => {
    setShowModal(false);
    setInput(true)
    
    const data = {
    addr_address: jalan,
    addr_optional: optional,
    addr_is_primary: primary,
    addr_langitude: null,
    addr_latitude: null,
    addr_kodepos: zipCode,
    addr_accu_id: apiAccoId,
    }

    return await axios
    .post(`${apiUserAccount}/address`, data)
      .then(async (result) => {
        if (result) {
          console.log(result.data);
          if (result.data) {
            setJalan("");
            setOptional("");
            setShowModal(false)
            return await GetAlamat();
          }
        }
      })
      .catch((e) => {
        setError(e.response.data.message);
      });
    // ({
    //   data: data,
    //   url: `${apiUserAccount}/address`,
    //   method: "post"
    // })
    // .then((result)=>
    //   if (result) {
    //         console.log(result.data);
    //         if (result.data) {
    //           setShowModal(false)
    //           await GetAlamat();
             
    //         }
    //       }
          
    // )
      

   }

   const deleteAddress = async (id) => {
     setHapus(true);
    console.log(id);
    const response = await axios.delete(`${apiUserAccount}/address/${id}`);
    return response.data;
  };

  const editAddress = async (id) => {
    setIsEdit(true)
    history.push("/editAddress");
    localStorage.setItem("Addressid", id);
  }

  // useEffect(() => {
  //   const getListKota = async () => {
  //     const listKota = await GetKota();
  //     if (listKota) setKota(listKota);
  //   };
  //   getListKota();
  // }, []);

    // useEffect(() => {
    //   OnChangeProvince(value);
    // }, [value]);


  

  return (
    <>
      {alamat[0] ? (
        <>
          <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded bg-purple-100">
              <div class="rounded-t mb-0 px-4 py-3 border-0 bg-gray-500">
                <div class="flex flex-wrap items-center">
                  <div class="relative w-full px-4 max-w-full flex-grow flex-1 ">
                    <h3 class="font-semibold text-xl text-gray-50">
                      Alamat Saya
                    </h3>
                  </div>
                  <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-6 bg-gray-200 text-black align-middle border border-solid border-gray-800 hover:bg-green-200 hover:text-green-800 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                      type="button"
                    >
                      Tambah Alamat
                    </button>
                  </div>
                </div>
              </div>
               { alamat.map ((x,index) =>{
                 return (
                   <>
              <div className="grid grid-cols-6 relative p-6 flex-auto mb-2">
                  <div className="col-span-5">
                      <div className=" grid grid-cols-4 gap-4 my-2 content-center items-center justify-center place-content-center">
                          <h1 className="justify-self-end">Nama Kamu/Toko : </h1>
                          <h1 className="capitalize font-bold">{x.acco_nama}</h1>
                      </div>
                      <div className=" grid grid-cols-4 gap-4 my-2 content-center items-center justify-center place-content-center">
                          <h1 className="justify-self-end">Telepon : </h1>
                          <h1>{x.acco_phone}</h1>
                      </div>
                      <div className=" grid grid-cols-4 gap-4 my-2 justify-center place-content-center">
                          <h1 className="justify-self-end">Alamat : </h1>
                          <h1 className="capitalize">
                            {x.addr_address}<br></br>
                            {x.addr_optional}<br></br>
                            {x.city_name} - {x.kec_name}
                            <br />
                            {x.prov_name}
                            <br />
                            {x.kodepos}
                          </h1>
                      </div>
                  </div>

                  <div className="col-span-1 my-4">
                    <button className="mx-4 underline">Edit</button>
                    <button className="mx-4 underline" onClick={() => {
                                if (
                                  window.confirm(
                                    "apakah anda yakin ingin menghapus alamat ini?"
                                  )
                                ) {
                                  deleteAddress(x.addr_id);
                                }
                              }}>
                      Hapus
                    </button>
                    
                    <button className="text-black bg-green-500 border border-solid border-gray-300 mt-1 hover:bg-green-800 hover:text-white active:bg-gray-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                      Atur Sebagai Utama
                    </button>
                  </div>
              </div>
              <hr className="bg-gray-500 border-2"></hr>
                   </>
                 )
                })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div class="w-full mb-12 xl:mb-0 px-4">
            <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded bg-gray-400">
              <div class="rounded-t mb-0 px-4 py-3 border-0">
                <div class="flex flex-wrap items-center">
                  <div class="relative w-full px-4 max-w-full flex-grow flex-1 ">
                    <h3 class="font-semibold text-xl">
                      Alamat Saya
                    </h3>
                  </div>
                  <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-6 bg-gray-700 text-gray-50 align-middle border border-solid border-gray-800 hover:bg-gray-200 hover:text-gray-800 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left"
                      type="button"
                    >
                      Tambah Alamat
                    </button>
                  </div>
                </div>
              </div>
              <div className="relative p-6 flex-auto">
                <label>Tidak ada Alamat </label>
                
              </div>
            </div>
          </div>
        </>
      )}

      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                  <h3 className="text-xl font-semibold">Tambah Alamat</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className=" grid grid-cols-6 gap-4 my-4 content-center items-center justify-center place-content-center">
                    <h1 className="justify-self-end">Provinsi : </h1>
                    <select
                      name="province"
                      id="province"
                      className="col-span-4 flex-1 capitalize border border-gray-300 py-2 px-2 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 mb-2"
                      
                      onChange={OnChangeProvince} 
                    >
                      <option>Silahkan Pilih Provinsi</option>
                      {provinsi.map((e,index) => {
                        return <option value={e.prov_id} key={index} >{e.prov_name}</option>;
                      })}
                    </select>
                  </div>
                  <div className=" grid grid-cols-6 gap-4 my-4 content-center items-center justify-center place-content-center">
                    <h1 className="justify-self-end">Kota : </h1>
                    <select
                      name="kota"
                      id="kota"
                      className="col-span-4 flex-1 capitalize border border-gray-300 py-2 px-2 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 mb-2"
                      
                      onChange={onChangeCity} 
                    >
                      <option>Silahkan Pilih Kota</option>
                      { kota ? (
                        kota.map((e,index) => {
                        return <option value={e.city_id} key={index} >{e.city_name}</option>;
                      })
                      ):
                      (
                        <option>Select</option>
                      )
                    }
                      
                    </select>
                  </div>

                  <div className=" grid grid-cols-6 gap-4 my-4 content-center items-center justify-center place-content-center">
                    <h1 className="justify-self-end">Kecamatan : </h1>
                    <select
                      name="kecamatan"
                      id="kecamatan"
                      className="col-span-4 flex-1 capitalize border border-gray-300 py-2 px-2 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 mb-2"
                      
                      onChange={onChangeKecamatan} 
                    >
                      <option>Silahkan Pilih Kecamatan</option>
                      { kecamatan ? (
                        kecamatan.map((e,index) => {
                        return <option value={e.kec_id} key={index} >{e.kec_name}</option>;
                      })
                      ):
                      (
                        <option>Select</option>
                      )
                    }
                      
                    </select>
                  </div>

                  <div className=" grid grid-cols-6 gap-4 my-4 content-center items-center justify-center place-content-center">
                    <h1 className="justify-self-end">Kodepos : </h1>
                    <select
                      name="kodepos"
                      id="kodepos"
                      className="col-span-4 flex-1 capitalize border border-gray-300 py-2 px-2 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 mb-2"
                  
                      onChange={onChangeKodepos} 
                    >
                      <option>Silahkan Pilih Kodepos</option>
                      { kodepos ? (
                        kodepos.map((e,index) => {
                        return <option value={e.kodepos} key={index} >{e.kodepos}</option>;
                      })
                      ):
                      (
                        <option>Select</option>
                      )
                    }
                      
                    </select>
                  </div>

                  <div class=" grid grid-cols-6 gap-4 my-4 content-center items-center justify-center place-content-center">
              <h1 className="justify-self-end">Alamat : </h1>

              <textarea
                type="text"
                id="jalan"
                class="col-span-4 flex-1 resize-y capitalize border border-gray-300 py-2 px-2 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 mb-2"
                placeholder="Mohon masukkan Alamat"
                value={jalan}
                onChange={onChangeJalan}
              />
            </div>

            <div class=" grid grid-cols-6 gap-4 my-4 content-center items-center justify-center place-content-center">
              <h1 className="justify-self-end">Rincian : </h1>

              <textarea
                type="text"
                id="optional"
                class="col-span-4 flex-1 resize-y capitalize border border-gray-300 py-2 px-2 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 mb-2"
                placeholder="Rincian Tambahan Alamat (Optional)"
                value={optional}
                onChange={onChangeOptional}
              />
            </div>

                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                  <button
                    className="text-gray-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={onClose}
                  >
                    Close
                  </button>
                  <button
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    style={{ transition: "all .15s ease" }}
                    onClick={inputAddress}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Address;
