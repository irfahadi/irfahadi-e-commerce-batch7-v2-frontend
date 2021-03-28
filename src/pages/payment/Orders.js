import { useState, useEffect } from "react";
import { CreateNewTransaction } from './api/CreateNewTransaction'
import VerifyPayment from './VerifyPayment'
import { apiPayment } from '../../config/apiUrl'
import axios from "axios";
import QRCode from "react-qr-code";
import {GetBankAccount} from './api/BankAccountApi'

const OrdersKw = () => {
    let [counter, setCounter] = useState(0);
    let text = " . . . . . . . . ".split("")
    let [loadingText, setLoadingText] = useState(text[0])
    let [refresh, setRefresh] = useState(false)
    let [showVerifyPin, setShowVerifyPin] = useState(false)
    let [loading, setLoading] = useState(false)
    let [verified, setVerified] = useState(null)
    let [paid, setPaid] = useState(false)
    let [transferBank, setTransferBank] = useState(false)
    let [paymentBy, setPaymentBy] = useState('')
    let [expired,setExpired] = useState()
    let [token, setToken] = useState('')
    let apiToken = apiPayment + "/walletTransaction/generate-token"

    let [listBank,setListBank] = useState([])
    let [selectedBank,setSelectedBank] = useState()

    const [data,setData] = useState({
        "acco_id": localStorage.getItem("dataAccountId"),
        "total_amount": 10,
        "transaction_type": "order",
        "order_name": "order12345",
        "payment_by":"wallet"
    })
    

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
    }, [loading, refresh, paymentBy,selectedBank])

    const onHandleClickPay = async (e) => {
        switch (paymentBy) {
            case "wallet":
                try {
                    data.payment_by = "wallet"
                    setLoading(true)
                    setTimeout(() => {
                        setLoading(false)
                        setShowVerifyPin(true)
                    }, 2000)
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
                } catch (error) {
                    console.log(error)
                }
            default:
                break;
        }
    }

    useEffect(async ()=>{
        try {
            let gotBankAccount = await GetBankAccount(data.acco_id)
            setListBank(gotBankAccount)
        } catch (error) {
            console.log(error)
        }
    },[paymentBy])

    const onChangeSelectedBank = (e) =>{
        setSelectedBank(e.target.value)
    }

    const onChangePayment= (e)=>{
        setPaymentBy(e.target.value)
    }

    return (
        <>


        <div>

        </div>

            <div>
                <p>{data.acco_id}</p>
                <p>{data.wale_id}</p>
                <p>{data.total_amount}</p>
                <p>{data.transaction_type}</p>
                <p>{data.order_name}</p>
                
                <select value={paymentBy} onChange={onChangePayment}>
                    <option>Select Payment Option</option>
                    <option value="wallet">Wallet</option>
                    <option value="transfer_bank">Trasfer Bank</option>
                </select>
                <button className="py-2 px-4 font-extralight text-white rounded-xl bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={onHandleClickPay}>
                    Proceed to Payment
                </button>
                
                {paymentBy =="transfer_bank" && listBank.length > 1 ?
                <select value={selectedBank} onChange={onChangeSelectedBank} >
                    <option>Select Bank</option>
                    {
                        listBank.map((x)=>{
                            return <option value={x.bacc_id}>{x.bank.bank_name}</option>
                        })
                    }
                </select>
                :null
                }

            </div>
            {
                loading ?
                    <div className="grid w-80 mx-auto mt-10 my-2 text-center border shadow-md border-gray-300 rounded-md overflow-hidden text-black bg-gray-100">
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
                        />
                        : transferBank ? 
                        <div className=" w-screen content-center mt-4 ml-4">
                            {/* <QRCode value={token.toString()} /> */}
                            <h1>Link Payment will be expired in 48 hours</h1>
                            <a href={token}>
                                <button className="w-2/12 h-8 bg-gray-700 text-white rounded-md">Pay</button>
                            </a>
                        </div>
                            : paid ? <div>
                                <h1>Pembayaran Berhasil</h1>
                            </div> : null
            }
        </>
    )
}

export default OrdersKw