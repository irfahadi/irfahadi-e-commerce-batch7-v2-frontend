import axios from 'axios';
import React from 'react'
import { Redirect, useHistory } from 'react-router';
import IndexCondition from '../../pages/condition/condition'


export default function ProductSidebar() {
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
            <div className="w-full md:mt-10 px-1 font-bold text-md flex flex-row  md:flex-col ">
            <div className="py-5 px-2 hover:text-white bg-white hover:bg-primary" style={{cursor:'pointer'}} onClick={()=>history.push("/product")}>Product</div>
              <div className="py-5 px-2 hover:text-white bg-white hover:bg-primary" style={{cursor:'pointer'}} onClick={()=>history.push("/brand")}>Brand</div>
              <div className="py-5 px-2 hover:text-white bg-white hover:bg-primary" style={{cursor:'pointer'}} onClick={()=>history.push("/category")}>Category</div>
              <div className="py-5 px-2 text-white bg-primary" style={{cursor:'pointer'}} onClick={()=>history.push("/condition")}>Condition</div>
            </div>
          </div>

          <div className="w-full md:w-9/12">
            <IndexCondition />
          </div>  
        </div>
    )
}
