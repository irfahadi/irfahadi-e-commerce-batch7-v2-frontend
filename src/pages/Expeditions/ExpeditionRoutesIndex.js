import axios from 'axios';
import React from 'react'
import { Redirect, useHistory } from 'react-router';
import IndexExRoute from './expedition_routes/index'


export default function ExpeditionRoutesIndex() {
    let history = useHistory();


    const token = localStorage.getItem('token')
    // console.log(token)
    const [openTab, setOpenTab] = React.useState(1);
    const a = axios.defaults.headers.common['Authorization'] = 'bearer ' + token
    console.log(a)
    if (!token) {
      alert("Tidak Bisa Akses Halaman Ini. Silakan Login Dulu!");
      return <Redirect to="/login" />
    }


    return (
        <div className="flex flex-wrap">
          <div className="md:w-2/12 flex flex-row  md:flex-col">
            <div className="w-full md:mt-10 px-1 font-bold text-md flex flex-row md:flex-col ">
              <div className="py-5 px-2 hover:text-white bg-white hover:bg-primary" style={{cursor:'pointer'}} onClick={()=>history.push("/ordershipping")}>Shipping</div>
              {/* <div className="py-5 px-2 hover:text-white bg-white hover:bg-primary" style={{cursor:'pointer'}} onClick={()=>history.push("/ordershippingarrival")}>Shipping Arrival</div> */}
              <div className="py-5 px-2 text-white bg-primary" style={{cursor:'pointer'}} onClick={()=>history.push("/expeditionsroutes")}>Expedition Route</div>
              <div className="py-5 px-2 hover:text-white bg-white hover:bg-primary" style={{cursor:'pointer'}} onClick={()=>history.push("/expeditions")}>Expedition</div>
            </div>
          </div>
        <div className="w-full md:w-9/12">
          <IndexExRoute />
        </div>
      </div>
    )
}
