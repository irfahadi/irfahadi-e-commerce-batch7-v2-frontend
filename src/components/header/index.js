
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
export default function Navbar({ fixed }) {
  const history = useHistory()
  const [isLogin, setisLogin] = useState(false)
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [masuk, setMasuk] = useState(false);
  const [sideBar, setSideBar ] = useState(false);
  const token = localStorage.token
  const [tvalue, setTValue] = useState();
  const [isOpen, setIsOpen] = useState();
  const refresh = () => {
    // re-renders the component
    setTValue({});
  }
  useEffect(() => {
    // console.log(isLogin)
    if (token == null || token == undefined) {
      setisLogin(false);
      // setTValue({});
    }
    else {
      setisLogin(true);
      // setTValue({});
    }
    // setTValue({});
  }, [])
  const klikLogout = () => {
    localStorage.clear()
    alert("Anda Berhasil Logout!");
    setisLogin(false)
    // setTValue({});
    history.push("/login")
  }
  const onClickLogin = () => {
    history.push("/login")
  }
  const onClickRegister = () => {
    history.push("/daftar")
  }
  const fotoprofil = localStorage.getItem('profilImage')
  return (
    <div class=" mx-auto px-6 py-3 mb-5 bg-primary text-white">
      <div class="container flex items-center justify-between">
        <div class="hidden w-full text-white md:flex md:items-center">
          {/* <svg class="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z" fill="currentColor" /><path fill-rule="evenodd" clip-rule="evenodd" d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z" fill="currentColor" />
          </svg>
          <span class="mx-1 text-sm">NY</span> */}
        </div>
        <a href="/" class="w-full md:text-center text-2xl font-semibold">
          E-Commerce
            </a>
        <div class="flex items-center justify-end w-full lg:gap-2">
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger">
          </div>
          {isLogin ? (
            <>
            {/* cart start */}
               < button class=" focus:outline-none mx-2 sm:mx-0">
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </button>

              <svg xmlns="htts://www.w3.org/2000/svg" class="h-6 w-6 fa-rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
              {/* cart end */}
              <ul className="flex flex-wrap lg:flex-row list-none lg:ml-auto align-center justify-center items-center flex-between">

                <img src={fotoprofil === "null" || fotoprofil === null ? "defaultpic.png" : fotoprofil} alt="..." className="shadow rounded-full w-8 h-8 align-middle border-none border-white mr-4" />
                <li className="nav-item">
                  <div className="dropdown inline-block relative">
                    <button className="text-center ">
                      <span className="mr-1 font-semibold capitalize">{localStorage.getItem('dataUserName')}
                      </span>
                    </button>
                    <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
                      <li className=" bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={() => history.push('/dashboarduser')} style={{ cursor: 'pointer' }}>
                        {/* <a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="/dashboarduser"> */}
                      Profil
                      {/* </a> */}
                      </li>
                      <li className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={() => history.push('/dashboard')} style={{ cursor: 'pointer' }}>
                        {/* <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="/dashboard"> */}
                      Dashboard
                      {/* </a> */}
                      </li>
                      <li className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={() => history.push('/checkout-mycart')} style={{ cursor: 'pointer' }}>
                        {/* <a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="/dashboard"> */}
                      My Orders
                      {/* </a> */}
                      </li>
                      <li className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={klikLogout} style={{ cursor: 'pointer' }}>
                        {/* <a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#" onClick={klikLogout}> */}
                      Sign Out
                      {/* </a> */}
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
              {/* <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                <li className="nav-item">
                  <a className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug  hover:opacity-75"
                    href="">
                    <i className="fab fa-twitter text-lg leading-lg  opacity-75"></i>
                    <span className="ml-2" onClick={klikLogout}>{localStorage.getItem('dataUserEmail')}</span>
                  </a>
                </li>
              </ul> */}
            </>
          ) : (
            <>
              < button class=" focus:outline-none mx-2 sm:mx-0">
                <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </button>
              {/* cart end */}
              <svg xmlns="htts://www.w3.org/2000/svg" class="h-6 w-6 fa-rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
              {/* profil start */}
              <div class="flex justify-between text-white">
                <button class="focus:outline-none mx-2 sm:mx-0 flex items-center gap-2 hover:text-black hover:bg-pink-100 rounded" onClick={onClickRegister}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span class="flex items-center text-sm">Sign Up</span>
                </button>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fa-rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
                <button class="focus:outline-none mx-2 sm:mx-0 flex items-center gap-2 hover:text-black hover:bg-pink-100 rounded " onClick={onClickLogin}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span class="flex items-center text-sm mr-2">Sign In</span>
                </button>
              </div>
            </>
          )
          }
          {/* profil end */}
          <div class="flex sm:hidden" >
            <button type="button" onClick={() => setIsOpen(!isOpen)} class="text-white hover:text-white focus:outline-none focus:text-white" aria-label="toggle menu">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path className={!isOpen ? 'block' : 'hidden'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                <path className={isOpen ? 'block' : 'hidden'} stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* navbar */}
      <nav className={`${isOpen ? 'block' : 'hidden'} sm:flex sm:justify-center sm:items-center mt-4  nav-toggler`} id="#navigation">
        <div class="flex flex-col sm:flex-row text-white sm:flex-wrap sm:justify-center">
          <a class=" lg:inline-flex text-lg sm:mx-2 sm:mt-0 px-3 py-2 rounded hover:text-black hover:bg-pink-100" href="/">Home</a>
          <a class=" lg:inline-flex text-lg sm:mx-2 sm:mt-0 px-3 py-2 rounded hover:text-black hover:bg-pink-100" href="/cart">Cart</a>
          <a class=" lg:inline-flex text-lg sm:mx-2 sm:mt-0 px-3 py-2 rounded hover:text-black hover:bg-pink-100" href="/productsaya">Product</a>
          {/* <a class=" lg:inline-flex text-lg sm:mx-2 sm:mt-0 px-3 py-2 rounded hover:text-black hover:bg-pink-100" href="/checkout-mycart">Orders</a>s */}
          <a class=" lg:inline-flex text-lg sm:mx-2 sm:mt-0 px-3 py-2 rounded hover:text-black hover:bg-pink-100" href="/wallet">Wallet</a>
          <a class=" lg:inline-flex text-lg sm:mx-2 sm:mt-0 px-3 py-2 rounded hover:text-black hover:bg-pink-100" href="/ordershipping">Shipping</a>
          <a class=" lg:inline-flex text-lg sm:mx-2 sm:mt-0 px-3 py-2 rounded hover:text-black hover:bg-pink-100" href="/billTopup">BillTopup</a>
          <a class=" lg:inline-flex text-lg sm:mx-2 sm:mt-0 px-3 py-2 rounded hover:text-black hover:bg-pink-100" href="/advertising/my-adv">Advertising</a>
          {/* <a class=" lg:inline-flex text-lg sm:mx-2 sm:mt-0 px-3 py-2 rounded hover:text-black hover:bg-pink-100" href="#">About</a> */}
        </div>
      </nav>
      {/* search */}
      {/* <div class="relative mt-6 max-w-lg mx-auto">
        <span class="absolute inset-y-0 left-0 pl-3 flex items-center">
          <svg class="h-6 w-6 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </span>
        <input class="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline" type="text" placeholder="Search" />
      </div> */}
    </div >
  );
}