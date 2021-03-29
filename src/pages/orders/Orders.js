import axios from "axios";
import React, { useEffect, useState } from "react";
import Orders from "./Orders";
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
  const [CartOrders, setCartOrders] = useState([]);
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
  let [counter, setCounter] = useState(0);
  let text = " . . . . . . . .".split("");
  let [loadingText, setLoadingText] = useState(text[0]);
  let [refresh, setRefresh] = useState(false);
  let [loading, setLoading] = useState(false);
  let [data, setData] = useState({
    acco_id: accId,
    total_amount: 0,
    transaction_type: "order",
    order_name: "#",
    payment_by: "wallet",
  });
  let [watrNumber, setWatrNumber] = useState();

  toast.configure();
  const notifyLogin = () => {
    toast.error("Jangan Bandel Harap Login Dulu ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  const token = localStorage.getItem("token");
  // console.log(token)

  const a = (axios.defaults.headers.common["Authorization"] =
    "bearer " + token);
  console.log(a);
  if (!token) {
    notifyLogin();
    history.push("/login");
  }

  useEffect(() => {
    fetchCartOrders();
    fetchAddress();
    console.log(accId);
    console.log(SubTotal);
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

  useEffect(() => {
    // console.log(counter);
    if (loading) {
      if (counter > text.length - 1) {
        setCounter(0);
        setLoadingText("");
        setRefresh(!refresh);
      } else {
        setCounter(counter + 1);
        setTimeout(() => {
          setLoadingText(loadingText + text[counter]);
          setRefresh(!refresh);
        }, 500);
      }
    } else {
      console.log("do nothing");
    }
  }, [loading, refresh]);

  const fetchCartOrders = async () => {
    return await axios({
      url: `${apiOrder}/orders/${accId}/PAID`,
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
    let result = await axios({
      url: `${apiUserAccount}/address/search/${accId}/PAID`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(result.data[0].acco_nama)
    setAddress(result.data[0]);

    setCityTo(result.data[0].city_name);
  };

  useEffect(() => {
    console.log(watrNumber);
    axios.put(`${apiOrder}/orders`, {
      order_name: data.order_name,
      order_watr_numbers: watrNumber,
    });
  }, [watrNumber]);

  useEffect(() => {}, [selectedEkspedisi]);

  const onToDetail = ()=>{
    history.push('/checkout-myorders')
  } 

  return (
    <>
        <div>
          <div class="container-md mx-auto p-4 rounded-lg py-4 mb-5 border-4 border-pink-400">
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
              <div class=" focus:outline-none bg-none mr-2 text-black py-2 px-4 border-none border-blue-400 rounded-lg"></div>
            </div>
          </div>

          <div class="flex flex-wrap rounded-lg shadow py-2 mb-5 border-4 border-pink-400">
            <div class="md:w-6/12 md:mt-6 px-5 text-gray-600 text-left font-sans-serif">
              Product dipesan
            </div>
            <div className="w-full md:w-5/12">
              <div className="text-sm block my-4 p-3 text-black">
                <div className="flex justify-between text-gray-300">
                  <div>Harga Satuan</div>
                  <div>Jumlah</div>
                  <div>Subtotal Produk</div>
                </div>
              </div>
            </div>

            {CartOrders.orders_line_items
              ? CartOrders.orders_line_items.map((x) => (
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
                          <div>{x.orit_qty}</div>
                          <div>Rp.{numberWithCommas(x.order_total_due)}</div>
                        </div>
                      </div>
                    </div>
                  </>
                ))
              : null}
          </div>
          <button
            class=" border-2 border-pink-400 hover:bg-pink-600 focus:outline-none cursor-pointer text-black transition duration-200 font-sans-serif py-2 px-4 rounded-lg"
            onClick={onToDetail}
          >
            <span class="fas fa-truck"> Check Status Pengiriman</span>
          </button>
        </div>
    </>
  );
}
