import React, { useEffect, useState } from 'react'
import {Pricecardpulsa} from './component/pricecardPulsa'
import PricecardInternet from './component/pricecardInternet'
import GameCard from './component/gameCard'
import Pricevouchergame from './component/pricevoucherGame'
import PricecardPLN from './component/pricecardPLN'
import PricecardPdam from './component/pricecardPdam'
import axios from 'axios'
import { apiTopup } from '../../config/apiUrl'
import VerifyPayment from '../payment/VerifyPayment'
import {apiPayment} from '../../config/apiUrl'
import {toast} from 'react-toastify'
import {useHistory} from "react-router-dom"
import convertToRupiah from './convertToRupiah'
import {GetWallet} from '../payment/api/GetWallet'

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  const [Pulsa, setPulsa] = useState([]);
  const [Bill, setBill] = useState([]);
  const [VPdam, setVPdam] = useState([]);
  const [internet, setInternet] = useState("")
  const [pdam, setPdam] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [flag, setFlag] = useState(false);
  const [vGame, setVGame] = useState([]);
  const [Pln, setPLN] = useState([])
  const [tokenNum, setTokenNum] = useState("")
  let [gameCard, setGameCard] = useState("Steam")
  //State for get value Internet
  const [internetAccId,setInternetAccId] = useState("")
  const [internetAmount,setInternetAmount] = useState(0)
  //State for get value Pulsa
  const [valCard,setValCard] = useState(0)
  //State for get value voucher game
  let [valCardGame,setValCardGame] = useState(0)
  const [valAmountGame,setValAmountGame] = useState(0)
  //State for get value token PLN  
  let [valCardPln,setValCardPln] = useState(0)
  //State for get value PDAM
  const [pdamAccId,setPdamAccId] = useState("")
  const [pdamAmount,setPdamAmount] = useState(0)

  const userId = localStorage.getItem('dataAccountId')
  const [showVerifyPin,setShowVerifyPin] = useState(false)
  
  const [data,setData] = useState({})
  const history = useHistory();

  const [wallet,setWallet] = useState([])
  
  const routeSummaryPulsa = () => {
    let path = `/summaryPulsa`
    
    
    history.push(path)
  }

  const routeSummaryInternet = () => {
    let path = `/summaryInternet`
    history.push(path)
  }

  const routeSummaryGame = () => {
    let path = `/summaryGame`
    history.push(path)
  }

  const routeSummaryPLN = () => {
    let path = `/summaryPLN`
    history.push(path)
  }

  const routeSummaryPDAM = () => {
    let path = `/summaryPDAM`
    history.push(path)
  }

  toast.configure()
  const notify = () => {
       
    toast.info('Order Successful', {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000
    })
  }

  useEffect(() => {
    fetchPulsa()
    //fetchBill()
    // fetchVGame()
    fetchWallet()
  }, [flag === true])


  useEffect(() => {
    console.log('usereffect : ' + gameCard);
    fetchVGame()
    
  }, [gameCard])


  useEffect(()=>{
    if (Bill.account !== undefined){
    setInternetAccId(Bill.account.acco_id)
    setInternetAmount(Bill.vendor.vendor_rules[0].veru_bill_price)
    }
    
  },[Bill])

  useEffect(()=>{
    if (VPdam.account !== undefined){
    setPdamAccId(VPdam.account.acco_id)
    setPdamAmount(VPdam.vendor.vendor_rules[0].veru_bill_price)
    }
    
  },[VPdam])

  const onChangePln = (e) => {
    const value = e.target.value;
    setTokenNum(value)
    console.log(value);
  }

  const handleKeypressPLN = (e) => {
    if (e.keyCode == 13) {
      console.log('keycode enter')
      console.log('key enter ' + e.target.value)
      // setInternet(e.target.value);
      setFlag(true)
      console.log('TokenPLN : ' + { tokenNum })
      fetchPLN();
    }
  }


  const onChangeToken = (e) => {

    const value = e.target.value;
    setInternet(value);
    console.log(value);

  }

  const onChangePdam = (e) => {

    const value = e.target.value;
    setPdam(value);
    console.log(value);

  }

  const onChangePhoneNumber = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    console.log(value);
  }

  const handleKeypress = (e) => {
    if (e.keyCode == 13) {
      console.log('keycode enter')
      console.log('key enter ' + e.target.value)
      // setInternet(e.target.value);
      setFlag(true)
      console.log('internet : ' + { internet })
      fetchBill();
      console.log('id nyaa '+userId)
      
    }
  }

  const handleKeypressPdam = (e) => {
    if (e.keyCode == 13) {
      console.log('keycode enter')
      console.log('key enter ' + e.target.value)
      // setInternet(e.target.value);
      setFlag(true)
      console.log('pdam : ' + {pdam})
      fetchPdam();
    }
  }

  //---BUTTON ADD---
  const addPulsa = async () =>{

    addWatrNumberPulsa()
    // setTimeout(()=>{})
    // addBillPulsa();
    notify()
    setPhoneNumber("")
    console.log('Succes Input Data');
    
  }


  const addInternet =()=>{
    console.log('Clicked');
    console.log(internet);
    // setInternetAccId(Bill.account.acco_id)
    // setInternetAmount(Bill.vendor.vendor_rules[0].veru_bill_price)
    console.log('this is account Id: '+internetAccId);
    console.log('this is Amount : '+internetAmount);
    // addBillInternet()
    addWatrNumberInternet()
    
    notify()
    setInternet("")

  }

  const addVouchergame = () => {
    addWatrNumberGame()
    // routeSummaryGame()
    console.log(gameCard);
    console.log(valAmountGame);
    notify()
    console.log('--Input data success--');
  }

  const addPLN = ()=>{
    addWatrNumberPLN()
    notify()
    setTokenNum("")
    console.log('--Input data success--');
  }

  const addPDAM = ()=>{
    addWatrNumberPDAM()
    
    notify()
    setPdam("")
    console.log('--Input data success--');
  }
  const fetchPLN = async () => {
    return await axios({
      url: `${apiTopup}/vendor/byVendorName/PLN`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).
      then((res) => {
        setPLN(res.data)
        console.log(res.data)
      }).
      catch((err) => console.log(err))
  }


  const fetchWallet = async () =>{
    try {
      let walletData = await GetWallet(userId)
      setWallet(walletData)
    } catch (error) {
      console.log(error);
    }
  }

  const fetchBill = async () => {
    return await axios({
      url: `${apiTopup}/billCustomer/readbytoken/${internet}`,
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
    }).
      then((res) => {
        setBill(res.data)
        console.log('result bill : ')
        console.log(res.data);
        
      }).catch((err) => console.log(err))
  }

  const fetchPdam = async () => {
    return await axios({
      url: `${apiTopup}/billCustomer/readbytoken/${pdam}`,
      method: "get",
      headers: {
        "Content-Type": "application/json"
      },
    }).
      then((res) => {
        setVPdam(res.data)
        console.log('result pdam : ')
        console.log(res.data);
      }).catch((err) => console.log(err))
  }

  const fetchVGame = async () => {
    return await axios({
      url: `${apiTopup}/vendor/byVendorName/${gameCard}`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).
      then((res) => {
        setVGame(res.data)
        console.log(res.data)
      }).
      catch((err) => console.log(err))
  }


  const fetchPulsa = async () => {
    return await axios({
      url: `${apiTopup}/vendor`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    }).
      then((res) => {
        setPulsa(res.data)
        console.log(res.data)
      }).
      catch((err) => console.log(err))
  }

  //--POST WALLETTRANSACTION--
  const addWatrNumberPulsa = () => {

      let acco_id = userId
      let total_amount = valCard
      let transaction_type = "billing"
      let vendor= "TELKOMSEL"
      let payment_by = "wallet"
      let pin_number = 111111

    const data = {
      acco_id: acco_id,
      total_amount: total_amount ,
      transaction_type: transaction_type,
      vendor: vendor,
      payment_by: payment_by,
      pin_number : pin_number,
      order_name:null
    };
    console.log(data);
    axios.post(`${apiPayment}/walletTransaction`, data).
    then((result)=>{
      console.log(result)
      console.log(result.data);
      addBillPulsa(result.data.watr_numbers)
      
    }).
      catch((err) => {
        console.log(err);
      })
  }

  const addWatrNumberInternet = () => {

    let acco_id = internetAccId
    let total_amount = internetAmount
    let transaction_type = "billing"
    let vendor= "TELKOM"
    let payment_by = "wallet"
    let pin_number = 111111

  const data = {
    acco_id: acco_id,
    total_amount: total_amount ,
    transaction_type: transaction_type,
    vendor: vendor,
    payment_by: payment_by,
    pin_number : pin_number,
    order_name:null
  };

  axios.post(`${apiPayment}/walletTransaction`, data).
  then((result)=>{
    console.log(result.data);
    addBillInternet(result.data.watr_numbers)
    
  }).
    catch((err) => {
      console.log(err);
    })
}

const addWatrNumberGame = () => {

  let acco_id = userId
  let total_amount = valCardGame
  let transaction_type = "billing"
  let vendor = gameCard 
  let payment_by = "wallet"
  let pin_number = 111111

const data = {
  acco_id: acco_id,
  total_amount: total_amount ,
  transaction_type: transaction_type,
  vendor: vendor,
  payment_by: payment_by,
  pin_number : pin_number,
  order_name:null
};

axios.post(`${apiPayment}/walletTransaction`, data).
then((result)=>{
  console.log(result.data);
  addBillVGame(result.data.watr_numbers)
  
}).
  catch((err) => {
    console.log(err);
  })
}

const addWatrNumberPLN = () => {

  let acco_id = userId
  let total_amount = valCardPln
  let transaction_type = "billing"
  let vendor = "PLN" 
  let payment_by = "wallet"
  let pin_number = 111111

const data = {
  acco_id: acco_id,
  total_amount: total_amount ,
  transaction_type: transaction_type,
  vendor: vendor,
  payment_by: payment_by,
  pin_number : pin_number,
  order_name:null
};

axios.post(`${apiPayment}/walletTransaction`, data).
then((result)=>{
  console.log(result.data);
  addBillPln(result.data.watr_numbers)
  
}).
  catch((err) => {
    console.log(err);
  })
}

const addWatrNumberPDAM = () => {

  let acco_id = pdamAccId
  let total_amount = pdamAmount
  let transaction_type = "billing"
  let vendor = "PDAM" 
  let payment_by = "wallet"
  let pin_number = 111111

const data = {
  acco_id: acco_id,
  total_amount: total_amount ,
  transaction_type: transaction_type,
  vendor: vendor,
  payment_by: payment_by,
  pin_number : pin_number,
  order_name:null
};

axios.post(`${apiPayment}/walletTransaction`, data).
then((result)=>{
  console.log(result.data);
  addBillPdam(result.data.watr_numbers)
  
}).
  catch((err) => {
    console.log(err);
  })
}

//--END OF POST WALLET TRANSACTION--


  //--- INPUT BILL TOPUP---
  const addBillPulsa = (watrnumber) => {
    let date = new Date()
    let bito_created_on = date  
    let bito_type = "Topup"
    let bito_amount = valCard
    let bito_desc = "Pembelian Pulsa"
    let bito_watr_numbers = watrnumber
    let bito_token = phoneNumber
    let bito_vendor_name = "TELKOMSEL"
    let bito_acco_id = userId
    
   

    const data = {
      bito_created_on: bito_created_on,
      bito_type: bito_type,
      bito_amount: bito_amount,
      bito_desc: bito_desc,
      bito_watr_numbers: bito_watr_numbers,
      bito_token: bito_token,
      bito_vendor_name: bito_vendor_name,
      bito_acco_id: bito_acco_id,
      
    };

    axios.post(`${apiTopup}/billTopup/insertbillTopup`, data).
    then((result)=>{
      console.log(result.data);
      // setBitoId(result.data.bito_id);
      console.log(result.data.bito_id);
      window.localStorage.setItem('bitoId',result.data.bito_id)
      routeSummaryPulsa()
    }).
      catch((err) => {
        console.log(err);
      })
  }

  const addBillInternet = (watrnumber) => {
    let date = new Date()
    let bito_created_on = date  
    let bito_type = "Bill"
    let bito_amount = internetAmount
    let bito_desc = "Pembayaran Tagihan Indihome"
    let bito_watr_numbers = watrnumber
    let bito_token = internet
    let bito_vendor_name = "TELKOM"
    let bito_acco_id = internetAccId

    const data = {
      bito_created_on: bito_created_on,
      bito_type: bito_type,
      bito_amount: bito_amount,
      bito_desc: bito_desc,
      bito_watr_numbers: bito_watr_numbers,
      bito_token: bito_token,
      bito_vendor_name: bito_vendor_name,
      bito_acco_id: bito_acco_id,
      
    };

    axios.post(`${apiTopup}/billTopup/insertbillTopup`, data).
    then((result)=>{
      console.log(result.data);
      window.localStorage.setItem('bitoId',result.data.bito_id)
      routeSummaryInternet()
    }).
      catch((err) => {
        console.log(err);
      })
  }

  const addBillVGame = (watrnumber) => {
    let date = new Date()
    let bito_created_on = date  
    let bito_type = "Topup"
    let bito_amount = valCardGame
    let bito_desc = "Pembelian Voucher Game"
    let bito_watr_numbers = watrnumber
    let bito_token = valAmountGame
    let bito_vendor_name = gameCard
    let bito_acco_id = userId


    const data = {
      bito_created_on: bito_created_on,
      bito_type: bito_type,
      bito_amount: bito_amount,
      bito_desc: bito_desc,
      bito_watr_numbers: bito_watr_numbers,
      bito_token: bito_token,
      bito_vendor_name: bito_vendor_name,
      bito_acco_id: bito_acco_id,
      
    };

    axios.post(`${apiTopup}/billTopup/insertbillTopup`, data).
    then((result)=>{
      console.log(result.data);
      window.localStorage.setItem('bitoId',result.data.bito_id)
      routeSummaryGame()
    }).
      catch((err) => {
        console.log(err);
      })
  }

  const addBillPln = (watrnumber) => {
    let date = new Date()
    let bito_created_on = date  
    let bito_type = "Topup"
    let bito_amount = valCardPln
    let bito_desc = "Pembelian Token Listrik"
    let bito_watr_numbers = watrnumber
    let bito_token = tokenNum
    let bito_vendor_name = "PLN"
    let bito_acco_id = userId

    const data = {
      bito_created_on: bito_created_on,
      bito_type: bito_type,
      bito_amount: bito_amount,
      bito_desc: bito_desc,
      bito_watr_numbers: bito_watr_numbers,
      bito_token: bito_token,
      bito_vendor_name: bito_vendor_name,
      bito_acco_id: bito_acco_id,
      
    };

    axios.post(`${apiTopup}/billTopup/insertbillTopup`, data).
    then((result)=>{
      console.log(result.data);
      window.localStorage.setItem('bitoId',result.data.bito_id)
      routeSummaryPLN()
    }).
      catch((err) => {
        console.log(err);
      })
  }

  const addBillPdam = (watrnumber) => {
    let date = new Date()
    let bito_created_on = date  
    let bito_type = "Bill"
    let bito_amount = pdamAmount
    let bito_desc = "Pembayaran Tagihan Air Pam"
    let bito_watr_numbers = watrnumber
    let bito_token = pdam
    let bito_vendor_name = "TELKOM"
    let bito_acco_id = pdamAccId

    setData({
      "acco_id": bito_acco_id,
      "total_amount": bito_amount ,
      "transaction_type": "billing",
      "vendor": bito_vendor_name,
      "payment_by":"wallet"
    })
    const data = {
      bito_created_on: bito_created_on,
      bito_type: bito_type,
      bito_amount: bito_amount,
      bito_desc: bito_desc,
      bito_watr_numbers: bito_watr_numbers,
      bito_token: bito_token,
      bito_vendor_name: bito_vendor_name,
      bito_acco_id: bito_acco_id,
      
    };

    axios.post(`${apiTopup}/billTopup/insertbillTopup`, data).
    then((result)=>{
      console.log(result.data);
      window.localStorage.setItem('bitoId',result.data.bito_id)
      routeSummaryPDAM()
    }).
      catch((err) => {
        console.log(err);
      })
  }

  return (

    <>

      {
        showVerifyPin ? <VerifyPayment
        data = {data}
        setShowVerifyPin = {setShowVerifyPin}
        /> :
      
      <div className="flex flex-wrap">
        <div className="w-full">
        <div className="font-sans ml-2 w-4/12 mt-2 h-36 bg-pink-100 border-2 border-primary flex-wrap shadow-lg rounded-lg text-white font-light pl-2">
          <div class="p-4">
            <span class="fas fa-wallet text-pink-500 text-xl"/>
            <span class="ml-2 font-semibold text-xl text-pink-500">My Wallet</span>
            <hr className="mt-1 border-b-2 border-table"/>
            <span class="float-left text-base font-semibold text-pink-400">ID Account</span>
            <span class="float-right text-base font-semibold text-pink-700">{wallet[0]?.wale_acco_id}</span>
            <br/>
            <span class="float-left text-base font-semibold text-pink-400">ID Wallet</span>
            <span class="float-right text-base font-semibold text-pink-700">{wallet[0]?.wale_id}</span>
            <br/>
            <span class="float-left text-base font-semibold text-pink-400">Balance</span>
            <span class="float-right text-base font-semibold text-pink-700">{convertToRupiah(wallet[0]?.wale_saldo)}</span>
            <br/>
          </div>
          
        </div>
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-mobile-alt text-base mr-1"></i> Pulsa
                </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-wifi text-base mr-1"></i>  Internet
                </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="fas fa-gamepad text-base mr-1"></i>  Voucher Game
                </a>
            </li>

            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 4
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(4);
                }}
                data-toggle="tab"
                href="#link4"
                role="tablist"
              >
                <i className="fas fa-bolt text-base mr-1"></i>  PLN
                </a>
            </li>

            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 5
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(5);
                }}
                data-toggle="tab"
                href="#link5"
                role="tablist"
              >
                <i className="fas fa-tint text-base mr-1"></i>  PDAM
                </a>
            </li>


          </ul>
          
          <div className="relative flex flex-col min-w-0 break-words bg-table w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <h1 className="font-semibold text-base text-pink-500">Pulsa</h1>
                  <div class="mb-3 pt-2">
                    <input type="text" placeholder="Nomer Telepon" name="phoneNumber" value={phoneNumber} onChange={onChangePhoneNumber} class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" />
                  </div>
                  
                  <div class="flex flex-wrap">
                    
                    {Pulsa.map((x) => {
                      
                      if (x.vendor_name === "TELKOMSEL") {
                        return x.vendor_rules.map((y) => {
                          const onClickVal = (e) =>{
                            const value = e.target.value = y.veru_bill_price
                            console.log(value);
                            setValCard(value) 
                        }
                          return (
                            <>
                              <div value={valCard} onClick={onClickVal} class="cursor-pointer h-30 w-40 m-4 bg-white rounded-lg shadow-lg p-6 hover:bg-gray-200" tabIndex="0">
                              <Pricecardpulsa
                                nominal={y.veru_bill_amount}
                                harga={y.veru_bill_price}
                              />
                              </div>
                            </>
                          )
                        })

                      }
                    }

                    )}
                  </div>


                  <div class="grid justify-items-stretch">
                    <button class="justify-self-end bg-button text-green-700 font-bold text-sm px-4 py-3 rounded shadow hover:bg-green-300 outline-none focus:outline-none mr-1 mb-1" 
                    type="button" 
                    style={{ transition: "all .15s ease" }}
                    onClick={addPulsa}>
                      Beli Sekarang
                    </button>
                  </div>

                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <h1 className="font-semibold text-base text-pink-500">Tagihan Internet</h1>
                  <div class="mb-3 pt-2">
                    <input type="text" name="token" value={internet} onChange={onChangeToken} onKeyDown={handleKeypress} placeholder="No Tagihan" class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" />
                  </div>


                  <div class="flex flex-wrap">
                    {
                      Bill.bilc_id > 0 ?
                        
                        <PricecardInternet
                          vendor={Bill.bilc_vendor_name}
                          nama={Bill.account.acco_nama}
                          harga={Bill.vendor.vendor_rules[0].veru_bill_price}
                          no_tagihan={Bill.bilc_token}
                          deskripsi={Bill.vendor.vendor_rules[0].veru_desc}
                        />
                        : null
                    }

                  </div>


                  <div class="grid justify-items-stretch">
                    <button class="justify-self-end bg-button text-green-700 font-bold text-sm px-4 py-3 rounded shadow hover:bg-green-300 outline-none focus:outline-none mr-1 mb-1" 
                    type="button" 
                    style={{ transition: "all .15s ease" }}
                    onClick={addInternet}
                    >
                      Beli Sekarang
                            </button>
                  </div>
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                  <h1 className="font-semibold text-base text-pink-500">Voucher Game</h1>
                  <div class="flex justify-center flex-wrap">
                    {Pulsa.map((x) => {
                      let onClickGame = (e) => {
                        let value = e.target.value = x.vendor_name
                        console.log('hasil : ' + value);
                        setGameCard(value)
                        //fetchVGame()
                      }


                      if (x.vendor_name === 'Steam') {
                        return (
                          <>
                            <div value={gameCard} onClick={onClickGame} class="cursor-pointer h-32 w-32 m-6 bg-white rounded-lg shadow-lg p-6 hover:bg-gray-200" tabIndex="0">
                              <div class="flex justify-center">
                                <img class="h-10 w-10" src="./steam.png" />
                              </div>
                              <GameCard
                                vendor={x.vendor_name}
                              />
                            </div>


                          </>
                        )
                      }
                      else if (x.vendor_name === 'MobileLegends') {
                        return (
                          <>
                            <div value={gameCard} onClick={onClickGame} class="cursor-pointer h-32 w-32 m-6 bg-white rounded-lg shadow-lg p-6 hover:bg-gray-200" tabIndex="0">
                              <div class="flex justify-center">
                                <img class="h-10 w-10" src="./mobile_legends.png" />
                              </div>
                              <GameCard
                                vendor={x.vendor_name}
                              />
                            </div>

                          </>
                        )
                      }

                      else if (x.vendor_name === 'Garena') {
                        return (
                          <>
                            <div value={gameCard} onClick={onClickGame} class="cursor-pointer h-32 w-32 m-6 bg-white rounded-lg shadow-lg p-6 hover:bg-gray-200" tabIndex="0">
                              <div class="flex justify-center">
                                <img class="h-10 w-10" src="./garena.png" />
                              </div>
                              <GameCard
                                vendor={x.vendor_name}
                              />
                            </div>

                          </>
                        )
                      }

                      else if (x.vendor_name === 'PUBG') {
                        return (
                          <>
                            <div value={gameCard} onClick={onClickGame} class="cursor-pointer h-32 w-32 m-6 bg-white rounded-lg shadow-lg p-6 hover:bg-gray-200" tabIndex="0">
                              <div class="flex justify-center">
                                <img class="h-10 w-10" src="./pubg.png" />
                              </div>
                              <GameCard
                                vendor={x.vendor_name}
                              />
                            </div>

                          </>
                        )
                      }
                    })
                    }
             
                  </div>
                  <div class="flex justify-center flex-wrap">
                  {
                      vGame.vendor_rules && vGame.vendor_rules.map((x) => {
                        const onClickValGame = (e) =>{
                          const amountGame = x.veru_bill_amount
                          const value = e.target.value = x.veru_bill_price
                          console.log(value);
                          setValCardGame(value)
                          setValAmountGame(amountGame)
                           
                      }
                        return (
                          <>
                          <div value={valCardGame} onClick={onClickValGame} class="cursor-pointer h-30 w-40 m-4 bg-white rounded-lg shadow-lg p-6 hover:bg-gray-200" tabIndex="0">
                            <Pricevouchergame
                              nominal={x.veru_bill_amount}
                              harga={x.veru_bill_price} />
                          </div>
                          </>
                        )
                      })
                    }
                  </div>

                  <div class="grid justify-items-stretch">
                    <button class="justify-self-end bg-button text-green-700 font-bold text-sm px-4 py-3 rounded shadow hover:bg-green-300 outline-none focus:outline-none mr-1 mb-1" 
                    type="button" 
                    style={{ transition: "all .15s ease" }}
                    onClick={addVouchergame}>
                      Beli Sekarang
                    </button>
                  </div>

                </div>
                <div className={openTab === 4 ? "block" : "hidden"} id="link4">
                  <h1 className="font-semibold text-base text-pink-500">No Pelanggan PLN</h1>
                  <div class="mb-3 pt-2">
                    <input type="text" placeholder="Token Number" name="tokenNum" value={tokenNum} onChange={onChangePln} onKeyDown={handleKeypressPLN} class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" />
                  </div>

                  <div class="flex flex-wrap">

                    {Pln.vendor_rules && Pln.vendor_rules.map((x) => {
                      const onClickValPln = (e) =>{
                        const value = e.target.value = x.veru_bill_price
                        console.log(value);
                        setValCardPln(value) 
                    }

                      return (
                        <>
                          <div value={valCardPln} onClick={onClickValPln} class="cursor-pointer h-30 w-40 m-4 bg-white rounded-lg shadow-lg p-6 hover:bg-gray-200" tabIndex="0">
                          <PricecardPLN
                            nominal={x.veru_bill_amount}
                            harga={x.veru_bill_price} />
                          </div>
                        </>
                      )
                    })
                    }
                  </div>


                  <div class="grid justify-items-stretch">
                    <button class="justify-self-end bg-button text-indigo-600 font-bold text-sm px-4 py-3 rounded shadow hover:bg-green-300 outline-none focus:outline-none mr-1 mb-1" 
                    type="button" 
                    style={{ transition: "all .15s ease" }}
                    onClick={addPLN}>
                      Beli Sekarang
                        </button>
                  </div>

                </div>

                <div className={openTab === 5 ? "block" : "hidden"} id="link5">
                  <h1 className="font-semibold text-base text-pink-500">Tagihan PDAM</h1>
                  <div class="mb-3 pt-2">
                    <input type="text" name="token" value={pdam} onChange={onChangePdam} onKeyDown={handleKeypressPdam} placeholder="No Tagihan" class="px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline w-full" />
                  </div>


                  <div class="flex flex-wrap">
                    {
                      VPdam.bilc_id > 0 ?
                        <PricecardPdam
                          vendor={VPdam.bilc_vendor_name}
                          nama={VPdam.account.acco_nama}
                          harga={VPdam.vendor.vendor_rules[0].veru_bill_price}
                          no_tagihan={VPdam.bilc_token}
                          deskripsi={VPdam.vendor.vendor_rules[0].veru_desc}
                        />
                        : null
                    }

                  </div>


                  <div class="grid justify-items-stretch">
                    <button class="justify-self-end bg-button text-indigo-500 font-bold text-sm px-4 py-3 rounded shadow hover:bg-green-300 outline-none focus:outline-none mr-1 mb-1" 
                    type="button" 
                    style={{ transition: "all .15s ease" }}
                    onClick={addPDAM}
                    >
                      Beli Sekarang
                            </button>
                  </div>
                </div>

              </div>{/*end of tab*/}

            </div>
          </div>
        </div>
      </div>
}
    </>
    
  );
};

export default function TabsRender() {
  return (
    <>
      <Tabs color="pink" />

    </>
  );
}
