import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { apiProductMaster, apiProductTransaction } from "../../config/apiUrl";
// Swiper
import Swiper from 'react-id-swiper';
import SwiperCore, { Navigation, Pagination } from 'swiper/core';
import './HeroSlider.css';
// img
import image1 from '../../components/img/carousel/sepatu1.jpg'
import image2 from '../../components/img/carousel/camera.jpg'
import image3 from '../../components/img/carousel/bag.jpg'




export default function Navbar({ fixed }) {
	const token = localStorage.getItem('token')

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
	// redirect to deskripsi
	const DetailProduct = (prod_id, product_images)=>{
		localStorage.setItem('productDetail', prod_id);
		localStorage.setItem('productImages', product_images);
		console.log(prod_id)
		console.log(product_images)

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
			url: `${apiProductMaster}/category/`,
			method: "get",
			headers: {
				"Content-type": "application/json"
			}
		}).then((res) => setCategory(res.data))
			.catch((err) => console.error(err))
	}, [])

	// slider config options
	const HeroSliderConfigs = {
		constainerClass: 'swiper-container hero-slider',
		parallax: true,
		conteredSlides: true,
		speed: 500,
		spaceBetween: 0,
		effect: 'slide'
	}
	
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
					<div class="h-64 rounded-md overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')` }}>
						<div class="bg-gray-900 bg-opacity-50 flex items-center h-full">
						</div>
					</div>
					<div class="md:flex mt-8 md:-mx-4">
						<div class="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')` }}>
							<div class="bg-gray-900 bg-opacity-50 flex items-center h-full">

							</div>
						</div>
						<div class="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')` }}>
							<div class="bg-gray-900 bg-opacity-50 flex items-center h-full">

							</div>
						</div>
					</div>
					<div class="mt-16">
						<h3 class="text-gray-600 text-2xl font-medium">All Product</h3>
						<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
							{
								Product.map((prod) => {
									return (
									prod.prod_stock < 1 ? null :  
										<>
											<div key={prod.prod_id} class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
										<Link onClick={()=> DetailProduct(prod.prod_id, prod.product_images[0].prim_id)}>
												<div class="flex items-end justify-end h-56 w-full bg-cover" >
													<img src={prod.product_images[0]?.prim_path}/>
												<div class="absolute flex items-center">
													<button class="p-2 rounded-full bg-primary text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500 items-center">
														<svg class="h-10 w-10" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
													</button>
													
												</div>
												</div>
												<div class="px-5 py-3">
													<h3 class="text-gray-700 text-xl uppercase">{prod.prod_name}</h3>
													<span class="text-gray-500 text-xl mt-2">Rp. {prod.prod_price}</span>
												</div>
											</Link>
											</div>
										</>

									)
								})

							}
						</div>
					</div>
					{/* <div class="mt-16">
						<h3 class="text-gray-600 text-2xl font-medium">Fashions</h3>
						<div class="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-6">
							<div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
								<div class="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1563170351-be82bc888aa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=376&q=80')` }}>
									<button class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
										<svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
									</button>
								</div>
								<div class="px-5 py-3">
									<h3 class="text-gray-700 uppercase">Chanel</h3>
									<span class="text-gray-500 mt-2">$12</span>
								</div>
							</div>
							<div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
								<div class="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1544441893-675973e31985?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80')` }}>
									<button class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
										<svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
									</button>
								</div>
								<div class="px-5 py-3">
									<h3 class="text-gray-700 uppercase">Man Mix</h3>
									<span class="text-gray-500 mt-2">$12</span>
								</div>
							</div>
							<div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
								<div class="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532667449560-72a95c8d381b?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')` }}>
									<button class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
										<svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
									</button>
								</div>
								<div class="px-5 py-3">
									<h3 class="text-gray-700 uppercase">Classic watch</h3>
									<span class="text-gray-500 mt-2">$12</span>
								</div>
							</div>
							<div class="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden">
								<div class="flex items-end justify-end h-56 w-full bg-cover" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1590664863685-a99ef05e9f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=345&q=80')` }}>
									<button class="p-2 rounded-full bg-blue-600 text-white mx-5 -mb-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
										<svg class="h-5 w-5" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
									</button>
								</div>
								<div class="px-5 py-3">
									<h3 class="text-gray-700 uppercase">woman mix</h3>
									<span class="text-gray-500 mt-2">$12</span>
								</div>
							</div>
						</div>
					</div> */}
				</div>
			</main>
		</div>


	);
}
