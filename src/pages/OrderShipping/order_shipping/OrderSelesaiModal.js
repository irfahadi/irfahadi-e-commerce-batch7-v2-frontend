import React from 'react'
import numberWithCommas from '../../Expeditions/expedition_routes/numberWithCommas'


export default function OrderDikirimModal({
    setModalOrderSelesai,
    OrderShipping
}) {


    const onCancel = ()=>{
        setModalOrderSelesai(false)
    }




    return (
        <div>
            <div
                    className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                >
                    <div className="w-full mx-10">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            {/*header*/}
                            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
                                <h6 className="text-gray-500 text-center text-sm mt-3 mb-6 font-bold uppercase">
                                    Barang Yang Sudah Selesai Dikirim
                                </h6>
                            </div>
                            {/*body*/}
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <form >
                                    <div className="flex flex-wrap">
                                        
                                        <div className="w-full lg:w-full px-4">
                                               
                                        <table class="min-w-full divide-y divide-gray-200 my-5">
                            <thead class="bg-gray-50">

                                <tr>
                                    <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Order Name
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
                                        Discount
                                            </th>
                                    <th scope="col" class="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                            </th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                        {
                                        OrderShipping.filter(x=> x.order_stat_name === "CLOSED" && x.order_acco_id_seller == localStorage.getItem('dataAccountId'))
                                        .map(x=>
                                            <tr key={x.order_name}>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {x.order_name}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {x.order_created_on}
                                                </td>
                                                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                                Rp. {numberWithCommas(x.order_subtotal)}
                                                </td>
                                                <td class="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">
                                                {x.order_weight} Kg
                                                        </td>
                                                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {x.order_discount} %
                                                            {/* {x.order_acco_id_seller} */}
                                                    {/* {x.orders_line_items[2].product.prod_acco_id} */}
                                                </td>
                                                <td class="px-6 py-4 whitespace-nowrap">
                                                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        {x.order_stat_name}
                                                    </span>
                                                </td>
                                            </tr>
                                            )
                                        }
                                            
                                       
                                        {/* <tr>
                                            <td colSpan={3}>No Records Found.</td>
                                        </tr> */}
                             

                            </tbody>
                        </table>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                                        <button
                                        onClick={onCancel} 
                                            className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="submit"
                                        >
                                            Tutup
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
