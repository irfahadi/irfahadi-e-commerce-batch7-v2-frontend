import { OrdersCheckout } from './OrdersCheckout'
import { useState, useEffect } from "react";
import { CreateNewTransaction } from './api/CreateNewTransaction'
import VerifyPayment from './VerifyPayment'
import { apiPayment } from '../../config/apiUrl'
import axios from "axios";
import QRCode from "react-qr-code";
import { GetBankAccount } from './api/BankAccountApi'
import MyWallet from './MyWallet'
import {numberWithCommas} from '../../utils/utils'
import {GetWallet} from './api/GetWallet'

const ModalPayment = (props) => {
    const [saldo,setSaldo] = useState()
    const [data, setData] = useState(props.data)
    const [paymentBy, setPaymentBy] = useState('')
    let [counter, setCounter] = useState(0);
    let text = " . . . . . . . . ".split("")
    let [loadingText, setLoadingText] = useState(text[0])
    let [refresh, setRefresh] = useState(false)
    let [showVerifyPin, setShowVerifyPin] = useState(false)
    let [loading, setLoading] = useState(false)
    let [verified, setVerified] = useState(null)
    let [paid, setPaid] = useState(false)
    let [transferBank, setTransferBank] = useState(false)
    let [expired, setExpired] = useState()
    let [less,setLess] = useState(true)
    let [token, setToken] = useState('')
    let apiToken = apiPayment + "/walletTransaction/generate-token"
    let [waleLess,setWaleLess] = useState()

    let [listBank, setListBank] = useState([])
    let [selectedBank, setSelectedBank] = useState(null)

    const onChangePayment = (e) => {
        try {
            setPaymentBy(e.target.value)
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(async ()=>{
        try {
            let result = await GetWallet(data.acco_id)
            setSaldo(result[0].wale_saldo)
        } catch (error) {
            console.log(error)
        }
    },[])


    const onCancelPayment = (e) => {
        try {
            console.log(e)
            //   props.setShowPaymentModule(false)
        } catch (error) {

        }
    }

    const onSubmitPayment = async (e) => {
        e.preventDefault()
        console.log(data)
        switch (paymentBy) {
            case "wallet":
                try {
                    if(waleLess){
                        alert("saldo wallet kurnag")
                    }else{
                        setShowVerifyPin(true)
                    }
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

    useEffect(() => {
        if (paid) {
            setTimeout(() => {
                props.setShowPayment(false)
            }, 5000)
        }
    }, [paid])

    useEffect(async () => {
        try {
            if(paymentBy === "wallet"){
                console.log(saldo)
                data.payment_by = paymentBy
                if(saldo<data.total_amount){
                    setWaleLess(true)
                }
            }else if(paymentBy==="transfer_bank"){
                let gotBankAccount = await GetBankAccount(data.acco_id)
                setListBank(gotBankAccount)
            }
        } catch (error) {
            console.log(error)
        }
    }, [paymentBy])

    return (
        <>
            { loading ?
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
                            <div className="mt-3 text-center w-full h-full items-center">
                                <div className="mt-2">
                                    <div className="block pl-2 font-semibold text-xl text-center text-gray-700">
                                        <h2>Payment</h2>
                                    </div>
                                    <div className="bg-white border border-primary justify-center text-left font-sans mb-4 ml-2 mt-2 flex-wrap shadow-lg rounded-lg pl-2">
                                        <h1 className="pt-2 px-4 text-xl font-extralight">Total yang harus dibayar : </h1>
                                        <h2 className="pb-2 px-4 font-extralight">Rp. {numberWithCommas(data.total_amount)}</h2>
                                    </div>
                                    <select onChange={onChangePayment} value={paymentBy} className="h-10 w-2/12 rounded-lg text-white bg-gray-600 mb-1">
                                        <option className="ml-2" value="-1" >Select Payment Method</option>
                                        <option className="ml-2" value="wallet">Wallet</option>
                                        <option value="transfer_bank">Transfer Bank</option>
                                    </select>
                                    {
                                        paymentBy === "wallet" ? (
                                            <MyWallet />
                                        ) : null
                                    }

                                    <div className="self-center mt-4">
                                        <button onClick={onSubmitPayment} className=" mb-10 mx-2 mt-4 w-1/12 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm">
                                            PROCESS PAYMENT
                                        </button>
                                        <button onClick={onCancelPayment} className="mt-4 w-1/12 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:w-auto sm:text-sm">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
            }
        </>
    )
}

export { ModalPayment }