import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
// import Slider from "../../components/slider/slider";
import { apiProductMaster, apiProductTransaction } from "../../config/apiUrl";
import convertToRupiah from '../product/convertToRupiah'
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useDispatch, useSelector } from "react-redux";
import { clickAdv} from "../../features/adv/advSlices";

export default function Navbar({ fixed }) {
	const dispatch = useDispatch()
	const { entities } = useSelector((state) => state.adv);
	const token = localStorage.getItem('token')
	const id = localStorage.getItem('prod_name')

	const [isLogin, setisLogin] = useState(false)
	const [navbarOpen, setNavbarOpen] = React.useState(false);

	const [loading, setLoading] = useState(false);
	const [Category, setCategory] = useState([]);
	const [Product, setProduct] = useState([]);
	let history = useHistory();

	const [value, setValue] = useState();
	const refresh = () => {
		// re-renders the component
		setValue({});
	}

	// ============ ALERT LOGIN BERHASIL ==============
	
	// redirect to deskripsi
	const DetailProduct = (prod_id, product_images, prod_acco_id) => {
		localStorage.setItem('productDetail', prod_id);
		localStorage.setItem('productImages', product_images);
		localStorage.setItem('productAccount', prod_acco_id);
		// console.log(prod_id)
		// console.log(product_images)
		console.log(entities)
        dispatch(clickAdv({
            prod_id:prod_id,
            entities: entities
        }))
		// dispatch(fetchAdv());
		history.push(`/product/${prod_id}`)
	}

	

	// token untuk mengambil data login
	useEffect(() => {
		// console.log(isLogin)
		if (localStorage.token == null || localStorage.token == undefined) {
			setisLogin(false);
			setValue({});
		}
		else {
			setisLogin(true);
			setValue({});
		}
		setValue({});
	}, [localStorage.token])



	// database product
	useEffect(() => {
		console.log(Product)
		setLoading(true);
		axios({
			url: `${apiProductTransaction}/product/`,
			method: "get",
			headers: {
				"Content-type": "application/json"
			}
			
		}).then((res) => setProduct(res.data))
			.catch((err) => console.error(err))
	}, [])


	useEffect(() => {
		console.log(Category)
		setLoading(true);
		axios({
			url: `${apiProductMaster}/category/cate/`,
			method: "get",
			headers: {
				"Content-type": "application/json"
			}
		}).then((res) => setCategory(res.data))
			.catch((err) => console.error(err))
	}, [])





	return (


		<div>
			{/* 
			{isLogin ? (

				<>
					<div className="capitalize text-center text-3xl font-bold mb-3">
						selamat datang {localStorage.getItem('dataUserName')}
					</div>
				</>

			) : (
				<div className="capitalize text-center text-3xl font-bold mb-3">
					anda belum login
				</div>
			)} */}




			<main class="my-8">
				<div class="container mx-auto px-6">


					<div class="h-64 rounded-md overflow-hidden bg-cover w-full bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')` }}>

					</div>

					{/* <div class="bg-white bg-opacity-50 flex flex-col mt-2  h-full">
						<h3 class="text-gray-600 text-2xl font-medium  ">Kategory</h3>
						<div class=" flex flex-wrap "> */}
					{/* <Link >
										<div class="flex justify-center h-56 w-full bg-gray-500" >
											<div class="flex  h-56 w-full bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590664863685-a99ef05e9f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=345&q=80')` }}>
												<div class="px-5 py-3 flex justify-center items-center ">
													<h3 class="text-gray-700 flex justify-center text-xl uppercase">Pakaian Wanita</h3>

												</div>

											</div>

										</div>
									</Link> */}
					{/* {
								Category.map((cate) => {

									return (
										cate.cate_name === 'Menus' ? null :
										<div class="bg-white w-48 shadow-lg cursor-pointer rounded transform mt-2 hover:mt-2 duration-300 ease-in-out">
										

											<div class="">
												<img src="https://picsum.photos/400/300" alt="" class="rounded-t" />
											</div>

											<div class="p-4">
												<h2 class="text-md text-center uppercase">
													{cate.cate_name}</h2>

											</div>
										</div>
									
									)
								})}
						</div>


					</div> */}
					{/* <div class="md:flex mt-8 md:-mx-4">
						<div class="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1602067932034-f3b9facde0e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80')` }}>
							<div class="bg-gray-900 bg-opacity-50 flex items-center h-full">

							</div>
						</div>
						<div class="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=751&q=80')` }}>
							<div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
							<iframe width="560" height="315" src="https://www.youtube.com/embed/3TA7WyW94Bk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

							</div>
						</div>
					</div> */}


					<div class="mt-16">
						<h3 class="text-gray-600 text-2xl font-medium">All Product</h3>
						<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6">
							{
								Product
								.sort((highest,high, normal)=>{
									if (highest.Product < high.Product){
										return -1
									} if (high < normal){
										return 1
									} if (highest < normal){
										return 0
									}
								})
								.map((prod) => {
									
									return (
										prod.prod_stock < 1  | prod.prod_status === "blokir" ?  null :

								
										(	
											<>
												<div key={prod.prod_id} class="w-full max-w-sm mx-auto rounded-md shadow-xl overflow-hidden">
													<Link onClick={() => 
														DetailProduct(prod.prod_id, prod.product_images[0].prim_id, prod.prod_acco_id)
													}>
														<div class="flex items-end justify-end h-56 w-full bg-cover" >
															<img src={prod.product_images[0]?.prim_path} />
															<div class="absolute flex items-center">
																<button class="p-2 rounded-full bg-primary text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 items-center">
																	<svg class="h-7 w-7" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
																</button>

															</div>
														</div>
														<div class="px-5 py-3">
															<h3 class="text-gray-700 text-xl uppercase">{prod.prod_name}</h3>
															<span class="text-gray-500 text-xl mt-2"> {convertToRupiah(prod.prod_price)}</span>
														</div>
													</Link>
												</div>
											
											</>
)
									)
								})

							}
						</div>
					</div>
					
				</div>
			</main>
		</div>


	);
}
