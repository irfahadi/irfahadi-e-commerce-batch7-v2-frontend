import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { apiProductMaster } from '../../config/apiUrl';
import axios from "axios";
import swal from 'sweetalert';

export const EditBrand = () => {
    const [brand, setbrand] = useState([]);
    const [brand_name, setBrandName] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const id = localStorage.getItem('id')
    let history = useHistory()

    // console.log(id)
    const OnChangeBrandName = e => {
        const value = e.target.value
        setBrandName(value)
        setError('')
    }
    const GetBrand = async () => {
        // console.log(GetBrand)
        const response = await axios.get(`${apiProductMaster}/brand/${id}`)
        return response.data;

        // console.log(response.data)
    }
    // const notifyErr = () => {
    //     // history.push('/brand')
    //     swal("Cancel", "You brand list Not Changed!", "error");
    // }
    const notify = () => {
        swal("Good job!", "You brand list changed!", "success");
    }

    useEffect(() => {
        const getListBrand = async () => {
            const listbrand = await GetBrand();
            console.log(listbrand)

            if (listbrand) {
                setBrandName(listbrand.brand_name);
                setbrand(listbrand)
            }
        }
        getListBrand();
    }, [])

    const editBrand = () => {
        // console.log(id)
        // e.preventDefault()
        const data = {
            brand_name: brand_name,
        }
        // console.log(data)
        axios.put(`${apiProductMaster}/brand/${id}`, data)
            .then(result => {
                if (result) {
                    console.log(result.data)
                    if (result.data) {
                        setBrandName('')
                        setAlert(result.data.message)
                        notify()
                        history.push('/brand')
                        setTimeout(() => {
                            setAlert('')
                        }, 2500)
                    }
                }
            })
            .catch(e => {
                // history.push("/brand")
                setError(e.response.data.message)
            })
        // history.push("/brand")
    }
    return (
        // <!-- component -->
        <div class="flex flex-col items-center justify-center my-10 ">
            <div class="flex flex-col bg-white border-t-2 border-primary  shadow-md  px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-md w-full max-w-md">


                <h1 class="font-medium self-left text-4xl sm:text-3xl  text-black">Edit Brand</h1>
                <span class="self-left">Changes you make will be visible to others brands</span>
                <div class="relative mt-7 h-px bg-gray-300">
                    <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
                        <span class="bg-white px-4 text-xs text-gray-500 uppercase"></span>
                    </div>
                </div>
                <div class="mt-6 mx-4">
                    <form onSubmit={editBrand}>
                        <div class="mb-4">
                            <input placeholder="name"
                                value={brand_name}
                                onChange={OnChangeBrandName}
                                class="shadow appearance-none h-16 text-lg rounded w-full 
                            py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline"
                                id="brandName" type="text" ref={({ minLength: { value: 2, message: "Too Short" } })} />
                        </div>
                        {error.text && <p>{error.text.message}</p>}

                        <div class="flex flex-row-reverse  gap-2">
                            <Link
                                onClick={editBrand}
                                value="editBrand"

                                class="flex items-center justify-center focus:outline-none bg-white  text-black text-md sm:text-base bg-button hover:bg-red-300 hover:text-black rounded py-2 w-full transition duration-150 ease-in"
                            >
                                Submit
                  </Link>
                            <Link class="flex items-center justify-center focus:outline-none bg-white  text-black text-md sm:text-base bg-button hover:bg-red-300 hover:text-black rounded py-2 w-full transition duration-150 ease-in"
                                type="button" to="/brand">

                                Cancel
                        </Link>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}