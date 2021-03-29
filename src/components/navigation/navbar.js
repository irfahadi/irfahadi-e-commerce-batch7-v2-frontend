import React from 'react'
import { useHistory } from 'react-router'
import ProductSaya from '../../pages/product/productSaya'

export default function Navbar() {
    let history = useHistory()
    return (
        <div class="ml-4">

            <div class="bg-white ">
                <nav class="flex flex-col sm:flex-row mb-3">
                    <button class="text-gray-600 py-4 px-6 block hover:text-primary focus:outline-none text-primary border-b-2 font-medium border-primary " style={{ cursor: 'pointer' }} onClick={() => history.push("/product")}>
                        All Product
        {/* </button><button class="text-gray-600 py-4 px-6 block hover:text-primary focus:outline-none" style={{cursor:'pointer'}} onClick={()=>history.push("/Archieve")}> */}
                        {/* Archieve */}
        </button><button class="text-gray-600 py-4 px-6 block hover:text-primary focus:outline-none"style={{cursor:'pointer'}} onClick={()=>history.push("/Completed")}>
                        Completed
        </button><button class="text-gray-600 py-4 px-6 block hover:text-primary focus:outline-none"style={{cursor:'pointer'}} onClick={()=>history.push("/Blokir")}>
                        Blokir
        </button>
                </nav>
            </div>
            <ProductSaya />
        </div>
    )
}
