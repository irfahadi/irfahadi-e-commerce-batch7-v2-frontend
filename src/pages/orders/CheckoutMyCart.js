import axios from "axios";
import React from "react";
import { Redirect, useHistory } from "react-router";
import AfterOrders from './AfterOrders'

export default function CheckoutMyCart() {
  let history = useHistory();

  const token = localStorage.getItem("token");
  // console.log(token)
  const a = (axios.defaults.headers.common["Authorization"] =
    "bearer " + token);
  console.log(a);
  if (!token) {
    alert("Tidak Bisa Akses Halaman Ini. Silakan Login Dulu!");
    return <Redirect to="/login" />;
  }

  return (
    <div className="flex flex-wrap">
      <div className="md:w-2/12 flex flex-row  md:flex-col">
        <div className="w-full md:mt-10 px-1 font-bold text-md flex flex-row  md:flex-col ">
          <div
            className="py-5 px-2 hover:text-secondary hover:bg-white"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/checkout-mycart")}
          >
            My Cart
          </div>
          <div
            className="py-5 px-2 hover:text-secondary hover:bg-white"
            style={{ cursor: "pointer" }}
            onClick={() => history.push("/checkout-myorders")}
          >
            My Orders
          </div>
        </div>
      </div>

      <div className="w-full md:w-9/12">
        <AfterOrders/>
      </div>
    </div>
  );
}