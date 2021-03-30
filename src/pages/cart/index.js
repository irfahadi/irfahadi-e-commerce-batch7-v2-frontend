/* eslint-disable react-hooks/rules-of-hooks */
import axios from "axios";
import { stubString } from "lodash-es";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import ModalDelete from "../../components/modal/ModalDelete"
import {apiCart} from "../../config/apiUrl" 

export default function Cart() {
  const [checkedAll, setCheckedAll] = useState(false);
  const [checked, setChecked] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [Cart, setCart] = useState([]);
  const [Order, setOrder] = useState({})
  const history = useHistory();
  const acco_id = localStorage.getItem("dataAccountId")


  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    let allChecked = true;
    for (const index in checked) {
      if (checked[index] === false) {
        allChecked = false;
      }
    }
    if (allChecked) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  }, [checked])

  useEffect(() => {
    setOrder({
      ...Order,
      cart_line_items:Cart
    })
    console.log(Order)
  }, [Cart])

  const toggleCheck = (index) => {
    let check = false
    setChecked((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      check = !prevState[index];
      return newState;
    });
    setCart((prevState)=>{
      const newState = [...prevState]
      if(check === false){
        newState[index].clit_stat_name = 'PENDING'
      } else {
        newState[index].clit_stat_name = 'CHECKOUT'
      }
      return newState
    })

  };

  const toggleDelete = (index) => {
    setDeleted((prevState) => {
      const newState = [...prevState];
      newState[index] = !prevState[index];
      console.log("tes")
      return newState;
    });
  };

  const selectAll = (value) => {
    setCheckedAll(value);
    let total_qty = 0;
    let total_amount = 0;
    let total_weight = 0;
    Cart.map(x=>{
      total_qty+=x.clit_qty;
      total_amount+=x.clit_subtotal;
      total_weight+=x.clit_subweight;
    })
    if(value){
      setOrder({
        ...Order,
        cart_total_qty: total_qty,
        cart_total_amount: total_amount,
        cart_total_weight: total_weight
      }
    )
    }else{
      setOrder({
        ...Order,
        cart_total_qty: 0,
        cart_total_amount: 0,
        cart_total_weight: 0
      }
    )
    }
    setChecked((prevState) => {
      const newState = [ ...prevState ];
      for (const index in newState) {
        newState[index] = value;
      }
      return newState;
    });
    setCart((prevState)=>{
      const newState = [...prevState]
      for (const index in checked ){
        if(value === false){
          newState[index].clit_stat_name = 'PENDING'
        } else {
          newState[index].clit_stat_name = 'CHECKOUT'
        }
      }
      return newState
    })
  };

  const plus = (id,idx)=>{
      setCart(Cart.map(x=>{
        if(x.clit_id !== id) return x
        return{...x, 
          clit_qty: x.clit_qty+1,
          clit_subweight: (x.clit_qty+1)*x.product.prod_weight, 
          clit_subtotal: (x.clit_qty+1)*x.product.prod_price}
      }))
      if(checked[idx]===true){
        setOrder({
          ...Order,
          cart_total_qty: Order.cart_total_qty+1,
          cart_total_amount: Order.cart_total_amount+Order.cart_line_items[idx].product.prod_price,
          cart_total_weight: Order.cart_total_weight+Order.cart_line_items[idx].product.prod_weight
        })
      }
  }

  const minus = (id,idx)=>{
    setCart(Cart.map(x=>{
      if(x.clit_id !== id || x.clit_qty===0) return x
      return{...x, 
        clit_qty: x.clit_qty-1,
        clit_subweight: (x.clit_qty-1)*x.product.prod_weight,
        clit_subtotal: (x.clit_qty-1)*x.product.prod_price,
      }
    }))
    if(checked[idx]===true){
      setOrder({
        ...Order,
        cart_total_qty: Order.cart_total_qty+1,
        cart_total_amount: Order.cart_total_amount-Order.cart_line_items[idx].product.prod_price,
        cart_total_weight: Order.cart_total_weight-Order.cart_line_items[idx].product.prod_weight
      })
    }
  }

  const check = (ev,el) =>{
      if(ev.target.checked){
          setOrder({
              ...Order,
              cart_total_qty: Order.cart_total_qty+el.clit_qty,
              cart_total_amount: Order.cart_total_amount+el.clit_subtotal
            }
          )
      }else{
        setOrder({
          ...Order,
          cart_total_qty: Order.cart_total_qty-el.clit_qty,
          cart_total_amount: Order.cart_total_amount-el.clit_subtotal
        }
      )
      }
  }

  async function fetchCart() {
    return await axios({
      url: `${apiCart}/cart/${acco_id}/PENDING`,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setOrder(res.data[0])
        for (let index = 0; index < res.data[0].cart_line_items.length; index++) {
          setChecked( checked => [...checked,false])
          setDeleted( deleted => [...deleted,false]) 
        }
        setCart(res.data[0].cart_line_items)
      })
      .catch((err) => console.error(err));
  }

  const checkout = async () =>{
    if(Order){
      return await axios({
        data:Order,
        url: `${apiCart}/cart/${Order.cart_id}`,
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(() => {
          setOrder({})
          return history.push("/cart-orders")})
          // return fetchCart())
        .catch((err) => console.error(err));
    }else{
      return alert("anda belum order barang")
    }
  }

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
      <div className="flex flex-wrap mb-5">
        <div className="w-full md:w-3/12 md:mt-10 px-1 text-center font-bold text-xl mb-4">
          My Cart
        </div>
        <div className="w-full md:w-9/12 ">
          <div className="text-sm block mb-4 p-3  rounded border border-solid bg-primary text-white">
            <div className="flex justify-around items-center font-bold">
              <div className="lg:w-1/12 md:w-3/12 sm:w-2/12 w-4/12">Produk</div>
              <div>Harga</div>
              <div>Kuantitas</div>
              <div>Total</div>
              <div>Aksi</div>
            </div>
          </div>

          {Cart.map((x,y) => 
            {
              return (
              <div className="text-sm block my-4 p-3  rounded border border-solid border-gray-500">
                {
                  deleted[y]===true?<ModalDelete 
                  image={x.product.product_images[0].prim_path} 
                  name={x.product.prod_name}
                  url={`${apiCart}/cartLineItems/item/${x.clit_id}`}
                  close={()=>toggleDelete(y)}
                  update={()=>{
                    toggleDelete(y)
                    fetchCart()
                  }}
                  />:null
                }
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div>
                      <input
                        type="checkbox"
                        class="form-checkbox h-3 w-3 text-gray-600"
                        onChange={(event)=> {
                          check(event,x)
                          toggleCheck(y)
                          }
                         }
                        checked={checked[y]}
                      />
                    </div>
                    <div className="h-20 w-20 m-2 rounded border border-solid border-white">
                      <img src={x.product.product_images[0]?.prim_path} alt="product" />
                    </div>
                    <div>{x.product.prod_desc.substring(0,20)}</div>
                  </div>
                  <div>Rp. {numberWithCommas(x.product.prod_price)}</div>
                    <div className="flex flex-row">
                      <div className="px-2 bg-gray-500 text-white rounded" style={{cursor:'pointer'}} onClick={()=>minus(x.clit_id,y)}>-</div>
                      <div className="px-2 ">{x.clit_qty}</div>
                      <div className="px-2 bg-gray-500 text-white rounded" style={{cursor:'pointer'}} onClick={()=>plus(x.clit_id,y)}>+</div>
                    </div>
                  <div>Rp. {numberWithCommas(x.clit_subtotal)}</div>
                  <div className="lg:mr-10"> 
                  <button className=" font-bold bg-button p-1 md:p-2 hover:bg-pink-300 rounded text-black" onClick={()=> toggleDelete(y)}>
                  Hapus
                  </button></div>
                </div>
              </div>
            )
            }
          )}

          <div className="flex justify-between items-center mx-2">
            <div>
              <input
                type="checkbox"
                class="form-checkbox h-3 w-3 text-gray-600 mr-2"
                onChange={(event) => selectAll(event.target.checked)}
                checked={checkedAll}
              />
              <span>Pilih Semua</span>
            </div>
            <div>Subtotal untuk Produk({Order?.cart_total_qty} produk) </div>
            <div>Rp. {Order?.cart_total_amount}</div>
            <div>
              <button className="text-black font-bold bg-button  lg:p-3 p-2 hover:bg-pink-300 rounded lg:mr-5 mb-5"
              onClick={checkout}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
  );
}
