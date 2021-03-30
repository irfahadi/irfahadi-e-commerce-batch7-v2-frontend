import React from 'react'
import axios from 'axios'
import SidebarAdmin from './sidebarAdmin'
import {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import ModalUpdateStatus from '../product/modalUpdate'
import {apiProductTransaction} from '../../config/apiUrl'
import convertToRupiah from '../product/convertToRupiah'
import Swal from 'sweetalert'


export default function AllProduct() {

    const [showModal, setShowModal] = React.useState(false);
    const history = useHistory()
    const [Product, setProduct] = useState([]);
    const [Category, setCategory] = useState([]);
    const [search, setSearch] = useState('')
    const [showEditStatus, setShowEditStatus] = useState(false)
    const [prodToEdit, setProdToEditStatus] = useState()
    const acco_id = localStorage.getItem("dataAccountId")
    const token = localStorage.getItem("token");
    const [prod_reason, setProdReason] = useState('')
    const [Erorr, setErorr] = useState('')
    const [Alert, setAlert] = useState('')
    const [prod_id, SetProdId] = useState('')

// const prod_id = localStorage.getItem("updateStatusProduct")

//   console.log(dataFormOrderArrival.order_name);
//   const onCancelEdit = () => {
//     setModalS(false);
//   };
    const berhasil = () => {
    Swal(
    'Produk berhasil diblokir',
    'Data Berhasil disimpan',
    'success'
    )}

  const onClickEditStatus = (e) => {
      console.log(e)
      setShowModal(true)
    //   setProdToEditStatus(e.target.value)
      SetProdId(e)
    //   setShowEditStatus(true)
      // history.push('/editProduct')
    //   localStorage.setItem("updateStatusProduct", e.target.value)
    }
  useEffect(() => {
      axios({
        url: `${apiProductTransaction}/product`,
        method: "get",
        headers: {
          "Content-type": "application/json"
        }
      }).then((res) => setProduct(res.data))
        .catch((err) => console.error(err));
    }, [showModal])


    const onChangeUpdateStatus = (e) => {
        const value = e.target.value
        setProdReason(value)
        setErorr('')
    }
    
      const UpdateStatus =  (x) => {
          x.preventDefault()
       
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
      const data = {
        prod_reason: prod_reason
    }
    console.log(data)
    axios.put(`${apiProductTransaction}/product/blokir/${prod_id}`, data)
        .then(result => {
            if (result.data.error) {
                console.log(result.data)
                // notifyErr()
            } else {
                if (result.data) {
                    setProdReason('')
                      ('')
                    // setProvaProdId('')
    
                } 
                berhasil()
            }
        })
        .catch((e) => {
            setErorr(e)
        })
        // setAlert(result.dataVariant.message);
                            setTimeout(() => {
                                setAlert("");
                            }, 2500);
                            berhasil()
                        setShowModal(false)
                        // .catch((e) => {
                        //     setErorr(e.response.message);
                        // });
        }

    return (
        <div className="flex flex-wrap">
            <SidebarAdmin />
        <div className="w-full md:w-9/12 md:mt-10">
        
        <div className="w-full x:w-8/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className="font-semibold text-base text-gray-800 text-center">All product</h3>
                        </div>
                        
                    </div>
                </div>
                <div class="relative">
                  <div class="absolute top-4 left-3"> <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
                  <input type="search" class="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
                    placeholder="Search anything..."
                    onChange={(event) => {
                      setSearch(event.target.value)
                    }}
                  >
                  </input>
                </div>
                <div className="block w-full overflow-x-auto">
                    <table className="flex-wrap items-center w-full bg-transparent border-collapse">
                        <thead>
                            <tr>
                                <th className=" p-3 bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Produk Id</th>
                                <th className=" p-3 bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center"colSpan="2">Nama Produk</th>
                                <th className=" p-3 bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Deskirpsi Produk</th>
                                <th className=" p-3 bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Harga</th>
                                <th className=" p-3 bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Stok</th>
                                <th className=" p-3 bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Berat</th>
                                {/* <th className=" p-3 bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Gambar</th> */}
                                <th className=" p-3 bg-pink-500 text-white align-middle border border-solid border-gray-200 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-no-wrap font-semibold text-center">Action</th>
                            </tr>
                        </thead>
                        {/* <br /> */}
                        <tbody >
                            
                    {Product
                    .filter((val) => {
                      if (search == "") {
                        return val
                      } else if (val.prod_name.toLowerCase().includes(search.toLocaleLowerCase())) {
                        return val
                      }
                      else if (val.prod_desc.toLowerCase().includes(search.toLowerCase())) {
                        return val
                      }
                    })
                    .map((x) => {
                      console.log(x)
                      return (
                          x.prod_status === "blokir" ? null :
                        <tr class="bg-white lg:hover:bg-pink-200 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Produk Id</span>

                            {x.prod_id}
                          </td>
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase"></span>
                            <img class= "bg-center h-20 w-20 my-2" src={x.product_images[0].prim_path}/>
                          </td>
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Nama Produk</span>
                            {x.prod_name}
                          </td>
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Deskripsi</span>
                            {x.prod_desc}
                          </td>
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Harga</span>
                            {convertToRupiah(x.prod_price)}
                          </td>
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Stok</span>
                            {x.prod_stock}
                          </td>
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Berat</span>
                            {x.prod_weight}
                          </td>
                          
                          <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static">
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                            <button class="text-red-500 hover:text-red-600 underline" value={x.prod_id} onClick={() => onClickEditStatus(x.prod_id)}>Blokir</button>
                            {/* <a href="" class="text-blue-400 hover:text-blue-600 underline pl-6" >Hapus</a> */}
                          </td>
                        </tr>)
                    })}
                                    {/* // <tr>
                                    //     <td colSpan={3}>No Records Found.</td>
                                    // </tr> */}
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        
        {/* modal */}
        {showModal ? (
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
                           onClick={()=>{setShowModal(false)}}
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
        ):null}


        
        </div>
        
    
        </div>
        
    )
}

