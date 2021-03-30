import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiOrder, apiUserMaster } from "../../config/apiUrl";
import convertToRupiah from "../product/convertToRupiah";


export default function Pembelianku() {
  let history = useHistory();
  let [modal, setModal] = useState(false);
  let [dataFormOrderArrival, setDataFormArrival] = useState({});
  const [MyOrders, setMyOrders] = useState();
  const [OrderTerbanyak, setOrderTerbanyak] = useState();

  const [stat, setStat] = useState();
  const [accId, setaccId] = useState(localStorage.getItem("dataAccountId"));

  
  const [selectedNav, setSelectedNav] = useState('Default')
  const [showDefault, setShowDefault] = useState()
  const [showTerbanyak, setShowTerbanyak] = useState()

  const [hitungCart, setHitungCart] = useState()


 

  useEffect(() => {
    fetchMyOrders();
    fetchOrderTerbanyak();
    fetchHitungCart();
  }, [modal, dataFormOrderArrival, stat]);

  const fetchMyOrders = async () => {
    let res = await axios({
      url: `${apiUserMaster}/users/penjualan/${accId}`,
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



  const fetchOrderTerbanyak = async () => {
    let res = await axios({
      url: `${apiUserMaster}/users/terbanyak/${accId}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.data.map((x, y) => {});
        setOrderTerbanyak(res.data);
        console.log(res.data);
        // console.log(res);
       
      })
      .catch((err) => console.error(err));
  };



  const fetchHitungCart = async () => {
    let res = await axios({
      url: `${apiUserMaster}/users/hitungcart/${accId}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.data.map((x, y) => {});
        setHitungCart(res.data);
        console.log(res.data);
        // console.log(res);
       
      })
      .catch((err) => console.error(err));
  };





  useEffect(() => {
    switch (selectedNav) {
        
        case "Default":
            setShowDefault(true)
            setShowTerbanyak(false)
            break;
        case "Terbanyak":
            setShowDefault(false)
            setShowTerbanyak(true)
            break;
        default:
            break;
    }
}, [selectedNav])

const onHandleClick = (e) => {
    setSelectedNav(e.target.value)
}






  return (
    <>
      <div class="flex flex-col">
        <div className='flex ml-12 font-semibold w-full justify-between'>
          <div className="underline">
            PENJUALANKU
          </div>

          <div>
            <select className="flex mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={selectedNav}
              onChange={(e) => {
                const selectedTable = e.target.value;
                setSelectedNav(selectedTable);
              }}
              label="Filter"
              placeholder="Filter"
            >       
              <option
                value="Terbanyak"
              >
                BANYAK TERJUAL
              </option>               
              <option
                value="Default"
              >
                DEFAULT
              </option>               
            </select> 
            {/* {selectedNav} */}
          </div>
        </div>
        
        <div class="-my-2 sm:-mx-6 lg:-mx-8">
          <div class="py-2 mx-12 align-middle inline-block w-full relative mb-6 sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

              

              {showDefault?(
                
                <div>
                {MyOrders? (
                  <div>
                  {/* <label className='font-semibold'>TOTAL PENDAPATANKU : {MyOrders[0].order_total_due}</label> */}
                <table class="table-auto min-w-full divide-y divide-gray-200">
                <thead class="bg-pastel">
                  <tr className='justify-center'>
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
                      Pembeli
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
                {MyOrders.map((x) => (
                        <>
                          <tr className='hover:bg-pastel'>
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
                                  {x.acco_nama}
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
                                  {convertToRupiah(x.order_total_due)}
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
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium bg-green-100 text-green-800 rounded-lg">
                                  {x.order_stat_name}
                                </div>
                              </div>
                            </td>

                            
                          </tr>
                        </>
                ))}
                </tbody>
              </table>

                  </div>
              ): null}
              </div>
              
              
              ) : (


                <div>
                {OrderTerbanyak? (
                  
                  <div>
                    <label className='flex mb-2'>

                    

                      <label className='font-semibold text-white bg-pink-600 rounded px-2'>TOTAL PENDAPATANKU :</label>
                      <label className='font-bold text-white bg-pink-600 rounded px-2 underline'>
                        {convertToRupiah(OrderTerbanyak.reduce((val, element)=>{
                          return val + element.orit_subtotal
                        },0))
                        }
                      </label>
                    </label>
                <table class="table-auto min-w-full divide-y divide-gray-200">
                <thead class="bg-pastel">
                  <tr className='justify-center'>
                  <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider justify-end" colSpan='2'
                    >
                      Product
                    </th>
                  
                    <th
                      scope="col"
                      class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product Price
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
                      Total Price
                    </th>
                    
                  
                  </tr>
                </thead>

                <tbody class="bg-white divide-y divide-gray-200">
                {OrderTerbanyak.map((x) => (
                        <>
                          <tr className='hover:bg-pastel'>
                          <td className='flex justify-center'>
                              <div className='justify-center'>
                                <img src={x.prim_path} class="text-sm text-center h-28 w-28 font-medium text-gray-900">
                                </img>
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
                                  {convertToRupiah(x.prod_price)}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium text-gray-900">
                                  {x.total}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div>
                                <div class="text-sm text-center font-medium text-gray-900">
                                  {convertToRupiah(x.orit_subtotal)}
                                </div>
                              </div>
                            </td>
                            

                            
                          </tr>
                        </>
                ))}
                </tbody>
              </table>

                  </div>
              ): null}
              </div>
              )
              }

            </div>
          </div>
        </div>
        {/* {modal ? (
          <ModalMyOrders
            setModal={setModal}
            setDataFormArrival={setDataFormArrival}
            dataFormOrderArrival={dataFormOrderArrival}
          />
        ) : null} */}
      </div>
    </>
  );
}
