import axios from "axios";
import React, { useEffect, useState } from "react";
import Orders from "./Orders";
import { Redirect } from "react-router-dom";

import { numberWithCommas } from "../../utils/utils";
import {
  apiUrl,
  apiCart,
  apiUserAccount,
  apiExpedition,
  apiOrder,
} from "../../config/apiUrl";
import { useGetSaldo } from "../payment/GetSaldo";
import Ekspedisi from "./EkspedisiOrders";
import { data } from "autoprefixer";
import { useHistory } from "react-router-dom";
import VerifyPayment from "../payment/VerifyPayment";
import { toast } from "react-toastify";

// import PaymentGateway from '../payment'


export default function CartOrders() {
  let history = useHistory();
  const [CartOrders, setCartOrders] = useState({});
  const [accId, setaccId] = useState(localStorage.getItem("dataAccountId"));
  const [accIdProd, setaccIdProd] = useState([]);
  const [accIdSeller, setaccIdSeller] = useState([]);
  const [Address, setAddress] = useState([]);
  const [addrOptional, setAddrOptional] = useState([]);
  const [Account, setAccount] = useState([]);
  const [Phone, setPhone] = useState([]);
  const [Add, setAdd] = useState([]);
  const [city, setCity] = useState([]);
  const [prov, setProv] = useState([]);
  const [kec, setKec] = useState([]);
  const [kpos, setKpos] = useState([]);
  const [citySeller, setCitySeller] = useState();
  const [cityTo, setCityTo] = useState([]);
  const [ongkir, setOngkir] = useState(0);
  const [weight, setWeight] = useState([]);
  const [qty, setQty] = useState([]);
  const [totalOrder, settotalOrder] = useState(0);
  const [selectedEkspedisi, setSelectedEkspedisi] = useState();
  let saldo = useGetSaldo({ acco_id: localStorage.getItem("dataAccountId") });
  let [SubTotal, setSubtotal] = useState(0);
  let subTotalPajak = SubTotal + SubTotal * (10 / 100);
  let [less, setLess] = useState();
  let [dataEkspedisi, setdataEkspedisi] = useState();

  toast.configure();
  const notify = () => {
    toast.success("Saldo Codepay : Rp. " + numberWithCommas(saldo), {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const notifyErr = () => {
    toast.error("Saldo Kurang : Rp. " + numberWithCommas(saldo), {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const notifyErrEks = () => {
    toast.error("Harap pilih ekspedisi ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const notifyLogin = () => {
    toast.error("Jangan Bandel Harap Login Dulu ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  }

  useEffect(() => {
    try {
      fetchCartOrders();
      fetchAddress();
      fetchExpedition();
      fetchCitySeller();
    } catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    let st = 0;
    if (CartOrders.cart_line_items) {
      console.log("test");
      CartOrders.cart_line_items.map((x) => {
        console.log(x);
        console.log(st);
        return (st += x.clit_subtotal);
      });
      setSubtotal(st);
      console.log(SubTotal);
    }
  }, [CartOrders]);

  useEffect(() => {
    if (Address) {
      setAccount(Address.acco_nama);
      setPhone(Address.acco_phone);
      setAdd(Address.addr_address);
      setAddrOptional(Address.addr_optional);
      setCity(Address.city_name);
      setProv(Address.prov_name);
      setKec(Address.kec_name);
      setKpos(Address.kodepos);
    }
    // console.log(Account, Phone, Address)
  }, [Address]);

  useEffect(() => {
    console.log(accIdProd);
  }, [accIdProd]);

  useEffect(() => {
    console.log(ongkir);
    data.total_amount = subTotalPajak + Number(ongkir);
    settotalOrder(subTotalPajak + Number(ongkir));
  }, [ongkir]);

  const fetchCartOrders = async () => {
    return await axios({
      url: `${apiCart}/cart/${accId}/CHECKOUT`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data[0]);
        setCartOrders(res.data[0]);
        setaccIdProd(res.data[0].prod_acco_id);
        setWeight(res.data[0].cart_total_weight);
        setQty(res.data[0].cart_total_qty);
        console.log(accIdProd);
        // setaccId(res.data[0].cart_acco_id)
      })
      .catch((err) => console.error(err));
  };

  const fetchAddress = async () => {
    try {
      let result = await axios({
        url: `${apiUserAccount}/address/search/${accId}`,
        method: "get",
        headers: {
          "Content-Type": "application/json",
        }
      });
      // console.log(result.data[0].acco_nama)
      setAddress(result.data[0]);
      setCityTo(result.data[0].city_name); 
    } catch (error) {
      console.log(error)
    }
  };

  const fetchAddressProd = async () => {
    let result = await axios({
      url: `${apiUserAccount}/address/search/${accId}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(result.data[0].acco_nama)
    setAddress(result.data[0]);
  };

  const fetchExpedition = async () => {
    let result = await axios({
      url: `${apiExpedition}/expedition`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result.data);
    // console.log(result.data[0].acco_nama)
    setdataEkspedisi(result.data);
  };

  const cekOngkir = async () => {
    const result = await axios.get(
      `${apiExpedition}/v1/cekongkir/${citySeller}/${cityTo}/${selectedEkspedisi}/REGULER`
    );

    if (result.data.length > 0) {
      setOngkir(result.data[0].exro_cost);
    } else {
      setOngkir(0);
    }
    console.log(ongkir);
  };

  const fetchCitySeller = async () => {
    console.log({ accId });
    const result = await axios({
      url: `${apiOrder}/v1/orders/${accId}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    console.log("city : " + result.data[0].city_name);
    setCitySeller(result.data[0].city_name);
    setaccIdSeller(result.data[0].acco_id);
    console.log({ citySeller });
  };

  function onHandleClickCodePay() {
    if (saldo <= totalOrder) {
      setLess(true);
      notify();
    } else {
      setLess(false);
      notify();
    }
  }

  const onCreateOrder = () => {
    if (saldo < totalOrder) {
      notifyErr();
    } else if (ongkir === 0) {
      notifyErrEks();
    } else {
      console.log("oncreateorder");
      let orders = {
        order_subtotal: SubTotal,
        order_weight: weight,
        order_discount: 0,
        order_tax: subTotalPajak,
        order_total_due: totalOrder,
        order_total_qty: qty,
        order_acco_id: accId,
        order_acco_id_seller: accIdSeller,
        order_line_items: [],
        // ongkir : ongkir,
      };
      CartOrders.cart_line_items.map((x) =>{
        x.cart_stat_name='CLOSED'
        orders.order_line_items.push(JSON.stringify(x))
      });
      // console.log(orders);
      deleteCart(CartOrders.cart_id);
      createOrders(orders);
      setTimeout(()=>{
        history.push('/checkout-mycart')
      },1000)
      

    }
  };

  const createOrders = async (orders) => {
    try {
      let response = await axios.post(`${apiOrder}/orders/newOrder/${accId}`, {
        data: orders,
      });
      data.order_name = response.data.order_name;
      return await response.data;
    } catch (err) {
      return await err.message;
    }
  };

  const deleteCart = async (cart_id) => {
    try {
      let response = await axios.delete(`${apiCart}/cartLineItems/${cart_id}`)
      .then(async()=> await axios.delete(`${apiCart}/cart/${cart_id}`));
      return response
    } catch (err) {
      return await err.message;
    }
  };

  useEffect(() => {}, [selectedEkspedisi]);

  const token = localStorage.getItem("token");
  // console.log(token)

  const a = (axios.defaults.headers.common["Authorization"] =
    "bearer " + token);
  console.log(a);
  if (!token) {
    notifyLogin();
    history.push("/login");
  }

  return (
    <>
        <div>
          <div class="container-md mx-auto p-4 rounded-lg shadow py-4 mb-5 border-4 border-pink-600">
            <h1 class="text-red-500 text-left font-sans-serif fas fa-map-marker-alt">
              Alamat Pengiriman
            </h1>
            <div class="flex justify-between ...">
              <h1>
                {Account} ({Phone})
              </h1>
              <div>
                {Add} {addrOptional} {kec}-{kec} {city} - {prov} {kpos}
              </div>
              <div>
                <button class=" focus:outline-none bg-none mr-2 text-black py-2 px-4 border-none border-blue-400 rounded-lg">
                  Utama
                </button>
                <button class="focus:outline-none bg-none text-blue-500 font-sans-serif py-2 px-4 border-none border-blue-400 rounded-lg">
                  Ubah
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-wrap rounded-lg shadow py-2 mb-5 border-4 border-pink-600">
            <div class="md:w-6/12 md:mt-6 px-5 text-gray-600 text-left font-sans-serif">
              Product dipesan
            </div>
            <div className="w-full md:w-5/12">
              <div className="text-sm block my-4 p-3 text-black">
                <div className="flex justify-between text-gray-600">
                  <div>Harga Satuan</div>
                  <div>Jumlah</div>
                  <div>Subtotal Produk</div>
                </div>
              </div>
            </div>

            {CartOrders.cart_line_items
              ? CartOrders.cart_line_items.map((x) => (
                  <>
                    <div class="flex flex-wrap md:w-6/12 md:mt-1 px-5 font-normal md:font-light text-left font-sans-serif">
                      <img
                        class="h-20 w-20 "
                        src={x.product.product_images[0].prim_path}
                      />
                      <label class="p-5">{x.product.prod_name} </label>
                    </div>
                    <div className="w-full md:w-5/12">
                      <div className="text-sm block my-4 p-3 text-black">
                        <div className="flex justify-between text-gray-500">
                          <div>Rp.{numberWithCommas(x.product.prod_price)}</div>
                          <div>{x.clit_qty}</div>
                          <div>Rp.{numberWithCommas(x.clit_subtotal)}</div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              : null}
          </div>

          <div class="flex flex-wrap mx-auto rounded-lg shadow py-2 mb-5 border-4 border-pink-600">
            <div class="md:w-2/12 md:mt-6 px-5 text-gray-600 text-left font-sans-serif">
              Metode Pembayaran
            </div>
            <div className="w-full p-4">
              <div className="text-sm block my-1 p-2 text-black">
                <div className="flex flex-wrap justify-between text-gray-500">
                  <button
                    class="bg-button hover:bg-green-300 focus:outline-none cursor-pointer text-white transition duration-200 font-sans-serif py-2 px-8 rounded-lg"
                    onClick={onHandleClickCodePay}
                  >
                    CodePay
                  </button>
                  <button
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-lg cursor-not-allowed opacity-50"
                    disabled
                  >
                    Transfer Bank
                  </button>
                  <button
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-lg cursor-not-allowed opacity-50"
                    disabled
                  >
                    Kartu Kredit/Debit Online
                  </button>
                  <button
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-lg cursor-not-allowed opacity-50"
                    disabled
                  >
                    COD(Bayar di tempat)
                  </button>
                  <button
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-lg cursor-not-allowed opacity-50"
                    disabled
                  >
                    Cicilan Kartu Kredit
                  </button>
                  <button
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-lg cursor-not-allowed opacity-50"
                    disabled
                  >
                    Alfamart
                  </button>
                  <button
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-lg shadow-lg cursor-not-allowed opacity-50"
                    disabled
                  >
                    Indomaret
                  </button>
                </div>
                {/* <p>Saldo CodePay Anda : Rp. {numberWithCommas(saldo)}</p> */}
              </div>
              <div class="mt-10 py-3 border-t border-gray-300">
                <div class="flex flex-col-2">
                  <h1 class="m-2">Ekspedisi</h1>
                  <Ekspedisi
                    dataEkspedisi={dataEkspedisi}
                    selectedEkspedisi={selectedEkspedisi}
                    setSelectedEkspedisi={setSelectedEkspedisi}
                  />
                  <button
                    onClick={cekOngkir}
                    class="border-current hover:border-pink-600 hover:text-pink-600 focus:outline-none  text-black font-sans-serif py-2 px-4 ml-4 border rounded-lg w-40"
                  >
                    Cek Ongkir
                  </button>
                  {/* <p>Pengiriman dari kota  {citySeller} Ke  {cityTo}</p> */}
                </div>
                <div class="grid col-4 justify-end">
                  <div class="text-center mr-6 px-4 py-2 -my-10">
                    Subtotal + Pajak (10%) : Rp.
                    {numberWithCommas(subTotalPajak)}
                  </div>
                  <div class="text-center mr-6 px-4 py-2 m-2">
                    Total Ongkos Kirim : Rp.{numberWithCommas(ongkir)}
                  </div>
                  <div class="text-center mr-6 px-4 py-2 m-2">
                    Total Pembayaran : Rp.{numberWithCommas(totalOrder)}
                  </div>
                  <button
                    class=" border-2 border-pink-400 hover:bg-pink-600 focus:outline-none cursor-pointer text-black transition duration-200 font-sans-serif py-2 px-4 rounded-lg"
                    onClick={onCreateOrder}
                  >
                    <span class="fas fa-shopping-cart"> Buat Pesanan</span>
                  </button>
                  {/* // : null} */}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}