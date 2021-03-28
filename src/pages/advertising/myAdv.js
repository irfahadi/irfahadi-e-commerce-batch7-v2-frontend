import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { apiProductTransaction } from "../../config/apiUrl";

export default function MyAdv() {
  const history = useHistory();
  const accco_id = localStorage.getItem("dataAccountId")
  const [Product, setProduct] = useState([]);
  const [Category, setCategory] = useState([]);
  const onClickAddAdv = (adv_id) => {
    localStorage.setItem("adv_id",adv_id)
    history.push("/advertising/add-adv");
  };
  useEffect(() => {
    axios({
      url: `${apiProductTransaction}/account/${accco_id}`,
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => setProduct(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    Product.map((x) => {
      if (x.category.cate_name.includes(Category))
        setCategory((Category) => [...Category, x.category.cate_name]);
    });
    console.log(Category);
  }, [Product]);

  const numberWithCommas = (n) => {
    let nString = ""
    let nStringCheck = n.toString()
    let nSLength = nStringCheck.length
    while(nSLength>3){
        nString = nStringCheck.slice(nSLength-3,nSLength) + "." + nString
        nSLength -= 3
    }
    nString = nStringCheck.slice(0,nSLength) + "." + nString
    nString = nString.slice(0,-1)
    return nString
}

  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full md:w-3/12 md:mt-10 px-1 text-center font-bold text-md flex flex-row justify-evenly md:flex-col md:justify-start ">
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/advertising/my-pkg")}>Package Adv</div>
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/advertising/my-adv")}>My Product</div>
          <div className="py-5 px-2 hover:text-secondary hover:bg-white" style={{cursor:'pointer'}} onClick={()=>history.push("/advertising/add-adv")}>Advertising</div>
        </div>
        <div className="w-full md:w-9/12 flex flex-wrap content-evenly">
          <div className="w-2/12 md:mt-10 px-1 ml-10">Nama Product</div>
          <div className="w-3/12 md:mt-10 px-1 mr-5">
            <div class=" relative ">
              <input
                type="text"
                id="simple-email"
                class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 rounded-lg placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent mb-2 mr-2"
                placeholder="Mohon masukkan"
              />
            </div>
          </div>
          <div className="w-2/12 md:mt-10 px-1 text-center">Kategori</div>
          <div className="w-3/12 md:mt-10 px-1">
            <select
              class="block w-52 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              name="animals"
            >
              <option value="">Select an kategori</option>
              {Category.map((x) => (
                <option value={x}>{x}</option>
              ))}
            </select>
          </div>
          <div className="w-2/12 md:mt-10 ml-10">
            <button class="bg-button hover:bg-blue-dark text-white font-bold py-2 px-4 rounded m-auto hover:bg-green-300">
              Cari
            </button>
          </div>

          <table class="border-collapse w-full mx-10 my-5">
            <thead>
              <tr>
                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Produk Id
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Nama Produk
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Deskripsi
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Harga
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Stok
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Berat
                </th>
                <th class="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {Product.map((x) => {
                return (
                  <tr class="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0">
                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Produk Id
                      </span>
                      {x.prod_id}
                    </td>
                    <td class="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Nama Produk
                      </span>
                      {x.prod_name}
                    </td>
                    <td class="w-full lg:w-auto p-3 text-gray-800  border border-b text-center block lg:table-cell relative lg:static">
                      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Deskripsi
                      </span>
                      {x.prod_desc}
                    </td>
                    <td class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Harga
                      </span>
                      Rp. {numberWithCommas(x.prod_price)}
                    </td>
                    <td class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        Stok
                      </span>
                      {x.prod_stock}
                    </td>
                    <td class="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                      <span class="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                        weight
                      </span>
                      {x.prod_weight}
                    </td>
                    <td class="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                      <button className="bg-primary rounded p-1 text-white" onClick={()=>onClickAddAdv(x.prod_id)}>
                        Promosikan
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
