import React, { Component } from 'react'
import axios from 'axios'
import Images from './images'
import { useEffect, useState } from 'react'
import convertToRupiah from './convertToRupiah'
import { apiCart, apiProductTransaction, apiUserAccount, apiUserMaster } from "../../config/apiUrl"
import { useHistory } from 'react-router'
import { toast } from 'react-toastify'
import swal from 'sweetalert'
import ImageZoom from 'js-image-zoom'

export default function Product() {
	
    const [selectedImg, setSelectetImg] = useState([]);
    const [count, setCount] = useState(0)
    const [Size, setSize] = useState([])
    const [Color, setColor] = useState([])
    const [Product, setProduct] = useState([]);
    const [Account, setAccount] = useState([])
    const [CartWeight, setCartWeight] = useState('')
    const [CartTotal, setCartTotal] = useState('')
    const [CartProdId, setCartProdId] = useState('')
    // const [CartQuantity, setCartQuantity] = useState('')
    const acco_id = localStorage.getItem("dataAccountId")
    const [CartId, setCartId] = useState()
    const [Error, setError] = useState('')
    const history = useHistory()
    const prod_id = localStorage.getItem("productDetail")
    const primId = localStorage.getItem("productImages")
    const shopName = localStorage.getItem("dataAccountShopName")
    const terjual = Math.floor(Math.random() * 100) + 1
    const penilaian = Math.floor(Math.random() * 1000) + 50

    toast.configure()
    const notify = () => {

        toast.success('Data berhasil ditambahkan', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
    }
    const fotoproduct = () => {
        swal({
        //   title: 'Sweet!',
          icon: selectedImg,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Foto Product',
        })
      }

    const klikCart = (x) => {
        x.preventDefault()
         const editStok = {
            prod_stock : count
        }
        axios.put (`${apiProductTransaction}/product/stock/${prod_id}` ,editStok)
        .then (result => {
            if (result.error) {
                console.log(result)

            } else {
                if (result) {
                    // alert(count)
                    // // setCartQuantity('')
                    // setCartTotal('')
                    // setCartWeight('')
                    // setCartProdId('')



                }
            } 
        })
        .catch((e) => {
            setError(e.response.message)
        })
        
        const data = {
            clit_subweight: count * Number(Product.prod_weight),
            clit_subtotal: count * Number(Product.prod_price),
            clit_prod_id: prod_id,
            clit_qty: count,
            clit_stat_name: 'PENDING'


        }
        if (CartId !== undefined) {
            console.log(data)
            axios.post(`${apiCart}/cartLineItems/${acco_id}/${CartId}/${prod_id}`, data)
                .then(result => {
                    if (result.data.error) {
                        console.log(result.data)

                    } else {
                        if (result.data) {

                            // setCartQuantity('')
                            setCartTotal('')
                            setCartWeight('')
                            setCartProdId('')



                        }
                    } 
                    history.push('/cart')
                })
                .catch((e) => {
                    setError(e.response.message)
                })
                
        }
        else {

            console.log(data)
            axios.post(`${apiCart}/cartLineItems/${acco_id}`, data)
                .then(result => {
                    if (result.data.error) {
                        console.log(result.data)

                    } else {
                        if (result.data) {

                            // setCartQuantity('')
                            setCartTotal('')
                            setCartWeight('')
                            setCartProdId('')



                        }
                    } 
                    history.push('/cart')
                })
                .catch((e) => {
                    setError(e.response.message)
                })
        }
       
    }

    const klikkeranjang = (x) => {
        x.preventDefault()
        
        const editStok = {
            prod_stock : count
        }
        axios.put (`${apiProductTransaction}/product/stock/${prod_id}` ,editStok)
        .then (result => {
            if (result.error) {
                console.log(result)

            } else {
                if (result) {
                    // alert(count)
                    // // setCartQuantity('')
                    // setCartTotal('')
                    // setCartWeight('')
                    // setCartProdId('')



                }
            } 
        })
        .catch((e) => {
            setError(e.response.message)
        })

        const data = {
            clit_subweight: count * Number(Product.prod_weight),
            clit_subtotal: count * Number(Product.prod_price),
            clit_prod_id: prod_id,
            clit_qty: count,
            clit_stat_name: 'PENDING'


        }
        if (CartId !== undefined) {
            console.log(data)
            axios.post(`${apiCart}/cartLineItems/${acco_id}/${CartId}/${prod_id}`, data)
                .then(result => {
                    if (result.data.error) {
                        console.log(result.data)

                    } else {
                        if (result.data) {

                            // setCartQuantity('')
                            setCartTotal('')
                            setCartWeight('')
                            setCartProdId('')



                        }
                    } window.location.reload()
                    notify()
                })
                .catch((e) => {
                    setError(e.response.message)
                })
        }
        else {

            console.log(data)
            axios.post(`${apiCart}/cartLineItems/${acco_id}`, data)
                .then(result => {
                    if (result.data.error) {
                        console.log(result.data)

                    } else {
                        if (result.data) {

                            // setCartQuantity('')
                            setCartTotal('')
                            setCartWeight('')
                            setCartProdId('')



                        }
                    } notify()
                })
                .catch((e) => {
                    setError(e.response.message)
                })
        }
    }

    useEffect(() => {
        let fetchProduct = async () => {
            await axios({
                url: `${apiProductTransaction}/product/${prod_id}`,
                method: "get",
                headers: {
                    "Content-type": "application/json"
                }
            }).then((res) => setProduct(res.data))
                .catch((err) => console.error(err));
        }
        fetchProduct()
        async function fetchCart() {
            return await axios({
                url: `${apiCart}/cart/${acco_id}`,
                method: 'GET'
            }).then((result) => setCartId(result.data[0].cart_id))
                .catch((err) => console.log(err));
        }
        fetchCart()
        async function fetchImg() {
            return await axios({
                url: `${apiProductTransaction}/productImages/${primId}`,
                method: 'GET'
            }).then((result) => setSelectetImg(result.data.prim_path))
                .catch((err) => console.log(err));
        }
        fetchImg()
    }, [])

    useEffect(() => {
        console.log(Product)
        if (Product.product_variants && Product.product_variants.length > 0) {
            Product.product_variants.map((x) => {
                switch (x.prova_name) {
                    case "SIZE":
                        let variant = x.prova_option
                        setSize(variant.split(","))
                        break;
                    case "WARNA":
                        let color = x.prova_option
                        setColor(color.split(","))

                    default:
                        break;
                }
            })

            if (Product.product_variants.length > 1) {

            }
            // console.log(variantArray)
        }
    }, [Product])

    useEffect(() => {
        axios({
            url: `${apiUserAccount}/account/1001`,
            method: "get",
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => setAccount(res.data))
            .catch((err) => console.error(err));
        console.log(Account)
    }, [])



    {
        return (
            <>
                <div>
                    <div className="flex flex-wrap rounded-lg shadow py-5 mb-5 border-4 border-pink-500" >
                        <div className="z-10 w-1/2 sm:w-1/3 product "id ="zoom">
                            
                            <img src={selectedImg} alt="Selected"
                            // style={{ cursor: 'pointer' }}
                                className="selected"
                            // onClick={fotoproduct}
                            />
                            
                            
                            
                            {/* <div className=" imgContainer">
                            {Images.map((img, index) => (
                                <img className="product-image"
                                    style={{ border: selectedImg === img ? " 4px solid grey " : "" }}

                                    key={index}
                                    src={img.prod}
                                    alt="kerudung"
                                    onClick={() => setSelectetImg(img)}
                                /> 

                            ))}

                        </div> */}

                            <div className="w-4/16 mr-5 mb-2 flex item-center text-sm font-medium text-gray-500 dark:text-gray-300 mt-2 ml-9"> Share:
                         <svg class="h-5 w-5 fill-current text-pink-500 ml-5" xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                                    <path d='M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z' />
                                </svg>

                                <svg width="20" height="20" fill="currentColor" class="mr-2 ml-2 text-pink-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1343 12v264h-157q-86 0-116 36t-30 108v189h293l-39 296h-254v759h-306v-759h-255v-296h255v-218q0-186 104-288.5t277-102.5q147 0 228 12z">
                                    </path>
                                </svg>
                                <svg width="20" height="20" fill="currentColor" class="mr-2 text-pink-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M896 786h725q12 67 12 128 0 217-91 387.5t-259.5 266.5-386.5 96q-157 0-299-60.5t-245-163.5-163.5-245-60.5-299 60.5-299 163.5-245 245-163.5 299-60.5q300 0 515 201l-209 201q-123-119-306-119-129 0-238.5 65t-173.5 176.5-64 243.5 64 243.5 173.5 176.5 238.5 65q87 0 160-24t120-60 82-82 51.5-87 22.5-78h-436v-264z">
                                    </path>
                                </svg>
                            </div>
                            {/* <div class="w-4/12 fas fa-heart text-pink-500">okee</div> */}



                        </div>
                        <div className="w-1/2 sm:w-2/3 flex flex-wrap content-evenly">
                            <div className="w-full">
                                <h1 class="flex-auto text-3xl font-semibold dark:text-black-50">
                                    {Product.prod_name}
                                </h1>
                            </div>
                            <div class="w-4/16 mr-5 mb-5 flex item-center text-sm font-medium text-gray-500 dark:text-gray-300 mt-2">
                                5.0
                            <svg class="w-5 h-5 fill-current text-pink-500" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                                    </path>
                                </svg>
                                <svg class="w-5 h-5 fill-current text-pink-500" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                                    </path>
                                </svg>
                                <svg class="w-5 h-5 fill-current text-pink-500" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                                    </path>
                                </svg>
                                <svg class="w-5 h-5 fill-current text-pink-500" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                                    </path>
                                </svg>
                                <svg class="w-5 h-5 fill-current text-pink-500" viewBox="0 0 24 24">
                                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z">
                                    </path>
                                </svg>
                            </div>

                            <div class="w-5/15 item-center text-sm font-medium text-pink-500 dark:text-gray-300 mt-2 underline">{penilaian} Penilaian</div>
                            <div class="w-4/12 ml-5 item-center text-sm font-medium text-pink-500 dark:text-gray-300 mt-2 underline">{terjual} RB Terjual</div>
                            {/* <div className="w-4/12 mb-5">Harga</div> */}
                            <div className="w-full mb-5 text-4xl text-pink-500" values="Color">{convertToRupiah(Product.prod_price)}</div>
                            <div className="w-4/12">Warna</div>
                            <div className="w-6/12">
                                {Color.map((x) =>
                                    <button class="bg-white hover:bg-pink-700 mb-5 mr-2 text-black px-3 border border-pink-500 rounded active:bg-pink-500"
                                    >
                                        {x}
                                    </button>
                                )
                                }

                            </div>
                            <div className="w-4/12">Ukuran</div>

                            <div class="space-x-10 flex">
                                {
                                    Size.map((x) =>
                                        <label class="text-center text-sm mb-5 mr-2">
                                            <input type="radio" class=" w-4 h-4 flex items-center justify-center bg-pink-500 dark:bg-gray-600 rounded-lg" name="size" value="xs" />
                                            {x}
                                        </label>

                                    )
                                }
                            </div>

                            <div className="w-full flex">
                                <div className="w-4/12 mb-10">Kuantitas</div>

                                <div class="flex flex-row h-10 w-2/12 rounded-lg relative bg-transparent mt-1">
                                    <button onClick={() => count > 1 ? setCount(count - 1) : setCount(0)} data-action="increment" class="bg-pink-500 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer">
                                        <span class="m-auto text-2xl font-thin text-white">−</span>
                                    </button>
                                    <input class="outline-none focus:outline-none text-center w-full bg-white-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none" name="custom-input-number" value={count}></input>
                                    <button onClick={() => setCount(count + 1)}
                                        data-action="increment" class="bg-pink-500 text-gray-600 hover:text-gray-700 hover:bg-black-400 h-full w-20 rounded-r cursor-pointer">
                                        <span class="m-auto text-2xl font-thin text-white">+</span>
                                    </button>

                                </div>
                                <div className="w-5/12 ml-5 mt-2 flex-none text-sm font-medium text-gray-500 dark:text-gray-300">
                                    tersisa {Product.prod_stock} buah
                        </div>

                            </div>
                            <div className="w-full flex">
                                <div className="w-4/12">
                                    <a href="#" class="uppercase py-2 px-4 rounded-lg bg-transparant border-2 border-pink-500 text-black-500 dark:text-white hover:bg-black-500 hover:text-black text-md"
                                        values="klikKeranjang" onClick={klikkeranjang}
                                    >
                                        MASUKKAN KERANJANG
                        </a>
                                </div>
                                <div class="w-6/12">
                                    <button  class="uppercase py-2 px-4 rounded-lg bg-pink-500 border-2 border-pink-500 text-white text-md mr-4 hover:bg-transparant 400"
                                        values="klikCart" onClick={klikCart} disabled={Product.prod_stock<6}>
                                        BELI SEKARANG
                        </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="w-full flex flex-wrap rounded-lg shadow py-5 mb-5 border-4" > 
                    <div className="w-1/3 ">
                        <img src="./samsung logo.png" class=" ml-5 rounded-lg inset-0 w-full h-full object-cover " />
                    </div>
                    <div className="w-2/3 flex flex-wrap content-evenly">
                        <div className="w-3/4">
                            <h1 class="flex-auto text-xl font-semibold dark:text-gray-50">
                                {shopName}
                        </h1>
                        </div>
                        <div className="w-4/12 mb-5">Jakarta</div>
                    </div>

                </div>  */}
                    <div className="flex flex-wrap rounded-lg shadow py-5 mb-5 border-4 border-pink-500" >
                        <div className="w-full ml-10 mr-10 mb-5 shadow-none text-m"> Deskripsi Produk </div>
                        <div class="w-full ml-10 mr-10 text-gray-700 text-justify">
                            {Product.prod_desc}

                        </div>
                    </div>
                </div>
            </>

        )

    }
}