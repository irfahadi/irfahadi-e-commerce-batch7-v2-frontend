import axios from "axios";
import react from "react";
import React, { useEffect, useState } from "react";
import { apiUserMaster, apiUserAccount } from "../../config/apiUrl";
import { useHistory } from "react-router";
import SidebarAdmin from './sidebarAdmin'


export default function OrderSK() {

    const [OrderSK, SetOrderSK ] = useState([]);
    
    const GetOrderSK = async () => {
        const response = await axios.get(`${apiUserAccount}/dashboard/OrderCitySeller`);
        return response.data;
      };
    
      useEffect(() => {
        const getListOrderSK = async () => {
          const listOrderSK = await GetOrderSK();
          if (listOrderSK) SetOrderSK(listOrderSK);
        };
        getListOrderSK();
      }, []);

    return (
        <div className="flex flex-wrap">
        <SidebarAdmin />
        <div className="w-full md:w-9/12 md:mt-10">
        <div className="w-full x:w-8/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-gray-800">List City by Seller Order</h3>
                        </div>
                        
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className="p-3 bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">City Name</th>
                                <th className="p-3 bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Total Order</th>
                                {/* <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Description</th>
                                <th className=" px-6 bg-gray-100 text-gray-600 align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-left">Action</th> */}
                            </tr>
                        </thead>
                    
                        <tbody >
                            {
                                 OrderSK ? 
                                 OrderSK.map((x,index) => {
                                     return (
                                        <tr class="bg-white lg:hover:bg-pink-200 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">City Name</span>

                            {x.city_name}
                          </td>
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Total Order</span>
                            {x.total_order === null ? '0 Order' : x.total_order+' Order' }
                          </td>
                                        </tr>
                                     ) 

                                 })
                                 :(null)
                                 }
                                     
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}
