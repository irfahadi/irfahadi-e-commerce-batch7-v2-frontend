import axios from "axios";
import React from "react";
import { useEffect, useState } from "react"
import { Redirect, useHistory } from "react-router";
import Pembelianku from "./Pembelianku";
import Penjualanku from "./Penjualanku";


export default function DashboardOrder() {

    const [selectedNav, setSelectedNav] = useState('Penjualanku')
    const [showPenjualanku, setShowPenjualanku] = useState()
    const [showPembelianku, setShowPembelianku] = useState()

    useEffect(() => {
        switch (selectedNav) {
            case "Penjualanku":
                setShowPembelianku(false)
                setShowPenjualanku(true)
                break;
            case "Pembelianku":
                setShowPenjualanku(false)
                setShowPembelianku(true)
                break;
            default:
                break;
        }
    }, [selectedNav])

    const onHandleClick = (e) => {
        setSelectedNav(e.target.value)
    }




  // let history = useHistory();

  const token = localStorage.getItem("token");
  // console.log(token)
  const a = (axios.defaults.headers.common["Authorization"] =
    "bearer " + token);
  console.log(a);
  if (!token) {
    alert("Tidak Bisa Akses Halaman Ini. Silakan Login Dulu!");
    return <Redirect to="/login" />;
  }

  


  return (
    <div className="flex flex-wrap">
      <div className="md:w-2/12 flex flex-row  md:flex-col">
        <div className="w-full md:mt-10 px-1 font-bold text-md flex flex-row  md:flex-col ">

          {showPenjualanku? (
          <button
            className="py-5 px-2 text-center text-white font-bold bg-pink-600 hover:text-black hover:bg-pink-300"
            // style={{ cursor: "pointer" }}
            value="Penjualanku"
            defaultValue="Penjualanku"
            onClick={onHandleClick}

          >
            PENJUALANKU
          </button>
          ) : (

            <button
            className="py-5 px-2 text-center border-2 hover:text-black hover:bg-pink-300"
            // style={{ cursor: "pointer" }}
            value="Penjualanku"
            defaultValue="Penjualanku"
            onClick={onHandleClick}

          >
            PENJUALANKU
          </button>


          ) }
          </div>

        <div className="w-full md:mt-10 px-1 font-bold text-md flex flex-row  md:flex-col ">

          {showPembelianku? (
          <button
            className="py-5 px-2 text-center  text-white font-bold bg-pink-600 hover:text-black hover:bg-pink-300"
            // style={{ cursor: "pointer" }}
            value="Pembelianku"
            defaultValue="Pembelianku"
            onClick={onHandleClick}

          >
            PEMBELIANKU
          </button>
          

          ) : (


            <button
            className="py-5 px-2 text-center border-2 hover:text-black hover:bg-pink-300"
            // style={{ cursor: "pointer" }}
            value="Pembelianku"
            defaultValue="Pembelianku"
            onClick={onHandleClick}

          >
            PEMBELIANKU
          </button>

          ) }
          
        </div>
      </div>

        

      {
                    showPenjualanku ?
                        <div className="w-full md:w-9/12">
                            <Penjualanku />
                        </div>
                        :
                        showPembelianku ?
                            <div className="w-full md:w-9/12">
                                <Pembelianku />
                            </div>
                            : null
                }
                
               
    </div>
  );
}
