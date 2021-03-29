import React, { Component } from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import EditProduct from './editProduct'
import convertToRupiah from './convertToRupiah'
import { apiProductMaster, apiProductTransaction, apiUserMaster } from '../../config/apiUrl'
import { toast } from 'react-toastify'
import ModalUpdateStatus from './modalUpdate'

export default function UpdateStatus() {
  const history = useHistory()
  const [Product, setProduct] = useState([]);
  const [Category, setCategory] = useState([]);
  const [search, setSearch] = useState('')
  const [showEditStatus, setShowEditStatus] = useState(false)
  const [prodToEdit, setProdToEditStatus] = useState()
  const acco_id = localStorage.getItem("dataAccountId")
  const token = localStorage.getItem("token");
  
  const onClickAddProduct = () => {
    history.push('/tambahProduct')
  }
  const onClickEditStatus = (e) => {
    console.log(e)
    setProdToEditStatus(e.target.value)
    setShowEditStatus(true)
    // history.push('/editProduct')
    localStorage.setItem("updateStatusProduct", e.target.value)
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
    axios({
      url: `${apiProductTransaction}/product`,
      method: "get",
      headers: {
        "Content-type": "application/json"
      }
    }).then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [showEditStatus])



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

  {
    return (
      <div>

        <div class="container gap-8 justify-center  flex flex-row flex-wrap   text-2xl uppercase rounded mb-4 ">
          <Link to="/productSaya" class="w-50 bg-primary text-white font-bold hover:text-black  tracking-wide text-white  rounded  hover:border-item-600 hover:bg-white hover:text-black shadow-md py-2 px-6 inline-flex items-center">Product</Link>
          <Link to="/brand" class="w-50 bg-primary text-white font-bold hover:text-black  tracking-wide text-white  rounded  hover:border-item-600 hover:bg-white hover:text-black shadow-md py-2 px-6 inline-flex items-center">Brand</Link>
          <Link to="/category" class="w-50 bg-primary text-white font-bold hover:text-black  tracking-wide text-white  rounded  hover:border-item-600 hover:bg-white hover:text-black shadow-md py-2 px-6 inline-flex items-center">Category</Link>
          <Link to="/condition" class="w-50 bg-primary text-white font-bold hover:text-black  tracking-wide text-white  rounded  hover:border-item-600 hover:bg-white hover:text-black shadow-md py-2 px-6 inline-flex items-center">Condition</Link>
        </div>

        { !showEditStatus ? ( //jika showEdit false, maka tampilkan product, jika true maka tampilkan edit form
          <div className="flex flex-wrap rounded-lg shadow py-5 mb-5 border-4 border-pink-500">
            <div className="w-full flex flex-wrap content-evenly">
              <div className="w-2/12 md:mt-10 px-1 ml-10">
                Nama Product
                </div>
              <div className="w-3/12 md:mt-10 px-1 mr-5">
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
              </div>
              {/* <div className="w-2/12 md:mt-10 px-1 text-center">
                Kategori
                </div>
              <div className="w-3/12 md:mt-10 px-1">
                <select class="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500" name="animals">
                  <option value="">
                    Select an kategori
                </option>
                  {Category.map((x) => (
                    <option value={x.cate_id}>{x.cate_name}

                    </option>))}

                </select>

              </div> */}
              <div className="w-3/12 ml-5 mt-10 flex justify-end">
                <button onClick={onClickAddProduct} class="bg-primary hover:bg-blue-dark text-white font-bold py-2 px-4 rounded m-auto">
                  Tambah Produk Baru
          </button>
              </div>

              <table class="border-collapse w-full mr-10 ml-10 mt-5 ">
                <thead>
                  <tr>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Produk Id</th>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Nama Produk</th>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Deskripsi Produk</th>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Harga</th>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Stok</th>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Berat</th>
                    <th class="p-3 font-bold uppercase bg-pink-600 text-white border border-gray-300 hidden lg:table-cell">Status</th>
                    {/* <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">Actions</th> */}
                  </tr>
                </thead>
                <tbody>
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
                            <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">Actions</span>
                            <button class="text-blue-400 hover:text-blue-600 underline" value={x.prod_id} onClick={onClickEditStatus}>Blokir</button>
                            <a href="" class="text-blue-400 hover:text-blue-600 underline pl-6" onClick={() => {
                              if (
                                window.confirm(
                                  "apakah anda yakin ingin menghapus data ini?"
                                )
                              ) {
                                deleteProduct(x.prod_id)
                              }
                            }}>Hapus</a>
                          </td>
                        </tr>)
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : //showEdit true, menampilkan form edit, tampilan product tidak dtiampilkan
          <ModalUpdateStatus
            setShowEditStatus={setShowEditStatus}


          />
        }
      </div>
    )
  }
}