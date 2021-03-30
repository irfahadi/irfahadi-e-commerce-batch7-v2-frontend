import { data } from 'autoprefixer';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { apiOrder, apiShipping } from '../../../config/apiUrl'
import ModalOship from './OshipModal'
import ModalOshipVal from './OshipvalModal'
import numberWithCommas from '../../Expeditions/expedition_routes/numberWithCommas'
import OrderDikirimModal from './OrderDikirimModal';
import OrderSampaiModal from './OrderSampaiModal';
import OrderSelesaiModal from './OrderSelesaiModal'
import { method } from 'lodash-es';
import OshipvalModal from './OshipvalModal';

function Index() {

    let [OrderShipping, setOrderShipping] = useState([]);
    let [updateOrderShipping, setUpdateOrderShipping] = useState()
    // let [orderName, setOrderName] = useState("")
    let [modal, setModal] = useState(false);
    let [modalShipping, SetModalShipping]= useState(false);
    let [orderDikirim, setOrderDikirim]= useState([]);
    let [orderTelahSampai, setOrderTelahSampai] = useState([]);
    let [orderSelesai, setOrderSelesai] = useState([]);
    let [filterOrder, setFilterOrder] = useState([]);
    let [modalOrderDikirm, setModalOrderDikirim] = useState(false);
    let [modalOrderSampai, setModalOrderSampai] = useState(false);
    let [modalOrderSelesai, setModalOrderSelesai]= useState(false);
    let [dataFormOrderShipping, setDataFormOrderShipping] = useState("");
    // let [dataEditRow] = useState(null);
    let [stat, setStat]= useState();
    let [search, setSearch] = useState('');
    let [filter, setFilter] = useState(false)


     useEffect(() => {
        fetchOrderShipping()
        fetchOrderDikirim()
        fetchOrderTelahSampai()
        fetchOrderSelesai()
        fetchFilterOrders()
        fetchSearchOrders()
        
        // fetchUpdateOrderShipping()
    }, [modal, dataFormOrderShipping,stat, modalShipping]) 


    /* useEffect(() => {
        fetchJumlahOrder()
        // fetchUpdateOrderShipping()
    }, []) */
// console.log("storage")
//     console.log(localStorage.getItem('dataAccountId'))

    // console.log("Naha")
    //     console.log(OrderShipping.map(x => x.order_acco_id_seller))    

    const fetchFilterOrders = async ()=>{
        return await axios({
            url:`${apiShipping}/order_filter/${localStorage.getItem('dataAccountId')}/${stat}`,
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res)=>{
            setFilterOrder(res.data)
        }).catch((err)=> console.error(err));
    }    

    console.log(filterOrder)



    const fetchSearchOrders = async ()=>{
        return await axios({
            url:`${apiShipping}/order_search/${search}`,
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res)=>{
            setSearch(res.data)
        }).catch((err)=> console.error(err));
    }    

    console.log(search)




    const fetchOrderDikirim = async ()=>{
        return await axios({
            url: `${apiShipping}/orders/${localStorage.getItem('dataAccountId')}/shipping`,
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res)=>{
            
            // console.log(res.data)
            setOrderDikirim(res.data)
            // console.log("fetchjumlah order :")
            //console.log({orderDikirim.order_dikirim})
           
        })            
        .catch((err) => console.error(err));

    }


    const fetchOrderTelahSampai = async ()=>{
        return await axios({
            url: `${apiShipping}/orders/${localStorage.getItem('dataAccountId')}/arrived`,
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res)=>{
            
            // console.log(res.data)
            setOrderTelahSampai(res.data)
            // console.log("fetchjumlah order :")
            //console.log({orderDikirim.order_dikirim})
           
        })            
        .catch((err) => console.error(err));

    }


    const fetchOrderSelesai = async ()=>{
        return await axios({
            url: `${apiShipping}/orders/${localStorage.getItem('dataAccountId')}/closed`,
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        }).then((res)=>{
            
            // console.log(res.data)
            setOrderSelesai(res.data)
            // console.log("fetchjumlah order :")
            //console.log({orderDikirim.order_dikirim})
           
        })            
        .catch((err) => console.error(err));

    }
    //console.log(orderDikirim[0].order_dikirim);
    //console.log("hasil y: ")


    const fetchOrderShipping = async () => {
        return await axios({
            url: `${apiOrder}/orders/`,
            method: "get",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => {
                res.data.map((x, y) => {
                    let dateOrders = x.order_created_on.toString();
                    let ordersDate = new Date(dateOrders).toLocaleString();
                    res.data[y].order_created_on = ordersDate;
                });
                setOrderShipping(res.data)
                // console.log(res.data);
                // console.log(res);
                // console.log();
            })
            .catch((err) => console.error(err));

    }



    const onEditRow = (e) => {
        console.log(e.target.value)
        OrderShipping.filter((data) =>
            data.order_name === e.target.value
        ).map(data => setDataFormOrderShipping(data))

        setModal(true)
    }



    const onEditRowShipping = (e) => {
        console.log(e.target.value)
        OrderShipping.filter((data) =>
            data.order_name === e.target.value
        ).map(data => setDataFormOrderShipping(data))

        SetModalShipping(true)
    }






    const onFilter = (e)=>{
        const value = e.target.options[e.target.selectedIndex].value;
        setStat(value)
        console.log('onfiter :'+value)
        setFilter(true)

    }

    const onSearch = (e)=>{
       const value = e.target.value;
       setSearch(value)
       setFilter(false)

    }



    const onModalOrderDikirim = ()=> {
        setModalOrderDikirim(true)
    } 

    const onModalOrderSampai = ()=> {
        setModalOrderSampai(true)
    } 


    const onModalOrderSelesai = ()=> {
        setModalOrderSelesai(true)
    } 
    // console.log(localStorage.getItem('dataAccountId'))

    // let OrderDikirim = async () =>{
    //    let jumlah =await OrderShipping.length

    //  return SetOrderDikirim(jumlah)
    // }

    // console.log(OrderDikirim())
    // console.log("ini isi")
    // console.log(OrderShipping)
    // console.log("disini")
    // console.log(filterOrder.acco_nama)
    // console.log("ini")
    // console.log(search)
    return (
        <div>
            <div class="flex flex-wrap justify-center " >
				<div class="mx-5 my-2   bg-blue-400 rounded-md shadow-md overflow-hidden" onClick={onModalOrderDikirim}>
				{/* <Link onClick={()=> DetailProduct(prod.prod_id, prod.product_images[0].prim_id)}> */}
					<div class="px-5 py-3">
						<h3 class="text-white text-l ">Order Dikirim </h3>
						<span class="flex justify-center text-white text-2xl">{
                             orderDikirim.map(x=>{
                                return (x.order_dikirim)
                            })
                        }</span>
					</div>
				{/* </Link> */}
				</div>
                <div class="mx-5 my-2   bg-blue-400 rounded-md shadow-md overflow-hidden" onClick={onModalOrderSampai}>
				{/* <Link onClick={()=> DetailProduct(prod.prod_id, prod.product_images[0].prim_id)}> */}
					<div class="px-5 py-3">
						<h3 class="text-white text-l ">Order Telah Sampai </h3>
						<span class="flex justify-center text-white text-2xl ">{
                             orderTelahSampai.map(x=>{
                                return (x.order_dikirim)
                            })
                        }</span>
					</div>
				{/* </Link> */}
				</div>
                <div class="mx-5 my-2   bg-blue-400 rounded-md shadow-md overflow-hidden" onClick={onModalOrderSelesai}>
				{/* <Link onClick={()=> DetailProduct(prod.prod_id, prod.product_images[0].prim_id)}> */}
					<div class="px-5 py-3">
						<h3 class="text-white text-l">Order Selesai </h3>
						<span class="flex justify-center text-white text-2xl ">{
                             orderSelesai.map(x=>{
                                return (x.order_dikirim)
                            })
                        }</span>
					</div>
				{/* </Link> */}
				</div>
							
			</div>
        <div className="flex flex-row my-4">
            
                <div class="flex w-11/12 ml-7 ">
                {/* <div class="relative">
                  <div class="absolute top-4 left-3"> <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div> */}
                  <input type="search" class="border border-gray-600 flex w-full mr-2 h-12 pl-10  rounded-lg z-0 focus:shadow focus:outline-none"
                    placeholder="Search anything..."
                    onChange= {onSearch}
                  >
                  </input>
                  {/* </div> */}
                </div>

                <div class="w-2/12">
                <select
            name="status"
            onChange={onFilter}
             className="mt-1 block py-2 px-3 h-10 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option>Filter Status Order...</option>
                <option value="PAID">Paid</option>
                <option value="SHIPPING">Shipping</option>
                <option value="ARRIVED">Arrived</option>
                <option value="CLOSED">Closed</option>
                          
            </select>
            </div>


        </div>    
            <div class="flex flex-wrap">
                <div class="-my-2 p-2 overflow-x-auto">
                    <div class="py-2 align-middle inline-block max-w-full">
                        <table class="min-w-full divide-y divide-gray-200 ">
                            <thead class="bg-gray-50">
                                <tr>
                                    <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order Name
                                            </th>
                                            <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nama Pembeli
                                            </th>
                                    <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Created On
                                            </th>
                                    <th scope="col" class="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Subtotal
                                            </th>
                                    <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Weight
                                            </th>
                                    
                                    <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                            </th>
                                    <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Action
                                            </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                {
                                    // OrderShipping.length > 0 ?
                                    //     OrderShipping.filter((x) => x.order_stat_name === "PAID" && x.order_acco_id_seller == localStorage.getItem('dataAccountId'))
                                    //     .filter(x => {
                                    //         if (search === ""){
                                    //             return x;
                                    //         } else if (x.order_name.toLowerCase().includes(search.toLocaleLowerCase())){
                                    //             return x;
                                    //         }
                                    //     })
                                    // OrderShipping.length >0 ?
                                    //     OrderShipping.map((x) => {
                                            // filterOrder.length >0 ?
                                            // filterOrder.map((x) => {

                                            filter===false ? (OrderShipping.filter((val)=>{
                                                    if(search == ""){
                                                        return val
                                                    } else if (val.order_name.toLowerCase().includes(search)){
                                                        return val
                                                    } 
                                                }).filter((x)=> x.order_stat_name !== "CHECKOUT" && x.order_stat_name !== "CANCELLED" && x.order_acco_id_seller == localStorage.getItem('dataAccountId')).map((x)=>{
                                            return( <tr key={x.order_name}>
                                                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                    {x.order_name}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                    {x.account.acco_nama}
                                                            {/* {x.order_acco_id_seller} */}
                                                    {/* {x.orders_line_items[2].product.prod_acco_id} */}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                    {x.order_created_on}
                                                </td>
                                                <td class="px-6 py-4 text-center whitespace-nowrap text-xs text-gray-500">
                                                    Rp. {numberWithCommas(x.order_subtotal)}
                                                    {/* {x.order_subtotal} */}
                                                </td>
                                                <td class="px-6 py-4 text-center whitespace-nowrap text-xs text-gray-500">
                                                    {x.order_weight} Kg
                                                        </td>
                                                
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {x.order_stat_name}
                                                    </span>
                                                </td>
                                                {
                                                    (x.order_stat_name === "PAID") ?
                                                        <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                                                            <button className="py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white reounded" onClick={onEditRow} value={x.order_name}>SHIPPING</button>
                                                        </td>
                                                    : (x.order_stat_name === "SHIPPING") ?
                                                    <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                                                    <button className="py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white reounded" onClick={onEditRowShipping} value={x.order_name}>ARRIVED</button>
                                                    </td>
                                                    :
                                                    <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-400">
                                                    <button className="py-2 px-4 bg-gray-400 text-white reounded" onClick={()=>{setModal(true)}} disabled="true"> &nbsp; FINISH &nbsp;</button>
                                                    </td>
                                                }
                                            </tr>)
                                        })) : (filterOrder.map((x)=>{
                                            return( <tr key={x.order_name}>
                                                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                    {x.order_name}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                    {x.acco_nama}
                                                            {/* {x.order_acco_id_seller} */}
                                                    {/* {x.orders_line_items[2].product.prod_acco_id} */}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                                                    {x.order_created_on}
                                                </td>
                                                <td class="px-6 py-4 text-center whitespace-nowrap text-xs text-gray-500">
                                                    Rp. {numberWithCommas(x.order_subtotal)}
                                                    {/* {x.order_subtotal} */}
                                                </td>
                                                <td class="px-6 py-4 text-center whitespace-nowrap text-xs text-gray-500">
                                                    {x.order_weight} Kg
                                                        </td>
                                                
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {x.order_stat_name}
                                                    </span>
                                                </td>
                                                {
                                                    (x.order_stat_name === "PAID") ?
                                                        <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                                                            <button className="py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white reounded" onClick={onEditRow} value={x.order_name}>SHIPPING</button>
                                                        </td>
                                                    : (x.order_stat_name === "SHIPPING") ?
                                                    <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-500">
                                                    <button className="py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white reounded" onClick={onEditRowShipping} value={x.order_name}>ARRIVED</button>
                                                    </td>
                                                    :
                                                    <td class="px-4 py-2 whitespace-nowrap text-xs text-gray-400">
                                                    <button className="py-2 px-4 bg-gray-400 text-white reounded" onClick={()=>{setModal(true)}} disabled="true"> &nbsp; FINISH &nbsp;</button>
                                                    </td>
                                                }
                                            </tr>)
                                        }))
                                        // :
                                        // <tr>
                                        //     <td>No Records Found.</td>
                                        // </tr>
                                }


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {
                (modal) ?
                    <ModalOship
                        setModal={setModal}
                        OrderShipping={OrderShipping}
                        dataFormOrderShipping={dataFormOrderShipping}
                    />
                    
                    :
                    null
            }
            {
                (modalShipping) ?
                    <OshipvalModal
                        SetModalShipping={SetModalShipping}
                        OrderShipping={OrderShipping}
                        dataFormOrderShipping={dataFormOrderShipping}
                    />
                    
                    :
                    null
            }
            {
                (modalOrderDikirm) ?
                    <OrderDikirimModal
                    setModalOrderDikirim={setModalOrderDikirim}
                    OrderShipping={OrderShipping}
                    />
                    
                    :
                    null
            }
            {
                (modalOrderSampai) ?
                    <OrderSampaiModal
                    setModalOrderSampai={setModalOrderSampai}
                    OrderShipping={OrderShipping}
                    />
                    
                    :
                    null
            }
            {
                (modalOrderSelesai) ?
                    <OrderSelesaiModal
                    setModalOrderSelesai={setModalOrderSelesai}
                    OrderShipping={OrderShipping}
                    />
                    
                    :
                    null
            }

        </div>
    )
}

export default Index
