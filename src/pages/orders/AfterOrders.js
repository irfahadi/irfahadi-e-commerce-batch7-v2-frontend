import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiCart } from "../../config/apiUrl";
import { numberWithCommas } from "../../utils/utils";

export default function AfterOrders() {
  let history = useHistory();
  let [modal, setModal] = useState(false);
  let [dataFormOrderArrival, setDataFormArrival] = useState({});
  const [AfterOrders, setAfterOrders] = useState([]);
  const [FilterOrders, setFilterOrders] = useState([]);
  const [accId, setaccId] = useState(localStorage.getItem("dataAccountId"));
  const [status, setStatus] = useState();

  useEffect(() => {
    fetchAfterOrders();
    fetchFilterOrders();
  }, [modal, dataFormOrderArrival]);

  const fetchAfterOrders = async () => {
    return await axios({
      url: `${apiCart}/cart/${accId}/CHECKOUT`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.data.map((x, y) => {
          let dateTrans = x.cart_created_on.toString();
          let watrDate = new Date(dateTrans).toLocaleString();
          res.data[y].cart_created_on = watrDate;
        });
        setAfterOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  const fetchFilterOrders = async () => {
    return await axios({
      url: `${apiCart}/v1/orders/${accId}/PAID`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.data.map((x, y) => {
          let dateTrans = x.cart_created_on.toString();
          let watrDate = new Date(dateTrans).toLocaleString();
          res.data[y].cart_created_on = watrDate;
        });
        setFilterOrders(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  };

  const onShow = async(cart_id) => {
    localStorage.setItem('cartId',cart_id)
    history.push("/cart-orders");
  };

  return (
    <>
      <div class="container gap-8 justify-center  flex flex-row flex-wrap uppercase rounded mb-4 ">
        <table class="border-collapse w-full mr-10 ml-10 mt-5">
          <thead>
            <tr>
              <th class="py-3 font-xs uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Cart Id
              </th>
              <th class="py-3 mx-2 font-xs uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Created On
              </th>
              <th class="py-3 font-xs uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Total Weight(kg)
              </th>
              <th class="py-3 font-xs uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Total Amount(Rp)
              </th>
              <th class="py-3 font-xs uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                Total Quantity
              </th>

              <th
                class="py-3 font-xs uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell"
                colspan="2"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200 mx-2">
            {AfterOrders
              ? AfterOrders.filter(
                  (x) =>
                  x.cart_line_items[0].clit_stat_name === "PENDING" ||
                    x.cart_line_items[0].clit_stat_name === "CHECKOUT"
                ).map((x) => (
                  <>
                    <tr class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                      <td class="w-full lg:w-auto p-2 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">
                            {x.cart_id}
                          </div>
                        </div>
                      </td>
                      <td class="border border-b gap-2 ">
                        <div class="text-sm font-medium text-gray-900 ">
                          {x.cart_created_on}
                        </div>
                      </td>
                      <td class="border border-b gap-2">
                          <div class="text-sm font-medium text-gray-900">
                            {x.cart_total_weight} kg
                        </div>
                      </td>
                      <td class="border border-b gap-2">
                          <div class="text-sm font-medium text-gray-900">
                            Rp. {numberWithCommas(x.cart_total_amount)}
                        </div>
                      </td>
                      <td class="border border-b gap-2 ">
                          <div class="text-sm font-medium text-gray-900">
                            {x.cart_total_qty}
                          </div>
                      </td>
                      {/* <td>
                        <div class="ml-4">
                          <button class=" text-blue-400 hover:text-blue-600 underline pl-6">
                            Batal
                          </button>
                        </div>
                      </td> */}
                      <td class="border border-b gap-2 ">
                        <div class="ml-4">
                          <button
                            onClick={()=>onShow(x.cart_id)}
                            class="text-blue-400 hover:text-blue-600 focus:outline-none pl-6"
                          >
                            Show
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
