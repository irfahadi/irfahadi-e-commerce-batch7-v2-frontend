import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { apiProductMaster } from '../../config/apiUrl';
import axios from "axios";
import swal from 'sweetalert';

export const EditCond = () => {
    const [condition, setCondition] = useState([]);
    const [cond_name, setCondName] = useState('');
    const [cond_desc, setCondDesc] = useState('');
    const [error, setError] = useState('');
    const [alert, setAlert] = useState('');
    const id = localStorage.getItem('id')
    let history = useHistory()

    // console.log(id)
    const OnChangeCondName = e => {
        const value = e.target.value
        setCondName(value)
        setError('')
    }
    const OnChangeCondDesc = e => {
        const value = e.target.value
        setCondDesc(value)
        setError('')
    }
    const GetCond = async () => {
        // console.log(GetCond)
        const response = await axios.get(`${apiProductMaster}/condition/${id}`)
        return response.data;

        // console.log(response.data)
    }
    // const notifyErr = () => {
    //     // history.push('/condition')
    //     swal("Cancel", "You brand list Not Changed!", "error");
    // }
    const notify = () => {
        swal("Good job!", "You Condition list changed!", "success");
    }

    useEffect(() => {
        const getListCond = async () => {
            const listCond = await GetCond();
            console.log(listCond)

            if (listCond) {
                setCondName(listCond.cond_name);
                setCondDesc(listCond.cond_desc);
                setCondition(listCond)
            }
        }
        getListCond();
    }, [])

    const editCond = () => {
        // console.log(id)
        // e.preventDefault()
        const data = {
            cond_name: cond_name,
            cond_desc: cond_desc
        }
        console.log(data)
        axios.put(`${apiProductMaster}/condition/${id}`, data)
            .then(result => {
                if (result) {
                    console.log(result.data)
                    if (result.data) {
                        setCondName('')
                        setCondDesc('')
                        setAlert(result.data.message)
                        notify()
                        history.push('/condition')
                        setTimeout(() => {
                            setAlert('')
                        }, 2500)
                    }
                }
            })
            .catch(e => {
                history.push('/condition')
                setError(e.response.data.message)
            })
    }
    return (
        // <!-- component -->
        <div class="max-w-lg max-w-xs bg-primary shadow-2xl rounded-lg mb-5 mx-auto text-center py-12 mt-4 rounded-xl">
            <h1 class="text-white text-center font-extrabold -mt-3  text-3xl">Edit Condition</h1>
            <div class="container py-5 max-w-md mx-auto">
                <form onSubmit={editCond}>
                    <div class="mb-4">
                        <input placeholder="name"
                            value={cond_name}
                            onChange={OnChangeCondName}
                            class="shadow appearance-none h-16 text-lg rounded w-full 
                            py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline"
                            id="condName" type="text" ref={({ minLength: { value: 2, message: "Too Short" } })} />
                    </div>
                    <div class="mb-4">
                        <input placeholder="name"
                            value={cond_desc}
                            onChange={OnChangeCondDesc}
                            class="shadow appearance-none h-16 text-lg rounded w-full 
                            py-2 px-3 text-gray-700 leading-tight 
                            focus:outline-none focus:shadow-outline"
                            id="condName" type="text" ref={({ minLength: { value: 2, message: "Too Short" } })} />
                    </div>
                    {error.text && <p>{error.text.message}</p>}

                    <div class="flex items-center justify-end gap-2">
                        <Link
                            onClick={editCond}
                            value="editcond"

                            class="flex items-center justify-center focus:outline-none bg-white  text-black text-md sm:text-base bg-button hover:bg-red-300 hover:text-black rounded py-2 w-full transition duration-150 ease-in"
                        >
                            Submit
                  </Link>
                        <Link class="flex items-center justify-center focus:outline-none bg-white  text-black text-md sm:text-base bg-button hover:bg-red-300 hover:text-black rounded py-2 w-full transition duration-150 ease-in"
                            type="button" to="/condition">

                            Cancel
                        </Link>

                    </div>
                </form>
            </div>
        </div>

    )
}