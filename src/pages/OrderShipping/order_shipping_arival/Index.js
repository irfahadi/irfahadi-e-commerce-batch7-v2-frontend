// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import ModalOshipval from "./OshipvalModal";
// import { apiOrder } from "../../../config/apiUrl";
// import numberWithCommas from "../../Expeditions/expedition_routes/numberWithCommas";

// function Index() {

//     let [ShippingArrival, setShippingArrival]= useState([]);
//     let [modal, setModal]= useState (false);
//     let [dataFormOrderArrival, setDataFormArrival] = useState({})
//     let [search, setSearch] = useState('');

//     useEffect(()=>{
//         fetchShippingArrival()
//     },[modal, dataFormOrderArrival])
    

//     const fetchShippingArrival = async ()=>{
//         return await axios({
//             url:`${apiOrder}/orders/`,
//             method: "get",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//         })
//             .then((res) => {
//                 res.data.map((x, y) => {
//                   let dateOrders = x.order_created_on.toString();
//                   let ordersDate = new Date(dateOrders).toLocaleString();
//                   res.data[y].order_created_on = ordersDate;
//                 });
//                 setShippingArrival(res.data)
//                                 console.log(res.data);
//                 console.log(res);
//                 console.log();
//               })
//               .catch((err) => console.error(err));
        
//     }



//     const onEditRow = (e)=>{
//         // ShippingArrival.map((data)=>{
//         //     if(data.order_name === e.target.value){
//         //         setDataFormArrival(data)
//         //     }
//         //     return setDataFormArrival(data)
//         // })

//         ShippingArrival.filter((data)=>
//             data.order_name === e.target.value
//         ).map(data => setDataFormArrival(data))

//         setModal(true)
//     }


//     return (
//         <div>
//             <div className="w-3/12 md:mt-10 px-1 mr-5">
//                 <div class="relative">
//                   <div class="absolute top-4 left-3"> <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
//                   <input type="search" class="h-14 w-96 pl-10 pr-20 rounded-lg z-0 focus:shadow focus:outline-none"
//                     placeholder="Search anything..."
//                     onChange={(event) => {
//                       setSearch(event.target.value)
//                     }}
//                   >
//                   </input>
//                 </div>
//             </div>
//              <div class="flex flex-wrap">
//                     <div class="-my-2 p-8 overflow-x-auto">
//                         <div class="py-2 align-middle inline-block max-w-full">
//                                 <table class="min-w-full divide-y divide-gray-200 ">
//                                     <thead class="bg-gray-50">
//                                         <tr>
//                                             <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Order Name
//                                             </th>
//                                             <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Created On
//                                             </th>
//                                             <th scope="col" class="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Subtotal
//                                             </th>
//                                             <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Weight
//                                             </th>
//                                             <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Discount
//                                             </th>
//                                             <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Status
//                                             </th>
//                                             <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                                                 Action
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody class="bg-white divide-y divide-gray-200">
//                                         {
//                                             ShippingArrival.filter((x)=> (x.order_stat_name=== "SHIPPING" && x.order_acco_id_seller == localStorage.getItem('dataAccountId')) || (x.order_stat_name=== "ARRIVED" && x.order_acco_id_seller == localStorage.getItem('dataAccountId')) || (x.order_stat_name=== "CLOSED" && x.order_acco_id_seller == localStorage.getItem('dataAccountId')))
//                                             .filter(x => {
//                                                 if (search === ""){
//                                                     return x;
//                                                 } else if (x.order_name.toLowerCase().includes(search.toLocaleLowerCase())){
//                                                     return x;
//                                                 }
//                                             })
//                                             .map(x=>
                                            
//                                             <tr key={x.order_name}>     
//                                             <td class="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {x.order_name}
//                                             </td>
//                                             <td class="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {x.order_created_on}
//                                             </td>
//                                             <td class="px-5 py-4 text-center whitespace-nowrap text-sm text-gray-500">
//                                             Rp. {numberWithCommas(x.order_subtotal)}
//                                             </td>
//                                             <td class="px-5 py-4 text-center whitespace-nowrap text-sm text-gray-500">
//                                             {x.order_weight} Kg
//                                             </td>
//                                             <td class="px-5 py-4 whitespace-nowrap text-sm text-gray-500">
//                                             {x.order_discount} %
//                                             </td>
//                                             <td class="px-5 py-4 whitespace-nowrap">
//                                                 <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                                 {x.order_stat_name}
//                                                 </span>
//                                             </td>
//                                             {
//                                             (x.status.stat_name === "SHIPPING") ?
                                            
//                                             <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
//                                             <button value={x.order_name} className="py-2 px-4 bg-blue-500 hover:bg-blue-400 text-white reounded" onClick={onEditRow}>ARRIVED</button>
//                                             </td>
//                                             :
//                                             <td class="px-4 py-2 whitespace-nowrap text-sm text-gray-400">
//                                             <button className="py-2 px-4 bg-gray-400 text-white reounded" onClick={()=>{setModal(true)}} disabled="true"> &nbsp; FINISH &nbsp;</button>
//                                             </td>
//                                             }
                                            
//                                         </tr>

//                                             )}
                                            
                                            
                                                 
                                        
//                                     </tbody>
//                                 </table>
//                             </div>
//                     </div>
//                 </div>

//                 {
//                     modal ? 
//                     <ModalOshipval
//                     setModal={setModal}
//                     setDataFormArrival = {setDataFormArrival}
//                     dataFormOrderArrival= {dataFormOrderArrival}
//                     />
//                     :
//                     null
//                 }
//         </div>
//       </div>


//     </div>
//   );
// }

// export default Index;
