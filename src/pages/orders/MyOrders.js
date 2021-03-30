import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiOrder, apiPayment } from "../../config/apiUrl";
import { numberWithCommas } from "../../utils/utils";
import ModalMyOrders from "./Modal/ModalMyOrders";
import {ModalPayment} from '../payment/ModalPayment'
import {ModalCancelOrder} from './ModalCancelOrder'
// import ModalMySaldo from "./Modal/ModalMySaldo"

export default function MyOrders() {
  let history = useHistory();
  let [modal, setModal] = useState(false);
  let [dataFormOrderArrival, setDataFormArrival] = useState({});
  const [MyOrders, setMyOrders] = useState();
  const [refresh,setRefresh] = useState()

  let [modalCancel,setModalCancel] = useState(false)
  let [orderToCancel,setOrderToCancel] = useState('')
  const [status, setStatus] = useState();
  const [accId, setaccId] = useState(localStorage.getItem("dataAccountId"));
  const [data, setData] = useState({
    "acco_id": localStorage.getItem("dataAccountId"),
    "total_amount":0,
    "transaction_type": "order",
    "order_name": "#",
    "payment_by": "#"
  })
  const [showPayment,setShowPayment] = useState(false)
 
  useEffect(() => {
    // fetchMyOrders();
    fetchFilterOrders();
    fetchMyOrders()
  }, [modal, dataFormOrderArrival, status, showPayment,modalCancel,refresh]);

  const fetchMyOrders = async () => {
    let res = await axios({
      url: `${apiOrder}/orders/${accId}`,
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
      })
      .catch((err) => console.error(err));
  };

  const fetchFilterOrders = async () => {
    let res = await axios({
      url: `${apiOrder}/orders/${accId}`,
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
      })
      .catch((err) => console.error(err));
  };


  const onEditRow = (e) => {
    MyOrders.filter((data) => data.order_name === e.target.value).map((data) =>
      setDataFormArrival(data)
    );

    setModal(true);
  };

  const getThePath = (x) => {
    try {
      return x.orders_line_items[0].product.product_images[0].prim_path
    } catch (error) {
      console.log(error)
      return null
    }
  }

  const onPay = (e) => {
    try {
      data.order_name = e.target.value.split("-")[0]
      data.total_amount = e.target.value.split("-")[1]
      console.log(data)
      setShowPayment(true)
    } catch (error) {
      console.log(error)
    }
  
  }

  const onFilter = (e) => {
    try {
      const value = e.target.options[e.target.selectedIndex].value;
      setStatus(value);
    } catch (error) {      
      console.log(error)
    }
  };

  const onCancel = async () => {
    try {
        
        await axios.post(apiPayment+"/orders/cancel",{order_name:orderToCancel})
        setModalCancel(false)
    } catch (error) {
        console.log(error)
    }
}

const getOrderToCancel = async (e) => {
  try {
    setOrderToCancel(e.target.value)
    setModalCancel(true)
  } catch (error) {
    console.log(error)
  }
}

  return (
    <>
    {
      showPayment ?
      <ModalPayment 
      data={data}
      setShowPayment={setShowPayment}
      /> :
      <div class="flex flex-col">
        <div class="col-span-3 sm:col-span-1">
          <label for="country" class="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            autocomplete="status"
            value={status}
            onChange={onFilter}
            class="mt-1 block w-1/6 mb-4 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Pilih</option>
            <option value="PAID">PAID</option>
            <option value="SHIPPING">SHIPPING</option>
            <option value="ARRIVED"> ARRIVED</option>
            <option value="CLOSED"> CLOSED</option>
            <option value="CANCELLED">CANCELLED</option>
            <option value="CHECKOUT">CHECKOUT</option>
          </select>
          {/* <button><ModalMySaldo/></button> */}
        </div>
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full mb-6 sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created On
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Subtotal
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Weight
                    </th>
                    {/* <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Discount
                    </th> */}
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                {MyOrders ? MyOrders.filter(
                        (x) =>x.order_stat_name === status
                      ).map((x) => (
                        <>
                          <tr>
                            <td>
                              <div class="ml-4">
                                <img class="text-sm font-medium text-gray-900 h-20 w-20" src={getThePath(x)}/>
                              </div>
                            </td>
                            <td>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  {x.order_name}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  {x.order_created_on}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  Rp.{numberWithCommas(x.order_total_due)}
                                </div>
                              </div>
                            </td>
                            <td>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  {x.order_weight} kg
                                </div>
                              </div>
                            </td>
                            {/* <td>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">
                                  {x.order_watr_numbers}
                                </div>
                              </div>
                            </td> */}
                            <td>
                              <div class="ml-4">
                                <span class="text-sm font-medium bg-green-100 text-green-800 rounded-lg">
                                  {x.order_stat_name}
                                </span>
                              </div>
                            </td>

                            {x.order_stat_name === "ARRIVED" ? (
                              <td>
                                <div class="ml-4">
                                  <button
                                    value={x.order_name}
                                    class="bg-button hover:bg-green-300 focus:outline-none cursor-pointer text-white transition duration-200 font-sans-serif py-2 px-8 rounded-lg"
                                    onClick={onEditRow}
                                  >
                                    Diterima
                                  </button>
                                </div>
                              </td>
                            ) : x.order_stat_name === "SHIPPING" ? (
                              null
                            ) : x.order_stat_name === "CANCELLED" ? (
                                null
                            ) : x.order_stat_name === "CHECKOUT" ? (
                              <td>
                                <button value={x.order_name+"-"+x.order_subtotal} onClick={onPay} className="py-1 mx-1 px-4 bg-primary text-white rounded-lg w-100">Pay</button>
                                <button value={x.order_name} onClick={getOrderToCancel} className="py-1 mx-1 px-4 bg-primary text-white rounded-lg w-100">Cancel</button>
                              </td>
                            ) : x.order_stat_name === "PAID" ?(
                              <td>
                                <button value={x.order_name} onClick={getOrderToCancel} className="py-1 mx-1 px-4 bg-primary text-white rounded-lg w-100">Cancel</button>
                              </td>
                            ) : (
                              <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                                <button
                                  className="py-2 px-4 bg-gray-500 text-white reounded-lg w-100"
                                  onClick={() => {
                                    setModal(true);
                                  }}
                                  disabled="true"
                                >
                                  Finish
                                </button>
                              </td>
                            )}
                          </tr>
                        </>
                      ))
                    :null
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {modal ? (
          <ModalMyOrders
            setModal={setModal}
            setRefresh={setRefresh}
            setDataFormArrival={setDataFormArrival}
            dataFormOrderArrival={dataFormOrderArrival}
            refresh={refresh}
          />
        ) : null}
        {modalCancel ? (
          <ModalCancelOrder 
          setModalCancel={setModalCancel}
          onCancel={onCancel}
          />
        ):null}
      </div>
  }
    </>
  );
}