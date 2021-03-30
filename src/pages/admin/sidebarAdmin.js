import React from 'react'
import { useHistory } from 'react-router';

export default function Sidebar() {
    
    const history = useHistory();
    return (
        <div className="w-full md:w-3/12 md:mt-10 sm:px-1 text-center font-bold text-sm flex flex-row justify-evenly md:flex-col md:justify-start ">
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/admin/order-bk")}>Order by City Buyer</div>
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/admin/order-sk")}>Order by City Seller</div>
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/admin/total-order-bk")}>Total Order by City</div>
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/admin/total-prod-bk")}>Total Product by City Buyer</div>
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/admin/total-prod-sk")}>Total Product by City Seler</div>

          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/admin/allproduct")}>My Product</div>
        </div>
    )
}
