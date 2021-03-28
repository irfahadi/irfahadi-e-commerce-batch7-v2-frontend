import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {apiShipping} from '../../../config/apiUrl'
import {apiOrder} from '../../../config/apiUrl'
import {toast} from 'react-toastify'
import { useHistory } from 'react-router';


function OshipModal({
    setModal,
    dataFormOrderShipping,
    OrderShipping
}) {

    let history =useHistory()
    let[oshipCreatedOn]= useState(Date.now());
    let[oshipShipDate, setOshipShipDate] = useState("");
    let[oshipArrivalDate] = useState(Date.now());
    let[oshipDesc, setOshipDesc] = useState('');
    let[oshipOrderName] = useState(dataFormOrderShipping.order_name);
    let[orderName] = useState(dataFormOrderShipping.order_name)
    let[orderStatName] = useState("SHIPPING");
    // const[orderName,setOrderName]= useState("");
    // const[orderStatName, setOrderStatName]= useState("");

    // console.log(OrderShipping.order_name)



    toast.configure()
    const notify = () => {
       
        toast.success('Data berhasil diperbarui', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
    }


    const onChangeOshipDesc = e =>{
        const value = e.target.value
        setOshipDesc(value)
    }

    const onChangeOshipShipDate = e =>{
        const value = e.target.value
        setOshipShipDate(value)
    }
    

console.log(dataFormOrderShipping.account.addresses[0].addr_address)
   

    const handleUpdate = async ()=>{
        const data={
            order_name: orderName,
            order_stat_name: orderStatName
        }
        await axios.put(`${apiOrder}/orders`, data)
        .then(result=>{
            if(result){
                console.log(result.data) 
               
            }
            
            console.log(result.data)
            return 0;

        }).catch((err)=> err.message)
    }


     const klikShipping= async ()=>{
        const data ={
            oship_created_on : oshipCreatedOn,
            oship_ship_date : oshipShipDate,
            oship_arrival_date: oshipArrivalDate,
            oship_desc: oshipDesc,
            oship_order_name: oshipOrderName,
            // order_name: orderName,
            // order_stat_name: orderStatName
        }

        await axios.post(`${apiShipping}/ordershipping`, data)
        .then(result=>{
            if(result){
                console.log(result.data)
            }
            return 0

        }).catch((err)=> err.message)
    }


    const hasil = async (e)=>{
        e.preventDefault()
        try {
            
            await handleUpdate();
            await klikShipping();
            setModal(false)
            notify()
            history.push('/ordershipping') 

           } catch (err) {
               console.log(err.message) 
           }
        
    }

  


  
    const onCancelEdit = ()=>{
        setModal(false)
    }



    return (
        <div >
            <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-sm">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                                    Barang Akan Dikirim ?
                                </h6>
                                <button onClick={onCancelEdit}
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"

                                >
                                    <span className="bg-transparent text-gray-900 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form >
                                    <div className="flex flex-wrap">
                                        
                                        <div className="w-full lg:w-full px-4">
                                               
                                            <textarea required
                                                    // type="textarea"
                                                    name="oshipDesc"
                                                    // {dataFormOrderShipping.account.addresses[0].addr_address}
                                                    value={dataFormOrderShipping.account.addresses[0].addr_address}
                                                    onChange={onChangeOshipDesc}
                                                    placeholder="Masukan Keterangan"
                                                    className="px-3 py-3 my-3 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"

                                                />
                                            <input required
                                                    type="date"
                                                    name="oshipShipDate"
                                                    value={oshipShipDate}
                                                    onChange={onChangeOshipShipDate}
                                                    placeholder="Masukan Keterangan"
                                                    className="px-3 py-3 my-3 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"

                                                />
                                                {/* <input required
                                                    type="text"
                                                    name="orderName"
                                                    value={dataFormOrderShipping.order_name}
                                                    onChange={onChangeOshipDesc}
                                                    placeholder="order name"
                                                    className="px-3 py-3 my-3 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"

                                                />
                                                <input required
                                                    type="text"
                                                    name="orderStatName"
                                                    value={dataFormOrderShipping.order_stat_name}
                                                    onChange={onChangeOshipDesc}
                                                    placeholder="status"
                                                    className="px-3 py-3 my-3 placeholder-gray-400 text-gray-700 bg-white rounded text-xs shadow focus:outline-none focus:shadow-outline w-full ease-linear transition-all duration-150"

                                                /> */}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                        <button onClick={onCancelEdit}
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Close
                                </button>
                                        {/* <button onClick={klikShipping}{handleUpdate} */}
                                        <button onClick= {hasil}
                                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Save Changes
                                </button>
                                    </div>
                                </form>


                            </div>

                        </div>

                    </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
    )
}

export default OshipModal
