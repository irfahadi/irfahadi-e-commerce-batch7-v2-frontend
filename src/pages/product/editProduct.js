import React, { Component } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {apiProductMaster, apiProductTransaction} from '../../config/apiUrl'
import {toast} from 'react-toastify'


export default function EditProduct(props) {
    const history = useHistory()
    const [Product, setProduct] = useState([])
    const [Category, setCategory] = useState([])
    const [Brand, setBrand] = useState([])
    const [Condition, setCond] = useState([])
    const [prod_name, setProductName] = useState('');
    const [prod_desc, setProductDesc] = useState('');
    const [prod_price, setProductPrice] = useState('');
    const [prod_stock, setProductStock] = useState('');
    const [prod_cate_id, setProductCate] = useState('');
    const [prod_brand_id, setProductBrand] = useState('');
    const [prod_acco_id, setProductAco] = useState('');
    const [prod_weight, setProductWeight] = useState('');
    const [prod_cond_name, setProductCond] = useState('');
    const [prod_expire, setProductExpire] = useState('');
    const [erorr, setError] = useState('');
    const [alert, setAlert] = useState('');
    const id = localStorage.getItem("id")
    const acco_id = localStorage.getItem("dataAccountId")
    const [ProductVariant, setProductVariant] = useState([])
    const [prova_name, setProvaName] = useState('')
    const [prova_option, setProvaOption] = useState('')
    const [prova_id, setProva_id] = useState('')
    const [prova_id2, setProva_id2] = useState('')
    const [prova_nameSize, setProvaNameSize] = useState('')
    const [prova_optionSize, setProvaOptionSize] = useState('')
    const [image, setImage] = useState('')
    const [prim_id, setPrim_id] = useState('')
    const [loading, setLoading] = useState(false)
    

    toast.configure()
    const notify = () => {
       
        toast.success('Data berhasil diperbarui', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
    }

    const notifyErr = () => {
    
        toast.error('Gagal menperbarui data', {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 2000
        })
    }

    const onChangeProductName = (e) => {
        const value = e.target.value
        setProductName(value)
        setError('')
    }
    const onChangeProductDesc = (e) => {
        const value = e.target.value
        setProductDesc(value)
        setError('')
    }
    const onChangeProductPrice = (e) => {
        const value = e.target.value
        setProductPrice(value)
        setError('')
    }
    const onChangeProductStock = (e) => {
        const value = e.target.value
        setProductStock(value)
        setError('')
    }
    const onChangeProductCate = (e) => {
        const value = e.target.value
        setProductCate(value)
        setError('')
    }
    const onChangeProductBrand = (e) => {
        const value = e.target.value
        setProductBrand(value)
        setError('')
    }
    const onChangeProductAco = (e) => {
        const value = e.target.value
        setProductAco(value)
        setError('')
    }
    const onChangeProductWeight = (e) => {
        const value = e.target.value
        setProductWeight(value)
        setError('')
    }
    const onChangeProductCond = (e) => {
        const value = e.target.value
        setProductCond(value)
        setError('')
    }
    const onChangeProductExpire = (e) => {
        const value = e.target.value
        setProductExpire(value)
        setError('')
    }

    const onChangeProvaName = (e) => {
        const value = e.target.value
        setProvaName(value)
        setError('')
    }
    const onChangeProvaOption = (e) => {
        const value = e.target.value
        setProvaOption(value)
        setError('')
    }

    const onChangeProvaNameSize = (e) => {
        const value = e.target.value
        setProvaNameSize(value)
        setError('')
    }
    const onChangeProvaOptionSize = (e) => {
        const value = e.target.value
        setProvaOptionSize(value)
        setError('')
    }


    const onCLickBackProduct = () => {
        history.push('/productsaya')
    }

    const GetProduct = async () => {
        const response = await axios.get(`${apiProductTransaction}/product/${id}`);
        return response.data
    };

    const GetProductVariant = async () => {
        const response = await axios.get(`${apiProductTransaction}/productvariant/${id}`);
        return response.data
    };

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append("upload_preset", "product" )
        setLoading(true)
    
        const res = await fetch(
                'https://api.cloudinary.com/v1_1/daffadrm/image/upload',
        
                {
                    method: 'POST',
                    body: data
                  }
                )
                const file = await res.json()
            
                setImage(file.secure_url)
                setLoading(false)
                }
                console.log(image)

    useEffect(() => {
        const getListProduct = async () => {
            const listProduct = await GetProduct();
            console.log(listProduct);
            if (listProduct) {
                
                setProductName(listProduct.prod_name);
                setProductDesc(listProduct.prod_desc);
                setProductPrice(listProduct.prod_price);
                setProductStock(listProduct.prod_stock);
                setProductCate(listProduct.prod_cate_id);
                setProductBrand(listProduct.prod_brand_id);
                setProductAco(listProduct.prod_acco_id);
                setProductWeight(listProduct.prod_weight);
                setProductCond(listProduct.prod_cond_name);
                setProductExpire(listProduct.prod_expire);
                setProvaName(listProduct.product_variants[0].prova_name)
                setProvaOption(listProduct.product_variants[0].prova_option)
                setProva_id(listProduct.product_variants[0].prova_id)
                setProva_id2(listProduct.product_variants[1].prova_id)
                setProvaNameSize(listProduct.product_variants[1].prova_name)
                setProvaOptionSize(listProduct.product_variants[1].prova_option)
                setPrim_id(listProduct.product_images[0]?.prim_id)

            }
        };
        getListProduct();
        console.log(Product);

    }, []);
    useEffect(() => {}, [Product]);



    const updateProduct = (e) => {
        console.log(e)
        e.preventDefault()
        const data = {
            prod_name: prod_name,
            prod_desc: prod_desc,
            prod_price: Number(prod_price),
            prod_stock: Number(prod_stock),
            prod_cate_id: (prod_cate_id),
            prod_brand_id: (prod_brand_id),
            prod_weight: Number(prod_weight),
            prod_cond_name: prod_cond_name,
            prod_expire: prod_expire,
            prod_acco_id: acco_id
        };
        console.log(data);
        axios
            .put(`${apiProductTransaction}/product/${id}`, data)
            .then(result => {
                console.log(result)
                if (result.data.error) {  
                    // console.log(result.data);
                    console.log(result.data)
                        notifyErr()

                    }else{
                        console.log(result.data)
                    if (result.data) {
                        setProductName('')
                        setProductDesc('')
                        setProductPrice('')
                        setProductStock('')
                        setProductCate('')
                        setProductBrand('')
                        setProductAco('')
                        setProductWeight('')
                        setProductCond('')
                        setProductExpire('')
                        const dataVariant = {
                            prova_name: prova_name,
                            prova_option: prova_option,
                            prova_prod_id: result.data.prod_id
                        }
                        console.log(dataVariant)
                        axios.put(`${apiProductTransaction}/productvariant/${prova_id}`, dataVariant)
                            .then(result => {
                                if (result.dataVariant.error) {
                                    console.log(result.dataVariant)
                                    notifyErr()
                                } else {
                                    if (result.dataVariant) {
                                        setProvaName('')
                                          ('')
                                        // setProvaProdId('')
                
                                    } notify()
                                }
                            })
                            .catch((e) => {
                                setError(e)
                            })
                            const dataVariant2 = {
                                prova_name: prova_nameSize,
                                prova_option: prova_optionSize,
                                prova_prod_id: result.data.prod_id
                            }
                            console.log(dataVariant2)
                            axios.put(`${apiProductTransaction}/productvariant/${prova_id2}`, dataVariant2)
                                .then(result => {
                                    if (result.dataVariant2.error) {
                                        console.log(result.dataVariant2)
                                        notifyErr()
                                    } else {
                                        if (result.dataVariant2) {
                                            setProvaNameSize('')
                                            setProvaOptionSize('')
                                            // setProvaProdId('')
                    
                                        } notify()
                                    }
                                })
                                .catch((e) => {
                                    setError(e)
                                })
                                console.log(image)
                                const dataImages = {
                                    prim_path:image,
                                    prim_prod_id: result.data.prod_id
                                }
                                axios.put(`${apiProductTransaction}/productImages/${prim_id}`,dataImages)
                                .then(result => {
                                    if (result.dataImages.error) {
                                        console.log(result.dataImages)
                                        notifyErr()
                                    } else {
                                        if (result.dataImages) {
                                
                                            // setProvaNameSize('')
                                            // setProvaOptionSize('')
                                            // setProvaProdId('')
                    
                                        } notify()
                                    }
                                })
                                .catch((e) => {
                                    setError(e)
                                })
                        setAlert(result.data.message);
                        setTimeout(() => {
                            setAlert("");
                        }, 2500);
                    }
                    notify()
                    props.setShowEdit(false)
                }
            })
            .catch((e) => {
                setError(e.response.message);
            });
    };

    useEffect(() => {
        axios({
            url: `${apiProductMaster}/category`,
            method: "get",
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => setCategory(res.data))
            .catch((err) => console.error(err));
        console.log(Category)
    }, [])

    useEffect(() => {
        axios({
            url: `${apiProductMaster}/brand`,
            method: "get",
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => setBrand(res.data))
            .catch((err) => console.error(err));
        console.log(Brand)
    }, [])

    useEffect(() => {
        axios({
            url: `${apiProductMaster}/condition`,
            method: "get",
            headers: {
                "Content-type": "application/json"
            }
        }).then((res) => setCond(res.data))
            .catch((err) => console.error(err));
        console.log(Condition)
    }, [])

    return (
        <div>
            <div className="flex flex-wrap rounded-lg shadow border-4 border-pink-500">

                <form className="w-full flex flex-wrap content-evenly" onSubmit={updateProduct}>
                    <div className="w-full">
                        <h1 class="flex-auto text-xl font-bold dark:text-gray-50 ml-5">
                            Edit produk
                            </h1>
                    </div>
                    <div className="w-full ml-5 text-xs mb-10">
                        Edit kategori yang tepat untuk produkmu
                </div>
                    <div className="w-4/12 ml-5 text-base">
                        Nama Produk
                </div>
                    <div className="w-6/12 ">
                        <div class=" relative ">
                            <input type="text" id="prod_name" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                                placeholder="Mohon masukkan nama produk"
                                value={prod_name}
                                onChange={onChangeProductName} />
                        </div>
                    </div>
                    <div className="w-4/12 ml-5 text-base">
                        Deskripsi Produk
                </div>
                    <div className="w-6/12">

                        <label class="text-gray-700" for="name">
                            <textarea class="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent" id="comment"
                                placeholder="Mohon masukkan deskripsi produk"
                                name="comment" rows="5" cols="40"
                                value={prod_desc}
                                onChange={onChangeProductDesc} />

                        </label>

                    </div>
                    <div className="w-4/12 ml-5 text base">
                        Kategori
                </div>
                    <div className="w-6/12">
                        <select class="block w-52 text-gray-700 py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-2"
                            name="kategori"
                            value={prod_cate_id} onChange={onChangeProductCate}
                        >
                            <option value="oke">
                                pilih kategori
                </option>
                            {Category.map((y) => {
                                return (
                                    <option value={y.cate_id}>{y.cate_name}

                                    </option>)
                            })}
                        </select>
                    </div>
                    <div className="w-4/12 ml-5 text base">
                        Brand
                </div>
                    <div className="w-6/12">
                        <select class="block w-52 text-gray-700 py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-2"
                            name="brand"
                            value={prod_brand_id} onChange={onChangeProductBrand}
                        >
                            <option value="oke">
                                pilih brand
                </option>
                            {Brand.map((y) => {
                                return (
                                    <option value={y.brand_id}>{y.brand_name}

                                    </option>)
                            })}
                        </select>

                    </div>
                    <div className="w-4/12 ml-5 text base">
                        Kondisi
                </div>
                    <div className="w-6/12">
                        <select class="block w-52 text-gray-700 py-2 px-4 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 mb-2"
                            name="conditions"
                            value={prod_cond_name} onChange={onChangeProductCond}
                        >
                            <option value="kondisi">
                                Pilih kondisi
                </option>
                            {Condition.map((y) => {
                                return (
                                    <option value={y.cond_name}>{y.cond_desc}

                                    </option>)
                            })}
                        </select>
                    </div>
                    <div className="w-4/12 ml-5 text base">
                        Berat
                </div>
                    <div className="w-6/12">
                        <div class=" relative ">
                            <input type="number" id="simple-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                                placeholder="Kg"
                                value={prod_weight}
                                onChange={onChangeProductWeight} />
                        </div>
                    </div>
                    <div className="w-4/12 ml-5 text base">
                        Expire
                </div>
                    <div className="w-6/12">
                        <div class=" relative ">
                            <input type="date" id="simple-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                                placeholder="Mohon masukkan"
                                value={prod_expire}
                                onChange={onChangeProductExpire} />
                        </div>
                    </div>
                    <div className="w-4/12 ml-5 text base">
                        Nama Variant
                </div>
                    <div className="w-6/12">
                        <div class=" relative ">
                            <input type="text" id="simple-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2" 
                            placeholder="Mohon masukkan"
                            value={prova_name}
                            // onChange={onChangeProvaName} 
                            />
                        </div>
                    </div>
                    <div className="w-4/12 ml-5 text base">
                        Variant Option
                </div>
                    <div className="w-6/12">
                        <div class=" relative ">
                            <input type="text" id="simple-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2" 
                            placeholder="Mohon masukkan" 
                            value={prova_option}
                            onChange={onChangeProvaOption}/>
                        </div>
                    </div>
                    <div className="w-4/12 ml-5 text base">
                        Nama Variant
                </div>
                    <div className="w-6/12">
                        <div class=" relative ">
                            <input type="text" id="simple-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2" 
                            placeholder="Mohon masukkan"
                            value={prova_nameSize}
                            // onChange={onChangeProvaNameSize} 
                            />
                        </div>
                    </div>
                    <div className="w-4/12 ml-5 text base">
                        Variant Option
                </div>
                    <div className="w-6/12">
                        <div class=" relative ">
                            <input type="text" id="simple-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2" 
                            placeholder="Mohon masukkan" 
                            value={prova_optionSize}
                            onChange={onChangeProvaOptionSize}/>
                        </div>
                    </div>
                    <div className="w-full ml-5 mb-2 text-xl font-semibold">
                        Informasi Penjualan
                </div>
                    <div className="w-4/12 ml-5 text base">
                        Harga
                </div>
                    <div className="w-6/12">

                        <div class="mt-1 relative rounded-md shadow-sm">
                            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span class="text-gray-500 sm:text-sm ">
                                    Rp.
            </span>
                            </div>
                            <input type="number" name="price" id="price" class=" mb-2 focus:ring-indigo-500 border-l border-b border-t border-gray-300 py-2 px-4 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm rounded-md"
                                placeholder="0.00"
                                value={prod_price}
                                onChange={onChangeProductPrice} />
                            <div class="absolute inset-y-0 right-0 flex items-center">
                                <label for="currency" class="sr-only">
                                    Currency
                </label>
                            </div>
                        </div>
                    </div>
                    <div className="w-4/12 ml-5 text base">
                        Stok
                </div>
                    <div className="w-6/12">
                        <div class=" relative ">
                            <input type="number" id="simple-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2"
                                placeholder="Mohon masukkan"
                                value={prod_stock}
                                onChange={onChangeProductStock} />
                        </div>
                    </div>
                    <div className="w-full ml-5 mb-2 text-xl font-semibold">
                        Informasi Media
                </div>
                    <div className="w-4/12 ml-5 text base">
                        Foto Produk
                </div>
                    <div className="w-6/12 ">
                    <input type ="file"
                            onChange={uploadImage}
                        />
                            {loading ? (
                                <h3>Loading...</h3>
                              ) : (
                                  <img src={image} style={{ width: '200px' }} />
                                )}
                        {/* <label class=" mb-5 flex flex-col items-center px-1 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-black">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-xs leading-normal">Select a images</span>
                            <input type='file' class="hidden" />
                        </label>
                        <label class=" mb-5 flex flex-col items-center px-1 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-black">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-xs leading-normal">Select a images</span>
                            <input type='file' class="hidden" />
                        </label>
                        <label class=" mb-5 flex flex-col items-center px-1 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-black">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-xs leading-normal">Select a images</span>
                            <input type='file' class="hidden" />
                        </label>
                        <label class=" mb-5 flex flex-col items-center px-1 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-black">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-xs leading-normal">Select a images</span>
                            <input type='file' class="hidden" />
                        </label>
                        <label class=" mb-5 flex flex-col items-center px-1 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-black">
                            <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                            </svg>
                            <span class="mt-2 text-xs leading-normal">Select a images</span>
                            <input type='file' class="hidden" />
                        </label> */}
                    </div>
                    <div className="w-2/4 grid justify-items-end">
                        <button class="bg-primary hover:bg-blue-dark text-white font-bold py-2 px-4 rounded m-auto"
                            onClick={()=>{props.setShowEdit(false)}}> Batal
</button>
                    </div>

                    <div className="w-2/4 grid justify-items-end">
                        <button type="submit" class="bg-primary hover:bg-blue-dark text-white font-bold py-2 px-4 rounded m-auto" values="updateProduct"> Simpan </button>
                    </div>
                </form>
            </div>

        </div>
    )

}