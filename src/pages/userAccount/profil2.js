import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import swal from 'sweetalert';

export default function Profil2({ fixed }) {

    const [isAccount, setisAccount] = useState(false)


    const [value, setValue] = useState();
    const refresh = () => {
        // re-renders the component
        setValue({});
    }



    useEffect(() => {
        // console.log(isAccount)
        if (localStorage.dataAccountId == null || localStorage.dataAccountId == undefined) {
            setisAccount(false);
            setValue({});

        }
        else {

            setisAccount(true);
            setValue({});
        }
        setValue({});
    }, [localStorage.dataAccountId])


    const fotoprofil = localStorage.getItem('profilImage')

    if (localStorage.getItem('DataAccountGender') == "L") {
        let jk = "Lelaki" 
    } else {
        let jk = "Perempuan"
    }

    const fotoprofilklik = () => {
        swal({
          title: 'Sweet!',
          icon: fotoprofil,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Profil Picture',
        })
      }


    return (


        <div>
            {isAccount ? (
                // <div className="grid grid-cols-6 relative p-6 flex-auto mb-2">
                //   <div className="col-span-6">
                //       <div className="text-white text-center bg-green-500 font-bold capitalize" >
                //       Foto Profil
                //       <center>
                //         <img src={fotoprofil === "null" || fotoprofil === null || fotoprofil === undefined || fotoprofil === ""  ? "defaultpic.png" : fotoprofil} alt="..." className="shadow rounded-full max-w-full h-40 align-middle border-2 border-pink-600" />
                //       </center>
                //       </div>
                //     <div className=" grid grid-cols-8 gap-4 my-2 content-center items-center justify-center place-content-center">
                //         <div></div>
                //         <h1 className="justify-self-end font-semibold">Username : </h1>
                //         <h1 className=" font-semibold">{localStorage.getItem('dataUserName')}</h1>
                //         <h1></h1>
                //         <h1></h1>
                //         <h1 className="justify-self-end font-semibold">Account Id : </h1>
                //         <h1 className=" font-semibold">{localStorage.getItem('dataAccountId')}</h1>
                //         <h1></h1>

                //     </div>
                //     <div className=" grid grid-cols-8 gap-4 my-2 content-center items-center justify-center place-content-center">
                //         <div></div>
                //         <h1 className="justify-self-end font-semibold">Email : </h1>
                //         <h1 className=" font-semibold">{localStorage.getItem('dataUserEmail')}</h1>
                //         <h1></h1>
                //         <h1></h1>
                //         <h1 className="justify-self-end font-semibold">Account Name : </h1>
                //         <h1 className=" font-semibold">{localStorage.getItem('dataAccountName')}</h1>
                //         <h1></h1>
                //     </div>
                //     <div className=" grid grid-cols-8 gap-4 my-2 content-center items-center justify-center place-content-center">
                //         <div></div>
                //         <h1> </h1>
                //         <h1></h1>
                //         <h1></h1>
                //         <h1></h1>
                //         <h1 className="justify-self-end font-semibold">Shop Name : </h1>
                //         <h1 className=" font-semibold">{localStorage.getItem('dataAccountShopName')}</h1>
                //         <h1></h1>
                //     </div>
                //     <div className=" grid grid-cols-8 gap-4 my-2 content-center items-center justify-center place-content-center">
                //         <div></div>
                //         <h1> </h1>
                //         <h1></h1>
                //         <h1></h1>
                //         <h1></h1>
                //         <h1 className="justify-self-end font-semibold">Birth Date : </h1>
                //         <h1 className=" font-semibold">{localStorage.getItem('dataAccountBirthdate')}</h1>
                //         <h1></h1>
                //     </div>
                //     <div className=" grid grid-cols-8 gap-4 my-2 content-center items-center justify-center place-content-center">
                //         <div></div>
                //         <h1> </h1>
                //         <h1></h1>
                //         <h1></h1>
                //         <h1></h1>
                //         <h1 className="justify-self-end font-semibold">Phone Number : </h1>
                //         <h1 className=" font-semibold">{localStorage.getItem('dataAccountPhone')}</h1>
                //         <h1></h1>
                //     </div>

                //   </div>

                // </div>
                <div className="grid grid-cols-8 gap-4">
                    <div className="col-start-1 col-span-8 align-center text-center font-bold ...">FOTO PROFIL</div>
                    <div className="col-span-8 align-center flex justify-center  items-center content-center align-items-center place-items-center align-self-center ml- text-center font-bold ..."><img src={fotoprofil === "null" || fotoprofil === null || fotoprofil === undefined || fotoprofil === ""  ? "defaultpic.png" : fotoprofil} alt="..." className="shadow rounded-full max-w-full h-40 align-middle border-2 border-pink-600 object-center" onClick={fotoprofilklik} style={{ cursor: 'pointer' }}/></div>
                    
                    <div class="col-start-2 col-end-4 col-span-2 flex justify-center font-semibold ...">
                        <div className="underline">DATA USER</div>
                    </div>

                    <div class="col-start-6 col-end-8 col-span-2 flex justify-center font-semibold ...">
                        <div className="underline">DATA ACCOUNT</div>
                    </div>

                    <div class="col-start-2 flex justify-between font-semibold ...">
                        <div>Username</div>
                        <div>: </div>
                    </div>
                    <div class="col-start-3 col-end-3 justify-self-start font-semibold ...">{localStorage.getItem('dataUserName')}</div>

                    

                    <div class="col-start-6 flex justify-between font-semibold ...">
                        <div>Account ID</div>
                        <div>: </div>
                    </div>
                    <div class="col-start-7  justify-self-start font-semibold ...">{localStorage.getItem('dataAccountId')}</div>


                    <div class="col-start-2 flex justify-between font-semibold ...">
                        <div>Email</div>
                        <div>: </div>
                    </div>
                    <div class="col-start-3 col-end-3 justify-self-start font-semibold ...">{localStorage.getItem('dataUserEmail')}</div>

                    <div class="col-start-6 flex justify-between font-semibold ...">
                        <div>Account Name</div>
                        <div>: </div>
                    </div>
                    <div class="col-start-7  col-span-2 justify-self-start font-semibold ...">{localStorage.getItem('dataAccountName')}</div>

                    
                    <div class="col-start-6 flex justify-between font-semibold ...">
                        <div>Shop Name</div>
                        <div>: </div>
                    </div>
                    <div class="col-start-7  justify-self-start font-semibold ...">{localStorage.getItem('dataAccountShopName')}</div>

                    
                    <div class="col-start-6 flex justify-between font-semibold ...">
                        <div>Gender</div>
                        <div>: </div>
                    </div>

                    {(localStorage.getItem('dataAccountGender')==="P")? (

                    <div class="col-start-7  justify-self-start font-semibold ...">Perempuan</div>


                    ): (

                    <div class="col-start-7  justify-self-start font-semibold ...">Lelaki</div>


                    )}
                    
                    
                    <div class="col-start-6 flex justify-between font-semibold ...">
                        <div>Birth Date</div>
                        <div>: </div>
                    </div>
                    <div class="col-start-7  justify-self-start font-semibold ...">{localStorage.getItem('dataAccountBirthdate')}</div>

                    
                    <div class="col-start-6 flex justify-between font-semibold ...">
                        <div>Phone Number</div>
                        <div>: </div>
                    </div>
                    <div class="col-start-7  justify-self-start font-semibold ...">{localStorage.getItem('dataAccountPhone')}</div>
                    
                </div>

            ) : (
                    <div className="capitalize text-center text-xl font-bold mt-6">
                        anda belum memiliki account <br></br>
                        silakan membuat account terlebih dahulu pada tab 'Akun Saya'

                    </div>
                )}


        </div>

    );
}
