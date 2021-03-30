import React, { useState } from 'react'
import convertToRupiah from '../convertToRupiah'


const PricecardPLN = (props) => {

    // let [valCardPln,setValCardPln] = useState(0)
    
    // const onClickValPln = (e) =>{
    //     const value = e.target.value = props.harga
    //     console.log(value);
    //     setValCardPln(value) 
    // }

    return(
        // <div value={valCardPln} onClick={onClickValPln} class="cursor-pointer h-30 w-40 m-4 bg-background rounded-lg shadow-lg p-6 hover:bg-gray-200" tabIndex="0">
        //         <span class="flex justify-center text-md font-semibold">{props.nominal}</span>
        //         <span class="flex justify-center text-xs">{'Bayar : '+props.harga}</span>
        // </div>
        <>
        <span class="flex justify-center text-md font-semibold text-pink-600">{props.nominal}</span>
        <span class="flex justify-center text-xs text-pink-700">{'Bayar : '+convertToRupiah(props.harga)}</span>
        </>
    );
};

export default PricecardPLN