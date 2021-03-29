import axios from "axios";
import { isNull } from "lodash-es";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiOrder } from "../../config/apiUrl";
import { numberWithCommas } from "../../utils/utils";
import ModalMyOrders from "../orders/Modal/ModalMyOrders";
import { GetWallet } from './api/GetWallet'

const OrdersCheckout = (props) => {
    let [mySaldo, setMySaldo] = useState(null)
    const [MyOrders, setMyOrders] = useState([]);
    const [accId, setaccId] = useState(localStorage.getItem("dataAccountId"));

    useEffect(() => {
        fetchOrderCheckout()
        getMyWallet()
    }, [])

    const fetchOrderCheckout = async () => {
        try {
            let res = await axios.get(`http://localhost:3005/api/orders/${accId}`)
            console.log(res)
            res.data.map((x, y) => {
                let dateOrders = x.order_created_on.toString();
                let ordersDate = new Date(dateOrders).toLocaleString();
                res.data[y].order_created_on = ordersDate;
            });
            setMyOrders(res.data);
        } catch (error) {
            console.log(error)
            setMyOrders([])
        }
    }

    const getMyWallet = async () => {
        try {
            let res = await GetWallet(accId)
            console.log(res)
            setMySaldo(numberWithCommas(res[0].wale_saldo))
        } catch (error) {
            console.log(error)
            setMySaldo(null)
        }
    }

    const onCancel = async (e) => {
        console.log(e.target.value)
        try {
            let orderCancelled = await axios.post('http://localhost:3005/api/orders/cancel',{order_name:e.target.value})
            console.log(orderCancelled)
        } catch (error) {
            console.log(error)
        }
    }

    const onPay = (e) => {
        try {
            let orderToPay = MyOrders.filter((x)=>x.order_name == e.target.value)
            console.log(orderToPay[0])
            props.data.order_name = orderToPay[0].order_name
            props.data.total_amount = orderToPay[0].order_total_due
            props.setShowVerifyPin(true)
            console.log(props.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="flex flex-col">
                <div>
                    {
                        mySaldo !== null ?
                            <div className="border rounded-md overflow-hidden border-primary px-4 py-4 mb-4">
                                <h1>My Wallet</h1>
                                <h1 className="text-sm font-bold">Rp. {mySaldo}</h1>
                            </div> : null
                    }
                </div>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >Order Name</th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >Created On</th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >Total</th>
                                        {/* <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Discount
                    </th> */}
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >Status</th>
                                        <th
                                            scope="col"
                                            className="px-6 w-1/12 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >Action</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {MyOrders
                                        ? MyOrders.map((x) => (
                                            <>
                                                <tr>
                                                    <td>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {x.order_name}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {x.order_created_on}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                Rp. {numberWithCommas(x.order_total_due)}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    {/* <td>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                {x.order_watr_numbers}
                                                                </div>
                                                            </div>
                                                            </td> */}
                                                   {x.order_stat_name === "PAID" ? (
                                                        <td>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">
                                                                Diproses Penjual
                                                            </div>
                                                        </div>
                                                    </td>
                                                       ):
                                                       <td>
                                                       <div className="ml-4">
                                                           <div className="text-sm font-medium text-gray-900">
                                                               {x.order_stat_name}
                                                           </div>
                                                       </div>
                                                   </td>}
                                                    {
                                                    x.order_stat_name === "PAID" ? (
                                                            <button
                                                            value={x.order_name}
                                                            className="py-1 px-2 bg-primary text-white rounded-lg w-100"
                                                            onClick={onCancel}>
                                                            CANCELL</button>
                                                        ) : 
                                                    x.order_stat_name === "CHECKOUT" ?
                                                    <td className="py-2 whitespace-nowrap text-sm text-gray-500">
                                                        <button
                                                            value={x.order_name}
                                                            className="py-1 px-4 bg-primary text-white rounded-lg w-100"
                                                            onClick={onPay}>
                                                            PAY</button>
                                                        <button
                                                            value={x.order_name}
                                                            className="py-1 mx-2 px-2 text-white rounded-lg w-100 bg-red-700"
                                                            onClick={onCancel}>
                                                            CANCEL</button>
                                                    </td>:null}
                                                </tr>
                                            </>
                                        ))
                                        : null}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export {OrdersCheckout}