import axios from "axios"
import { useEffect, useState } from "react"

const OrderedProduct = () => {
    const [orderedProduct, setOrderedProduct] = useState([])
    const acco_id = localStorage.getItem("dataAccountId")
    const [refresh,setRefresh] = useState(false)

    useEffect(async () => {
        try {
            let result = await axios.get(`${apiPayment}/orders/ordered-product/` + acco_id)
            console.log(result)
            setOrderedProduct(result.data)
        } catch (error) {
            console.log(error)
        }

    }, [refresh])

    useEffect(()=>{
console.log(orderedProduct)
    },[orderedProduct])

    const onProcessOrder = async (e) => {
      console.log(e.target.value)
      await axios.post(`${apiPayment}/orders/process`,{order_name:e.target.value})
      setRefresh(!refresh)
    }

    return (
        <div className="grid max-h-full max-w-full mt-2 ml-2 text-center border rounded-lg overflow-hidden text-white border-primary">
            <table>
                <thead>
                    <tr className="h-10 shadow-md bg-primary">
                        <th className="w-3/12 font-extralight">Order</th>
                        <th className="w-3/12 font-extralight">Buyer</th>
                        <th className="w-2/12 font-extralight">Product</th>
                        <th className="w-1/12 font-extralight">Quantity</th>
                        <th className="w-2/12 font-extralight">Total</th>
                        <th className="w-2/12 font-extralight">Status</th>
                        <th className="w-2/12 font-extralight">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderedProduct == undefined ?
                            <tr>
                                <td >Loading</td>
                            </tr>
                            :
                            orderedProduct.map((x) => {
                                return (
                                    <tr className=" text-gray-800 bg-white rounde-xl font-thin overflow-hidden">
                                    <td>{x.order_name}</td>
                                    <td>{x.order_acco_id}</td>
                                    <td>{x.prod_name}</td>
                                    <td>{x.orit_qty}</td>
                                    <td>{x.order_total_due}</td>
                                    <td>{x.order_stat_name}</td>
                                    <td>
                                        <button value={x.order_name} onClick={onProcessOrder} className="py-1 mx-1 px-4 bg-primary text-white rounded-lg w-100">Process</button>
                                    </td>
                                    </tr>
                                    )
                            })
                        }
                </tbody>
            </table>
        </div>
    )
}

export { OrderedProduct }