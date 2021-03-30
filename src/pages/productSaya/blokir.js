import React, { Component } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import convertToRupiah from '../product/convertToRupiah'
import { apiProductMaster, apiProductTransaction, apiUserMaster } from '../../config/apiUrl'
import { toast } from 'react-toastify'

export default function Blokir() {
  const history = useHistory()
  const [Product, setProduct] = useState([]);
  const [Category, setCategory] = useState([]);
  const [search, setSearch] = useState('')
  const [showEdit, setShowEdit] = useState(false)
  const [showTambah, setShowTambah] = useState(false)
  const [filterProduct, setFilterProduct] = useState([])
  const [prodToEdit, setProdToEdit] = useState()
  const acco_id = localStorage.getItem("dataAccountId")
  const token = localStorage.getItem("token");

  const onClickAddProduct = () => {
    history.push('/tambahProduct')
  }
  const onClickEditProduct = (e) => {
    console.log(e)
    setProdToEdit(e.target.value)
    setShowEdit(true)
    // history.push('/editProduct')
    localStorage.setItem("id", e.target.value)
  }

  const deleteProduct = async (y) => {

    const response = await axios.delete(`${apiProductTransaction}/product/${y}`)
    return response.data
  }
  toast.configure()
  const notifyLogin = () => {
    toast.error("Jangan Bandel Harap Login Dulu ", {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  }

  useEffect(() => {
    console.log(setProduct)
    axios({
      url: `${apiProductTransaction}/product/getblokir/${acco_id}`,
      method: "get",
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [showEdit])



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
  //  useEffect(() => {
  //       Product.map((x)=> {
  //         if(x.category.cate_name.includes(Category))
  //         setCategory(Category=>[...Category,x.category.cate_name])
  //       })
  //       console.log(Category)
  // }, [Product])

  // useEffect(() => {
  //   setFilterProduct(
  //     Product.filter((product) =>
  //       prod_name.name.toLowerCase().includes(search.toLowerCase())
  //     )
  //   );
  // }, [search, Product]);

  // console.log(token)

  const a = (axios.defaults.headers.common["Authorization"] =
    "bearer " + token);
  console.log(a);
  if (!token) {
    notifyLogin();
    history.push("/login");
  }

  useEffect(() => {
    axios({
      url: `${apiProductMaster}/product/stat/${search}`,
      method: "get",
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
    console.log(Category)
  }, [search])

  {
    return (
      <div>


        {/* { !showEdit ? ( //jika showEdit false, maka tampilkan product, jika true maka tampilkan edit form */}
        <div className="container w-full flex flex-wrap rounded-lg shadow py-5 mb-5 border-4 border-pink-500">
          <div className="flex flex-col w-full ">
            <div class="grid  grid-cols-4 gap-4 ml-5 items-center justify-between">
              <div className="  items-center ">
                Nama Product
                </div>
              <div class=" relative mb-2 gap-4 mr-4 ">
                <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2 gap-2">
                  <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current mr-3 ">
                    <path
                      d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                    </path>
                  </svg>
                </span>
                <input class="sm:text-sm appearance-none rounded-r rounded-l 
                            sm:rounded-l-none border border-gray-400 
                            border-b block pl-8 pr-6 py-2 w-full 
                            bg-white text-lg placeholder-gray-400 
                            text-gray-700 focus:bg-white 
                            focus:placeholder-gray-600 focus:text-gray-700 
                            focus:outline-none " placeholder="Search "
                  onChange={(event) => {
                    setSearch(event.target.value)
                  }} />
              </div>

              {/* <div className="  items-center ">
                Kategory
                </div>
              <div class=" relative mb-2 gap-4 mr-4 ">
                <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2 gap-2">
                  <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current mr-3 ">
                    <path
                      d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                    </path>
                  </svg>
                </span>
                <input class="sm:text-sm appearance-none rounded-r rounded-l 
                            sm:rounded-l-none border border-gray-400 
                            border-b block pl-8 pr-6 py-2 w-full 
                            bg-white text-lg placeholder-gray-400 
                            text-gray-700 focus:bg-white 
                            focus:placeholder-gray-600 focus:text-gray-700 
                            focus:outline-none " placeholder="Search "
                  onChange={(event) => {
                    setSearch(event.target.value)
                  }} />
              </div> */}

            </div>
            {/* <div class="grid grid-cols-4 gap-4 ml-5 items-center justify-between">
              <div className="  items-center ">
                Stock
                </div>
              <div class=" relative mb-2 gap-4 mr-4 ">
                <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2 gap-2">
                  <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current mr-3 ">
                    <path
                      d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                    </path>
                  </svg>
                </span>
                <input class="sm:text-sm appearance-none rounded-r rounded-l 
                            sm:rounded-l-none border border-gray-400 
                            border-b block pl-8 pr-6 py-2 w-full 
                            bg-white text-lg placeholder-gray-400 
                            text-gray-700 focus:bg-white 
                            focus:placeholder-gray-600 focus:text-gray-700 
                            focus:outline-none " placeholder="Search "
                  onChange={(event) => {
                    setSearch(event.target.value)
                  }} />
              </div>


            </div> */}

          </div>








          <div className="w-full flex flex-wrap content-evenly">



            <table class="border-collapse w-full mr-10 ml-10 mt-5 ">
              <thead>
                <tr>
                  <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Produk Id</th>
                  <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Nama Produk</th>
                  <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Deskripsi Produk</th>
                  <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Harga</th>
                  <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Stok</th>
                  <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Berat</th>
                  <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Alasan</th>
                  {/* <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {Product.filter((val) => {
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
                      <tr class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                        <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                          <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Produk Id</span>

                          {x.prod_id}
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
                          <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Berat</span>
                          {x.prod_reason}
                        </td>
                      </tr>)
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {/* ) : //showEdit true, menampilkan form edit, tampilan product tidak dtiampilkan
          <EditProduct
            setShowEdit={setShowEdit}


          />
        } */}
      </div >
    )
  }
}