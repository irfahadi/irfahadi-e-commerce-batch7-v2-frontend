import { useState, useEffect } from "react"
import { AddSaldo } from './api/index'

const TopUpWallet = (props) => {
    let [amount, setAmount] = useState(0)
    let [loading, setLoading] = useState(false)
    let text = " PROCESSING YOUR REQUEST . . . .".split("")
    let [loadingText, setLoadingText] = useState(text[0])
    let [counter, setCounter] = useState(0)
    let [dataTopUp, setDataTopUp] = useState(
        {
            "acco_id": props.acco_id,
            "wale_id": props.wale_id,
            "total_amount": 0,
            "transaction_type": "TFB",
            "bank_acc_number": 123456789,
            "order_name": "topup"
        }
    )

    const onHandleChangeAmount = (e) => {
        setAmount(e.target.value)
    }

    useEffect(() => {
        dataTopUp.total_amount = amount
    }, [amount])

    const onHandleClickSubmitTopup = async () => {
        await AddSaldo(dataTopUp)
        setLoading(true)
        setTimeout(() => {
            props.setShowTopUpForm(false)
            props.setShowHistoryTrans(true)
            props.setRefresh(!props.refresh)
            setLoading(false)
        }, 1000)
    }

    useEffect(() => {
        if (loading) {
            if (counter > text.length - 1) {
                setCounter(0)
                setLoadingText("")
                props.setRefresh(!props.refresh)
            } else {
                setCounter(counter + 1)
                setTimeout(() => {
                    setLoadingText(loadingText + text[counter])
                    props.setRefresh(!props.refresh)
                }, 10)
            }
        } else {
            console.log("do nothing")
        }
    }, [props.refresh, loading])

    return (
        <>
            {
                loading ?
                    (<div className="grid w-80 mx-auto mt-10 my-2 text-center border shadow-md border-gray-300 rounded-md overflow-hidden text-black bg-gray-100">
                        <h1 className="font-bold">{loadingText}</h1>
                    </div>)
                    : (
                        <div className="grid w-80 mx-auto mt-10 my-2 text-center border shadow-md border-gray-300 rounded-md overflow-hidden text-black bg-gray-100">
                            <h1 className="mt-2 py-2 font-bold">TOP UP WALLET</h1>
                            <input value={amount} onChange={onHandleChangeAmount} className=" px-2 py-2 mx-2 my-2 content-center border border-gray-200 text-center" type="number" placeholder="Amount"></input>
                            <button onClick={onHandleClickSubmitTopup} className="mx-2 my-2 px-2 py-2 bg-primary text-white rounded-md">Topup</button>
                        </div>)
            }
        </>

    )
}
export { TopUpWallet }