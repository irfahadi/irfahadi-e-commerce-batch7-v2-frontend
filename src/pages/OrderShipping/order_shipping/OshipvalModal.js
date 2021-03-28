import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import {apiOrder, apiShipping} from '../../../config/apiUrl'


function OshipvalModal({
    SetModalShipping,
    dataFormOrderShipping
}) {
    let history =useHistory()

    let[orderName, setOrderName]= useState(dataFormOrderShipping.order_name);
    let[orderStatName, setOrderStatName]= useState("ARRIVED");
    let[oshipArrivalDate]= useState(Date.now())


    console.log(dataFormOrderShipping.order_name)
    const onCancelEdit = ()=>{
        SetModalShipping(false)
    }

    
    toast.configure()
    const notify = () => {
       
        toast.success('Data berhasil diperbarui', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
    }

    // useEffect(()=>{
    //     setOrderName()
    //     setOrderStatName()
    // },[])


    const handleUpdate = async (e)=>{
        e.preventDefault()
        const data={
            order_name: orderName,
            order_stat_name: orderStatName
        }
        await axios.put(`${apiOrder}/orders`, data)
        .then(result=>{
            if(result){
                console.log(result.data)
                notify()
                history.push('/ordershipping')  
            }
            
            console.log(result.data)
            SetModalShipping(false)
            return 0;


        }).catch((err)=> err.message)
    }



    // const handleUpdateShipping = async (e)=>{
    //     e.preventDefault()

    //     const data={
    //         oship_arrival_date: oshipArrivalDate
    //     }

    //     await axios.put(`${apiShipping}/ordershipping/`)
    // }



    return (
        <div>
            <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="relative w-auto my-6 mx-auto max-w-sm">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h6 className="text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                                    Barang Sudah Datang ?
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
                            <div className="flex-auto px-4 lg:px-10 py-6 pt-0">
                                <form >
                            
                                    <div className="flex items-center justify-end p-6  rounded-b">
                                        <button onClick={onCancelEdit}
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                        >
                                            Belum
                                </button>
                                        <button onClick={handleUpdate}
                                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Iya, Sudah Datang
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

export default OshipvalModal
