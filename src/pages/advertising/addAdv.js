import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { apiAdvertising, apiProductTransaction } from "../../config/apiUrl";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { GetWallet } from '../payment/api/GetWallet'
import VerifyPayment from '../payment/VerifyPayment'
import { apiPayment } from '../../config/apiUrl'
import { GetBankAccount } from '../payment/api/BankAccountApi'

export default function AddAdv() {
  //  >>Payment
  let [counter, setCounter] = useState(0);
  let text = " . . . . . . . . ".split("")
  let [loadingText, setLoadingText] = useState(text[0])
  let [refresh, setRefresh] = useState(false)
  let [showVerifyPin, setShowVerifyPin] = useState(false)
  let [loading, setLoading] = useState(false)
  let [verified, setVerified] = useState(null)
  let [paid, setPaid] = useState(false)
  let [transferBank, setTransferBank] = useState(false)
  let [paymentBy, setPaymentBy] = useState('wallet')
  let [expired, setExpired] = useState()
  let [token, setToken] = useState('')
  let apiToken = apiPayment + "/walletTransaction/generate-token"
  let [watrNumbers,setWatrNumbers] = useState()

  let [listBank, setListBank] = useState([])
  let [selectedBank, setSelectedBank] = useState()

  const [data, setData] = useState({
    "acco_id": localStorage.getItem("dataAccountId"),
    "total_amount": 0,
    "transaction_type": "advertising",
    "payment_by": "wallet"
  })

  //Payment<<

  let history = useHistory();
  const acco_id = localStorage.getItem("dataAccountId")
  const adv_id = localStorage.getItem("adv_id")
  const { register, handleSubmit, watch, errors, reset, setValue } = useForm();
  const [Package, setPackage] = useState("Per Click")
  const [Pack, setPack] = useState([])
  const [Amount, setAmount] = useState(0)
  const [BillAmount, setBillAmount] = useState(0)
  const [wallet, setWallet] = useState()

  // console.log(watch("example")); // watch input value by passing the name of it

  const [Product, setProduct] = useState([]);
  useEffect(() => {
    fetchProduct();
    fetchPack()
    fecthWallet()
  }, []);

  const fecthWallet = async () => {
    try {
      let result = await GetWallet(acco_id)
      setWallet(result[0])
      return result[0]
    } catch (error) {
      console.log(error)
      return error
    }
  }

  const fetchProduct = async () => {
    return await axios({
      url: `${apiProductTransaction}/product/${adv_id}`,
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  };

  const fetchPack = async () => {
    return await axios({
      url: `${apiAdvertising}/packageType/`,
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => setPack(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(async () => {
    data.bacc_id = selectedBank
    if (loading) {
      if (counter > text.length - 1) {
        setCounter(0)
        setLoadingText("")
        setRefresh(!refresh)
      } else {
        setCounter(counter + 1)
        setTimeout(() => {
          setLoadingText(loadingText + text[counter])
          setRefresh(!refresh)
        }, 500)
      }
    }
  }, [loading, refresh, paymentBy, selectedBank])

  useEffect(async () => {
    try {
      let gotBankAccount = await GetBankAccount(data.acco_id)
      setListBank(gotBankAccount)
    } catch (error) {
      console.log(error)
    }
  }, [paymentBy])

  useEffect(()=>{
    data.total_amount = BillAmount*Amount
  },[Amount,BillAmount])

  const onSubmit = async (data) => {
    console.log(data)
    // console.log(BillAmount*Amount)
    data.total_amount = BillAmount*Amount
    
    if (wallet < BillAmount*Amount) {
      alert("Salo Kurang")
    } else {
      switch (paymentBy) {
        case "wallet":
          try {
            data.payment_by = "wallet"
            setLoading(true)
            setTimeout(() => {
              setLoading(false)
              setShowVerifyPin(true)
            }, 2000)
            submit()
          } catch (error) {
            console.log(error)
          }
          break;
        case "transfer_bank":
          try {
            data.payment_by = "transfer_bank"
            setLoading(true)
            let gotToken = await axios.post(apiToken, data)
            setTimeout(() => {
              setToken(apiPayment + "/walletTransaction/transfer-bank/" + gotToken.data)
              setTransferBank(true)
              setLoading(false)
            }, 2000)
            submit()
          } catch (error) {
            console.log(error)
          }
        default:
          break;
      }
    }
    
    reset()
  }

  const submit = async () => {
    try {
      if(watrNumbers){
        const order_advertising = {
          orad_publish_on : data.publishedDate,
          orad_finished_on : data.finishedDate,
          orad_bill_amount : data.totalBill,
          orad_watr_numbers: watrNumbers,
          orad_acco_id : acco_id,
          orad_stat_name : 'new',
          orad_pack_name : Package.pack_name
        }
        const order_advertising_product = {
          orap_total_duration: Package.pack_duration,
          orap_total_amount: Package.pack_amount,
          orap_total_duration: Package.pack_duration,
          orap_total_amount: Package.pack_amount,
          orap_total_duration: Package.pack_duration,
          orap_stat_name: 'new',
          orap_prod_id: adv_id      
        }
        const orderAdverting = await axios.post(`${apiAdvertising}/orderAdvertising/`,order_advertising)
        if(orderAdverting) return await axios.post(`${apiAdvertising}/orderAdvertisingProduct/${orderAdverting.orad_id}`,order_advertising_product)
      }  
    } catch (error) {
      console.log(error)
    }
  }

  // useEffect(()=>{
  //   console.log(watrNumbers)
  // },[watrNumbers])

  const onChangeSelectedBank = (e) => {
    setSelectedBank(e.target.value)
  }

  const onChangePayment = (e) => {
  try {
    if(wallet.wale_saldo < BillAmount*Amount){
      alert("Saldo Kurang"+wallet.wale_saldo)
    }
  } catch (error) {
    console.log(error)
  }
    setPaymentBy(e.target.value)
  }

  return (
    <div>
      {
        loading ?
          <div className="grid w-full h-full mx-auto mt-10 my-2 text-center border shadow-md border-primary rounded-md overflow-hidden text-black bg-white">
            <h1 className="font-bold">PROCESSING YOUR REQUEST {loadingText}</h1>
          </div> :
          showVerifyPin ?
            <VerifyPayment
              wale_id={data.wale_id}
              acco_id={data.acco_id}
              setShowVerifyPin={setShowVerifyPin}
              setVerified={setVerified}
              verified={verified}
              setLoading={setLoading}
              setPaid={setPaid}
              data={data}
              setWatrNumbers={setWatrNumbers}
            />
            : transferBank ?
              <div className=" w-screen content-center mt-4 ml-4">
                {/* <QRCode value={token.toString()} /> */}
                <h1>Link Payment will be expired in 48 hours</h1>
                <a href={token}>
                  <button className="w-2/12 h-8 bg-gray-700 text-white rounded-md">Pay</button>
                </a>
              </div>
              : paid ? <div className="h-screen w-full text-center">
                <h1 className="text-4xl">Pembayaran Berhasil</h1>
                <a href="/advertising/my-pkg" className="bg-primary text-white h-1/6 px-4 rounded-md">KEMBALI</a>
              </div> :
                <div className="flex flex-wrap">
                  <div className="w-full md:w-3/12 md:mt-10 px-1 text-center font-bold text-md flex flex-row justify-evenly md:flex-col md:justify-start ">
                    <div
                      className="py-5 px-2 hover:text-secondary hover:bg-white"
                      style={{ cursor: "pointer" }}
                      onClick={() => history.push("/advertising/my-pkg")}
                    >
                      Package Adv
                </div>
                    <div
                      className="py-5 px-2 hover:text-secondary hover:bg-white"
                      style={{ cursor: "pointer" }}
                      onClick={() => history.push("/advertising/my-adv")}
                    >
                      My Product
                </div>
                    <div
                      className="py-5 px-2 hover:text-secondary hover:bg-white"
                      style={{ cursor: "pointer" }}
                      onClick={() => history.push("/advertising/add-adv")}
                    >
                      Advertising
                </div>
                  </div>
                  <div className="w-full md:w-9/12">
                    {Product.product_images && <img src={Product.product_images[0] ? Product.product_images[0].prim_path : "../adv.jpg"} class=" ml-5 rounded-lg inset-0 w-64 h-64 object-cover " alt="product" style={{ display: 'block', margin: 'auto' }} />}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="flex flex-col content-evenly xl:px-32 md:px-24 p-5">
                        <label>Published Date</label>
                        <input
                          name="publishedDate"
                          type="date"
                          ref={register({ required: true })}
                          className="bg-gray-200 rounded"
                        />
                        {errors.publishedDate && (
                          <span className="text-red-500">This field is required</span>
                        )}

                <label className="mt-5">Package Type</label>
                <select
                  name="packageType"
                  onChange={(e) => {
                    var index = e.target.selectedIndex;
                    setAmount(e.target.value);
                    Pack.map(x=>{
                      if(e.target[index].text===x.pack_name)
                      return setPackage(x)
                    })
                  }}
                  ref={register}
                  className="bg-gray-200 rounded p-1"
                  required
                >
                  <option value="" disabled selected >Select Your Package</option>
                  {Pack.map((x) => (
                    <option value={x.pack_amount}>{x.pack_name}</option>
                  ))}
                </select>

                {Package.pack_name?.includes("hari") && (
                  <>
                    <label className="mt-5">Finished Date</label>
                    <input
                      name="finishedDate"
                      type="date"
                      className="bg-gray-200 rounded p-1"
                    />
                    {errors.finishedDate && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </>
                )}
                <label className="mt-5">Amount</label>
                <input
                  name="amount"
                  type="number"
                  ref={register({ required: true })}
                  className="bg-gray-200 rounded p-1"
                  onChange={(e) => setBillAmount(e.target.value)}
                  min="1"
                />
                {errors.amount && (
                  <span className="text-red-500">This field is required</span>
                )}

                        <label className="mt-5">Total Bill Amount</label>
                        <input
                          name="totalBill"
                          type="number"
                          className="bg-gray-200 rounded p-1"
                          ref={register}
                          value={BillAmount * Amount}
                        />
                        <label className="mt-5">
                          Payment By
                        </label>
                        <select className="bg-gray-200 rounded p-1" value={paymentBy} onChange={onChangePayment}>
                          <option>Select Payment Option</option>
                          <option value="wallet">Wallet</option>
                          <option value="transfer_bank">Trasfer Bank</option>
                        </select>
                        {paymentBy == "transfer_bank" && listBank.length > 1 ?
                          <select className="bg-gray-200 rounded p-1" value={selectedBank} onChange={onChangeSelectedBank} >
                            <option>Select Bank</option>
                            {
                              listBank.map((x) => {
                                return <option value={x.bacc_id}>{x.bank.bank_name}</option>
                              })
                            }
                          </select>
                          : null
                        }

                        {errors.totalBill && (
                          <span className="text-red-500">This field is required</span>
                        )}
                        <input type="submit" className="mt-10 bg-primary rounded p-2 w-64 text-white font-bold block m-auto cursor-pointer" onClick={() => setValue("totalBill", BillAmount * Amount)} />

                      </div>
                    </form>
                  </div>
                </div>
      }
    </div>
  );
}
