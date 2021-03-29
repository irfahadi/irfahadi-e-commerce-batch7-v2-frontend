import { apiProductMaster } from "../../config/apiUrl"
import axios from 'axios'
import { Link } from 'react-router-dom'
import React, { useState, useEffect, Alert } from 'react';
import { useHistory } from "react-router";
import swal from "sweetalert";
import { toast } from "react-toastify";
// import _ from "lodash"
import ReactPaginate from "react-paginate";
import Pagination from "../../components/pagination/pagination";

function Category(props) {

    let history = useHistory()
    const [category, setCategory] = useState([]);
    const [categoryImg, setCategoryImg] = useState([]);
    const [cate_name, setCateName] = useState([]);
    const [cate_cateId, setCateCateId] = useState([]);
    const [search, setSearch] = useState("");


    // redirect to deskripsi
    const DetailProduct = (cate_id, categoryImg) => {
        localStorage.setItem('categoryDetail', cate_id);
        localStorage.setItem('categoryImages', categoryImg);
        console.log(cate_id)
        console.log(categoryImg)

        history.push(`/product/${cate_id}`)
    }

    // page

    const onClickEditCate = (cate_id) => {
        history.push('/editCate')
        localStorage.setItem('cate_id', cate_id)
    }


    useEffect(() => {
        fetchCate()
    }, [])

    async function fetchCate() {
        return await axios({
            url: `${apiProductMaster}/category`,
            method: "get",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                setCategory(res.data)
                // setPaginatedPosts(_(res.data).silce(0).take(pageSize).value())
            })
            .catch((err) => console.error(err));
    }

    const onRefreshTable = () => {
        const getListCate = async () => {
            const listCate = await fetchCate();
            if (listCate) setCategory(listCate)
        }
        getListCate();
    }
    useEffect(() => {
        const getListCate = async () => {
            const listCate = await fetchCate();
            if (listCate) setCategory(listCate)
        }
        getListCate();
    }, [])

    const deleteCate = async (cate_id) => {
        if (window.confirm('Are you sure?')) {

            const data = {
                cate_name: cate_name,
                // cate_cateId: cate_cateId
            }
            axios.delete(`${apiProductMaster}/category/${cate_id}`)
                .then((data) => {
                    notify()
                    console.log(data)
                    onRefreshTable()
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    toast.configure()
    const notify = () => {
        toast.configure(<CustomToast />, {
            positition: toast.POSITION.TOP_CENTER
            , autoClose: 8000
        })
    }
    const CustomToast = ({ closeToast }) => {
        return (
            <div>
                this Category is delete?
                <button onClick={closeToast}>Close</button>
            </div>
        )
    }

    useEffect(() => {
		// console.log(Category)
		// setLoading(true);
		axios({
			url: `${apiProductMaster}/categoryImg/`,
			method: "get",
			headers: {
				"Content-type": "application/json"
			}
		}).then((res) => setCategoryImg(res.data))
			.catch((err) => console.error(err))
	}, [])





    return (
        <>
           

            <body class="antialiased font-sans mt-4 ">
                <div class="container mx-auto px-4 sm:px-8">
                    <div class="py-3 ml-2">
                        <div class="text-2xl md:text:lg  sm:text-md">
                            <h2 class=" font-semibold leading-tight">Table Category</h2>
                        </div>

                        <div class="my-2 flex sm:flex-row flex-col justify-between">
                            <div class="block relative mb-2 gap-4">
                                <span class="h-full absolute inset-y-0 left-0 flex items-center pl-2 gap-2">
                                    <svg viewBox="0 0 24 24" class="w-5 h-5 fill-current mr-3 ">
                                        <path
                                            d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                        </path>
                                    </svg>
                                </span>
                                <input class="sm:text-sm" placeholder="Search "
                                    onChange={(event) => {
                                        setSearch(event.target.value);
                                    }}
                                    class="appearance-none rounded-r rounded-l 
                            sm:rounded-l-none border border-pink-300 
                            border-b block pl-8 pr-6 py-2 w-full 
                            bg-white text-lg placeholder-gray-400 
                            text-gray-700 focus:bg-white 
                            focus:placeholder-gray-600 focus:text-gray-700 
                            focus:outline-none " />
                            </div>
                            <div class="relative flex flex-wrap ">
                                <Link to="/addCate">
                                    <button
                                        class="w-50 gap-2 bg-white border border-pink-300 tracking-wide text-primary font-bold 
                                        rounded 
                            hover:border-lg hover:bg-primary 
                            hover:text-white shadow-lg  py-2 px-6 inline-flex 
                            items-center ml-2">


                                        <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        <span class="mx-auto uppercase xl:text-lg md:text-md sm:text-sm">
                                            Add Another Category
                                        </span>

                                    </button>
                                </Link>


                            </div>
                        </div>
                        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                            <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
                                <table class="min-w-full leading-normal border-collapse">
                                    <thead class="bg-primary">
                                        <tr>
                                            <th
                                                class="px-5 py-3 border-b-3 border-black-200  text-center text-white sm:text-md lg:text-lg font-semibold  uppercase tracking-wider">
                                                Category Name
                        </th>
                                            <th
                                                class="px-5 py-3 border-b-3 border-black-200  text-center text-white sm:text-md lg:text-lg font-semibold  uppercase tracking-wider">
                                                Category by Id
                        </th>
                                            <th
                                                class="px-5 py-3 border-b-3 border-black-200  text-center text-white sm:text-md lg:text-lg font-semibold  uppercase tracking-wider">
                                                Category Images
                        </th>
                                            <th
                                                class="px-5 py-3 border-b-3 border-black-200  text-center text-white sm:text-md lg:text-lg font-semibold  uppercase tracking-wider">
                                                Action
                        </th>

                                        </tr>
                                    </thead>
                                    <tbody className="gap-2  border-primary">
                                        {
                                            category ?
                                                category
                                                    // .slice(pagesVisited, pagesVisited + usersPerPage)
                                                    .filter((val) => {
                                                        if (search == "") {
                                                            return val
                                                        } else if (val.cate_name.toLowerCase().includes(search.toLowerCase())) {
                                                            return val
                                                        }
                                                    })
                                                    .map((cate, index) => {
                                                        console.log(cate)
                                                        return (
                                                            <tr key={cate.cate_id} >
                                                                <td className="text-center md:text-xl sm:text-lg lg:text-2xl text-black border-2  my-2 uppercase ">{cate.cate_name}</td>
                                                                <td className="text-center md:text-xl sm:text-lg lg:text-2xl text-black border-2  my-2 uppercase ">{cate.cate_cate_id}</td>
                                                                <td className=" flex flex-wrap justify-center text-center md:text-xl sm:text-lg lg:text-2xl text-black border-2">
                                                                    <img class="bg-center h-20 w-20 my-2 " src={cate.category_image.caim_path} />
                                                                </td>
                                                                <td className="border-2">
                                                                    <div class="flex justify-center  ">
                                                                        <button
                                                                            onClick={() => onClickEditCate(cate.cate_id)}
                                                                            class="bg-green-200 hover:bg-green-500 text-green-dark uppercase hover:text-white my-2 py-2 px-4 border border-green 
                                                                            hover:border-transparent rounded mr-2 "
                                                                            type="button">

                                                                            Edit

                                                                        </button>

                                                                        <button

                                                                            onClick={() => {
                                                                                deleteCate(cate.id)
                                                                            }}
                                                                            className="bg-red-200 hover:bg-red-500 
                                                                            text-green-dark uppercase hover:text-white 
                                                                            py-2 px-4 border border-green  my-2
                                                                            hover:border-transparent rounded mr-2" type="button">

                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                            </tr>)
                                                    }) :
                                                <tr>
                                                    <td colSpan={3}>No Records Found.</td>
                                                </tr>
                                        }
                                    </tbody>

                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </>



    )

}

export default Category