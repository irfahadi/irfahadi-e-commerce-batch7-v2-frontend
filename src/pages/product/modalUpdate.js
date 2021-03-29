import axios from 'axios'
import React, { useEffect, useState } from "react";
import { apiProductTransaction } from '../../config/apiUrl';
// import { apiOrder } from "../../../config/apiUrl";

function ModalUpdateStatus(props) {
//   let [orderName, setOrderName] = useState();
//   let [orderStatName, setOrderStatName] = useState("CLOSED");
const [prod_reason, setProdReason] = useState('')
const [Erorr, setErorr] = useState('')
const [Alert, setAlert] = useState('')

const prod_id = localStorage.getItem("updateStatusProduct")
//   console.log(dataFormOrderArrival.order_name);
//   const onCancelEdit = () => {
//     setModalS(false);
//   };

const onChangeUpdateStatus = (e) => {
    const value = e.target.value
    setProdReason(value)
    setErorr('')
}

  const UpdateStatus =  () => {
   
    // const data = {
    //   prod_reason: prod_reason,
      
    // };
    // axios
    //   .put(`${apiProductTransaction}/product/blokir/${prod_id}`, data)
    //   .then((result) => {
    //     if (result) {
    //       console.log(result.data);
    //       ;
    //     }props.setShowEditStatus(false)

    //     console.log(result.data);
    //     return 0;
    //   })
    //   .catch((err) => err.message);
  ;
  const dataVariant = {
    prod_reason: prod_reason
}
console.log(dataVariant)
axios.put(`${apiProductTransaction}/product/blokir/${prod_id}`, dataVariant)
    .then(result => {
        if (result.dataVariant.error) {
            console.log(result.dataVariant)
            // notifyErr()
        } else {
            if (result.dataVariant) {
                setProdReason('')
                  ('')
                // setProvaProdId('')

            } 
            // notify()
        }
    })
    .catch((e) => {
        setErorr(e)
    })
    // setAlert(result.dataVariant.message);
                        setTimeout(() => {
                            setAlert("");
                        }, 2500);
                        // notify()
                    props.setShowEditStatus(false)
                    // .catch((e) => {
                    //     setErorr(e.response.message);
                    // });
    }
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <form className="relative w-auto my-6 mx-auto max-w-sm"onSubmit={UpdateStatus}>
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h6 className="w-full text-gray-500 text-sm mt-3 mb-6 font-bold uppercase">
                Alasan produk di blokir
              </h6>
            
             
              {/* <button
                onClick={() => this.props.setShowModal(false)}
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              >
                <span className="bg-transparent text-gray-900 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button> */}
            </div>
            <div className="w-full py-2">
                        <div class=" relative ">
                            <input type="text" id="simple-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2" 
                            placeholder="Mohon masukkan"
                            value={prod_reason}
                            onChange={onChangeUpdateStatus} 
                            />
                        </div>
                    
              </div>
            {/*body*/}
            <div className="flex-auto px-4 lg:px-10 py-6 pt-0">
              <form>
                <div className="flex items-center justify-end p-6  rounded-b">
                  <button
                    onClick={()=>{props.setShowEditStatus(false)}}
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Batal
                  </button>
                  <button
                    onClick={UpdateStatus}
                    className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-1 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </form>..
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default ModalUpdateStatus;
