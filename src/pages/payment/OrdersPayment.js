import { OrdersCheckout } from './OrdersCheckout'
import { useState, useEffect } from "react";
import { CreateNewTransaction } from './api/CreateNewTransaction'
import VerifyPayment from './VerifyPayment'
import { apiPayment } from '../../config/apiUrl'
import {ModalPayment} from './ModalPayment'
import axios from "axios";
import QRCode from "react-qr-code";
import { GetBankAccount } from './api/BankAccountApi'

const OrdersPayment = () => {
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
    let [expired, setExpired] = useState()
    let [token, setToken] = useState('')
    let apiToken = apiPayment + "/walletTransaction/generate-token"

    let [listBank, setListBank] = useState([])
    let [selectedBank, setSelectedBank] = useState(null)
    const [data, setData] = useState({
        "acco_id": localStorage.getItem("dataAccountId"),
        "total_amount":null,
        "transaction_type": "order",
        "order_name": "#",
        "payment_by": "wallet"
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
    }, [loading, refresh, paymentBy, selectedBank])

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

    useEffect(()=>{
        if(paid){
            setTimeout(()=>{
                setPaid(false)
            },5000)
        }
    },[paid])

    useEffect(async () => {
        try {
            let gotBankAccount = await GetBankAccount(data.acco_id)
            setListBank(gotBankAccount)
        } catch (error) {
            console.log(error)
        }
    }, [paymentBy])

    const onChangeSelectedBank = (e) => {
        setSelectedBank(e.target.value)
    }

    const onChangePayment = (e) => {
        setPaymentBy(e.target.value)
    }

    return (
        <>
            {
                loading ?
                    <div className="grid h-screen">
                        <h1 className="w-80 mx-auto px-2 py-2 text-center overflow-hidden text-black font-bold">PROCESSING YOUR REQUEST {loadingText}</h1>
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
                            : paid ? 
                            <div className="flex flex-col h-screen text-center">
                            <header className="h-10 mt-2">
                                <h1 className="font-bold text-4xl">Pembayaran Berhasil</h1>
                            </header>
                            </div> : 
                        <ModalPayment
                        data={data}
                        setShowVerifyPin={setShowVerifyPin}
                        setPaymentBy={setPaymentBy}
                        />
            }
        </>
    )
}

export default OrdersPayment