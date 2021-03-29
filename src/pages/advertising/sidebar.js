import React from 'react'
import { useHistory } from 'react-router';

export default function Sidebar() {
    const acco_id = localStorage.getItem("dataUserId")
    const history = useHistory();
    return (
        <div className="w-full md:w-3/12 md:mt-10 sm:px-1 text-center font-bold text-sm flex flex-row justify-evenly md:flex-col md:justify-start ">
          {
            acco_id===33 && <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/advertising/my-pkg")}>Package Adv</div>
          }
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/advertising/my-adv")}>My Product</div>
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/advertising/add-adv")}>Advertising</div>
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/advertising/orad")}>Order Advertising</div>
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/advertising/orap")}>Order Advertising Product</div>
        </div>
    )
}
