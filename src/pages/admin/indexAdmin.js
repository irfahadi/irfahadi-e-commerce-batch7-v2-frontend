import axios from "axios";
import react from "react";
import React, { useEffect, useState } from "react";
import { apiUserMaster, apiUserAccount } from "../../config/apiUrl";
import { Redirect, useHistory } from "react-router";
import SidebarAdmin from './sidebarAdmin'


export default function IndexAdmin() {

    const [Order, SetOrder ] = useState([]);
    const [Product, setProduct ] = useState([]);
    const [Brand, SetBrand ] = useState([]);
    const [Users, SetUsers ] = useState([]);
    let history = useHistory();


    if (localStorage.getItem('dataUserName') !== 'Admin') {
        alert('dilarang masuk!')
        history.push("/home")

    }
    
    const GetOrder = async () => {
        const response = await axios.get(`${apiUserAccount}/dashboard/Torder`);
        return response.data;
      };

      const GetProduct = async () => {
        const response = await axios.get(`${apiUserAccount}/dashboard/Tproduct`);
        return response.data;
      };

      const GetBrand = async () => {
        const response = await axios.get(`${apiUserAccount}/dashboard/Tbrand`);
        return response.data;
      };

      const GetUser = async () => {
        const response = await axios.get(`${apiUserAccount}/dashboard/Tuser`);
        return response.data;
      };
    
      useEffect(() => {
        const getListOrder = async () => {
          const listOrder = await GetOrder();
          console.log(listOrder)
          if (listOrder) SetOrder(listOrder[0].total_order);
        };
        getListOrder();
      }, []);

      useEffect(() => {
        const getListProduct = async () => {
          const listProduct = await GetProduct();
          console.log(listProduct)
          if (listProduct) setProduct(listProduct[0].total_product);
        };
        getListProduct();
      }, []);

      useEffect(() => {
        const getListBrand = async () => {
          const listBrand = await GetBrand();
          console.log(listBrand)
          if (listBrand) SetBrand(listBrand[0].total_brand);
        };
        getListBrand();
      }, []);

      useEffect(() => {
        const getListUsers = async () => {
          const listUsers = await GetUser();
          console.log(listUsers)
          if (listUsers) SetUsers(listUsers[0].total_user);
        };
        getListUsers();
      }, []);

    return (
        <div className="flex flex-wrap">
        <SidebarAdmin />
        <div className="w-full md:w-9/12 md:mt-10">
        <div className="w-full x:w-8/12 mb-12 xl:mb-0 px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                    <div className="font-sans ml-2 w-10/12 h-full mt-2 h-36 bg-pink-100 border-2 border-primary flex-wrap shadow-lg rounded-lg text-white font-light pl-2">
                    <div class="p-4">
          
            <span class="ml-2 font-semibold text-3xl text-pink-500 my-6">Summary</span>
            <hr className="mt-4 mb-4 border-b-2 border-table"/>
            <div class="float-left text-2xl font-semibold text-pink-400">Jumlah Users Aktif</div>
            <span class="float-right text-2xl font-semibold text-pink-700">{Order} Users </span>
            <br/>
            <br/>
            <div class="float-left text-2xl font-semibold text-pink-400">Jumlah Brand</div>
            <span class="float-right text-2xl font-semibold text-pink-700">{Brand} Brand</span>
            <br/>
            <br/>
            <div class="float-left text-2xl font-semibold text-pink-400">Jumlah Product</div>
            <span class="float-right text-2xl font-semibold text-pink-700">{Product} Product</span>
            <br/>
            <br/>
            <div class="float-left text-2xl font-semibold text-pink-400">Jumlah Order</div>
            <span class="float-right text-2xl font-semibold text-pink-700">{Order} Orders</span>
            <br/>
          </div>
          </div>
                    </div>
                </div>
                <div className="block w-full overflow-x-auto">
                    
                </div>
            </div>
        </div>
        </div>
        </div>
    )
}
