import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiOrder, apiUserMaster } from "../../config/apiUrl";
import { numberWithCommas } from "../../utils/utils";


export default function Pembelianku() {
  let history = useHistory();
  let [modal, setModal] = useState(false);
  let [dataFormOrderArrival, setDataFormArrival] = useState({});
  const [MyOrders, setMyOrders] = useState();
  const [stat, setStat] = useState();
  const [accId, setaccId] = useState(localStorage.getItem("dataAccountId"));
 

  useEffect(() => {
    fetchMyOrders();
   
  }, [modal, dataFormOrderArrival, stat]);

  const fetchMyOrders = async () => {
    let res = await axios({
      url: `${apiUserMaster}/users/pembelian/${accId}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.data.map((x, y) => {
          let dateOrders = x.order_created_on.toString();
          let ordersDate = new Date(dateOrders).toLocaleString();
          res.data[y].order_created_on = ordersDate;
        });
        setMyOrders(res.data);
        console.log(res.data);
        console.log(res);
        console.log();
      })
      .catch((err) => console.error(err));
  };

 


  return (
    <>
    {MyOrders? (
      <div class="flex flex-col">
        <div className='ml-12 font-semibold underline'>
          PEMBELIANKU
        </div>
        <div class="-my-2 sm:-mx-6 lg:-mx-8">
          <div class="py-2 mx-12 align-middle inline-block w-full relative mb-6 sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="table-auto min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                  <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product Image
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created On
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Seller
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Quantity
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subtotal
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Weight
                    </th>
                    {/* <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Discount
                    </th> */}
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                   
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                {MyOrders
                    ? MyOrders.map((x) => (
                        <>
                          <tr>
                          <td>
                              <div>
                                <img src={x.prim_path} class="text-sm text-center font-medium text-gray-900">
                                  
                                </img>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium text-gray-900">
                                  {x.order_name}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium text-gray-900">
                                  {x.order_created_on}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium text-gray-900">
                                  {x.seller}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium text-gray-900">
                                  {x.prod_name}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium text-gray-900">
                                  {x.order_total_qty}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium text-gray-900">
                                  Rp.{numberWithCommas(x.order_total_due)}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium text-gray-900">
                                  {x.order_weight} kg
                                </div>
                              </div>
                            </td>
                            {/* <td>
                              <div>
                                <div class="text-sm font-medium text-gray-900">
                                  {x.order_watr_numbers}
                                </div>
                              </div>
                            </td> */}
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium bg-green-100 text-green-800 rounded-lg">
                                  {x.order_stat_name}
                                </div>
                              </div>
                            </td>

                            
                          </tr>
                        </>
                      ))
                    : ('No Records Found!')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
      </div>
    ):('Anda Belum Pernah Membeli Apapun')}
    </>
  );
}
