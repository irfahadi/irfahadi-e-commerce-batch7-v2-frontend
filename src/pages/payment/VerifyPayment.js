import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiPayment } from '../../config/apiUrl'

const VerifyPayment = (props) => {
    let acco_id = props.acco_id
    let apiPin = apiPayment + "/walletTransaction"
    const [pin, setPin] = useState('')
    const data = props.data
    
    const onSubmit = (e) => {
        e.preventDefault()
        data.pin_number = pin
        data.order_name = null
        console.log(data.total_amount)
        axios.post(apiPin, data).then((result) => {
            console.log(result)
            if (result.data) {
                props.setLoading(true)
                setTimeout(() => {
                    props.setShowVerifyPin(false)
                    props.setVerified(true)
                    props.setPaid(true)
                    props.setLoading(false)
                    props.setWatrNumbers(result.data.watr_numbers)
                }, 3000);
            } else {
                props.setVerified(false)
            }
        }).catch((err) => {
            console.log(err)
        });
  };
  

  const onHandlePinInputChange = (event) => {
    let checkInput = "";
    event.target.value == undefined || null
      ? (checkInput = "")
      : (checkInput = event.target.value);
    if (checkInput.toString().length > 6) {
    } else {
      setPin(event.target.value);
    }
  };

    return (
        <>
            {
                <div className="flex flex-col h-screen place-content-center text-center">
                    <header className="h-10 mt-28">
                        <h1 className="font-bold text-4xl">Securing your transaction</h1>
                    </header>
                    <main className="mb-auto h-10 ">    
                        <form onSubmit={onSubmit}>
                            <input type="password" value={pin} onChange={onHandlePinInputChange} name="pin" placeholder="WALLET PIN" className="w-2/12 border border-blue-500 py-2 mt-5 shadow-lg bg-white rounded-xl mr-2 focus:outline-none focus:ring-2 font-light"></input>
                        <button className="py-1 px-4 font-extralight  mx-2 text-white rounded-xl bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={onSubmit}>VERIFY</button>
                        </form>
                        <button className="py-1 mt-10 px-4 font-extralight text-white rounded-xl bg-red-500 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50" onClick={()=>props.setShowVerifyPin(false)}>CANCEL</button >
                        <h1 className="text-red-600" style={{ visibility: props.verified || props.verified === null ? 'hidden' : 'visible' }} >PIN SALAH, SILAHKAN INPUT KEMBALI</h1>
                    </main>
                    <footer>Supported By Code.ID</footer>
                </div>
            }
        </>
    )
        }

export default VerifyPayment;