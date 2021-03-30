import React, { Component } from 'react'
import convertToRupiah from '../convertToRupiah'


const PricecardPdam = (props) => {
    return(
        <div className="w-full md:w-6/12 px-4 text-left">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <h6 className="text-lg font-semibold text-pink-500">{props.vendor === 'PDAM' ? 'PDAM':''}</h6>
                    <hr className="mt-2 border-b-2 border-button" />
                    <div>
                        <span class="float-left text-base font-semibold text-pink-400">Customer Name</span>
                        <span class="float-right text-base font-semibold text-pink-700">{props.nama}</span>
                        <br/>
                        <span class="float-left text-base font-semibold text-pink-400">Bill Number</span>
                        <span class="float-right text-base font-semibold text-pink-700">{props.no_tagihan}</span>
                        <br/>
                        <span class="float-left text-base font-semibold text-pink-400">Bill Price</span>
                        <span class="float-right text-base font-semibold text-pink-700">{convertToRupiah(props.harga)}</span>
                        <br/>
                        <span class="float-left text-base font-semibold text-pink-400">Description</span>
                        <p class="float-right text-base font-semibold text-pink-700">{props.deskripsi}</p>
                    </div>
                  </div>
                </div>
              </div>
    )
}

export default PricecardPdam