import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {apiOrder, apiPayment } from "../../config/apiUrl";
import { numberWithCommas } from "../../utils/utils";
import {ModalPayment} from '../payment/ModalPayment'
import {ModalCancelOrder} from './ModalCancelOrder'

export default function AfterOrders() {
  let history = useHistory();
  let [modal, setModal] = useState(false);
  let [dataFormOrderArrival, setDataFormArrival] = useState({});
  const [AfterOrders, setAfterOrders] = useState([]);
  const [FilterOrders, setFilterOrders] = useState([]);

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
    fetchAfterOrders();
  }, [modal, dataFormOrderArrival,showPayment]);

  const fetchAfterOrders = async () => {
    return await axios({
      url: `${apiOrder}/orders/${accId}`,
      method: "get",
      headers: {
        
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res)
        try {
          res.data.map((x, y) => {
            let dateTrans = x.order_created_on.toString();
            let watrDate = new Date(dateTrans).toLocaleString();
            res.data[y].order_created_on = watrDate;
          });
          setAfterOrders(res.data);
        } catch (error) {
          console.log(error)
        }
      })
      .catch((err) => console.error(err));
  };

  const onEditRow = (e) => {
    AfterOrders.filter((data) => data.order_name === e.target.value).map((data) =>
      setDataFormArrival(data)
    );

    setModal(true);
  };

  useEffect(()=>{
    console.log(AfterOrders)
  })

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
        await axios.post(""+apiPayment+"/orders/cancel",{order_name:orderToCancel})
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

  const onShow = async () => {
    history.push("/checkout-mycart");
  };

  return (
    <>
     {
      showPayment ?
      <ModalPayment 
      data={data}
      setShowPayment={setShowPayment}
      /> :
      <div class="container gap-8 justify-center  flex flex-row flex-wrap uppercase rounded mb-4 ">
        <table class="border-collapse w-full mr-10 ml-10 mt-5">
          <thead>
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
          <tbody class="bg-white divide-y divide-gray-200 mx-2">
            {AfterOrders ? AfterOrders.filter((x)=>x.order_stat_name==="CHECKOUT").map((x) => (
                <>
                  <tr class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                    <td class="w-full lg:w-auto p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                        <img class="text-sm font-medium text-gray-900 h-20 w-20" src={getThePath(x)}/>
                        </div>
                      </div>
                    </td>
                    <td class="gap-2 ">
                      <div class="text-sm font-medium text-gray-900 ">
                      {x.order_name}
                      </div>
                    </td>
                    <td>
                      <div class="ml-4 flex flex-row">
                        <div class="text-sm font-medium text-center text-gray-900">
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
                    <td>
                      <div class="ml-4">
                        <div class="text-sm font-medium text-gray-900">
                        {x.order_stat_name}
                        </div>
                      </div>
                    </td>
                    {/* <td>
                        <div class="ml-4">
                          <button class=" text-blue-400 hover:text-blue-600 underline pl-6">
                            Batal
                          </button>
                        </div>
                      </td> */}
                            {x.order_stat_name === "SHIPPING" ? (
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
              : null}
          </tbody>
        </table>
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
