import Header from './components/header';
import Footer from './components/footer/index'; 
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/home/index'
import Shop from './pages/home/Dashboard'
// import CategoryProd from './pages/home/productCate'
import PageNotFound from './pages/PageNotFound'
import Category from './pages/category/category'
import Condition from './pages/condition/condition'
import Cart from './pages/cart'
import Orders from './pages/orders/Orders'
import Daftar from './pages/users/Daftar'
import Login from './pages/users/Login'
import Dashboard from './pages/home/Dashboard'
import CheckoutOrders from './pages/orders/CheckoutOrders'
import CheckoutMyCart from './pages/orders/CheckoutMyCart'
import CheckoutMyOrder from './pages/orders/CheckoutMyOrder'
import CartOrders from './pages/orders/CartOrders'
import AfterOrders from './pages/orders/AfterOrders'
import MyOrders from './pages/orders/MyOrders'
import Province from './pages/province/province'
import City from './pages/city/city'
import Users from './pages/users/users'
import Kecamatan from './pages/kecamatan/kecamatan'
import Kodepos from './pages/kodepos/kodepos'
import RegisterAccount from './pages/users/RegisterAccount'
import DashboardUserAccount from './pages/home/DashboardUserAccount'
import Address from './pages/address/address'
import EditAddress from './pages/address/EditAddress'
import Wallet from './pages/payment/MyWallet'
import Advertising from './pages/advertising'
import TambahProduct from './pages/product/tambahProduct';
import Product from './pages/product/product';
import ProductSaya from './pages/product/productSaya';
import EditProduct from './pages/product/editProduct'
import billTopup from './pages/billTopup'
import vendor from './pages/vendor'
import ExpeditionRoutesIndex from './pages/Expeditions/ExpeditionRoutesIndex'
import ExpeditionIndex from './pages/Expeditions/ExpeditionIndex'
import OrderShippingIndex from './pages/OrderShipping/OrderShippingIndex'
import OrderShippingArrivalIndex from './pages/OrderShipping/OrderShippingArrivalIndex'
import MyAdv from './pages/advertising/myAdv'
import AddAdv from './pages/advertising/addAdv'
import BankAccount from './pages/payment/BankAccount'
import Transaction from './pages/payment/Transactions'
import OrdersKw from './pages/payment/Orders'
// import productMaster from './components/sideBarMenu/productMaster';
import WalletAndBank from './pages/payment/WalletAndBank'
import Brand from './pages/brand/brand';
import AddBrand from './pages/brand/addBrand';
import {EditBrand} from './pages/brand/editBrand';
import addCond from './pages/condition/addCond';
import {EditCond} from './pages/condition/editCond';
import addCate from './pages/category/addCate';
import CateUpload from './pages/category/cateUpload';
import { EditCate } from './pages/category/editCate';
import OrderAdvertising from './pages/advertising/orderAdvertising';
import OrderAdvertisingProduct from './pages/advertising/orderAdvertisingProduct';
import OrdersPayment from './pages/payment/OrdersPayment'
import SummaryPulsa from './pages/billTopup/summaryPulsa';
import SummaryInternet from './pages/billTopup/summaryInternet'
import SummaryGame from './pages/billTopup/summaryGame';
import SummaryPLN from './pages/billTopup/summaryPLN';
import SummaryPDAM from './pages/billTopup/summaryPDAM';
import OrderBK from './pages/admin/orderBK';
import UpdateStatus from './pages/product/updateStatus';
import AllProduct from './pages/admin/allProduct';
// import sidebar from './components/sideBarMenu/productMaster';
import Sidebar from './pages/admin/sidebarAdmin'
import ProductSidebar from './components/sideBarMenu/product';
import BrandSidebar from './components/sideBarMenu/brand';
import CategorySidebar from './components/sideBarMenu/category';
import ConditionSidebar from './components/sideBarMenu/condition';
import ArchieveSidebar from './components/sideBarMenu/productArchieve';
import CompletedSidebar from './components/sideBarMenu/productCompleted';
import BlokirSidebar from './components/sideBarMenu/productBlokir';
import { useDispatch } from 'react-redux';
import { fetchAdv } from './features/adv/advSlices';
import { useEffect } from 'react';

import OrderSK from './pages/admin/orderSK';

import FilesUpload from "./components/FilesUpload";
// import EditAddress from './pages/address/EditAddress';
import ReCaptchaSignup from './pages/users/reCaptcha';
// import MyOrders from './pages/orders/MyOrders';
import DashboardOrder from './pages/users/DashboardOrder';
import Penjualanku from './pages/users/Pembelianku';
import Pembelianku from './pages/users/Pembelianku';
import IndexAdmin from './pages/admin/indexAdmin'
import TotalOrderBK from './pages/admin/totalOrderBK';
import TotalProdBK from './pages/admin/totalProdBK';
import TotalProdSK from './pages/admin/totalProdSK';




function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAdv())
  }, [])
  return (
    <BrowserRouter>
      <>
      <Header />
      <div className="container mx-auto ">
        <Switch>
          <Route path="/home" component={Home} exact />
          <Route path="/shop" component={Dashboard} exact />
          <Route path="/" component={Home} exact/>
          {/* brand */}
          <Route path="/product" component={ProductSidebar} exact />
          <Route path="/brand" component={BrandSidebar} exact />
          <Route path="/category" component={CategorySidebar} exact />
          <Route path="/condition" component={ConditionSidebar} exact />
          <Route path="/addBrand" component={AddBrand} exact />
          <Route path="/editBrand" component={EditBrand} exact />
          {/* end Brand */}
          {/* start Condition */}
          {/* <Route path="/condition" component={Condition} exact /> */}
          <Route path="/addCond" component={addCond} exact />
          <Route path="/editCond" component={EditCond} exact />
          {/* end Condition */}

          {/* start category */}
          {/* <Route path="/category" component={Category} exact /> */}
          <Route path="/addCate" component={addCate} exact />
          <Route path="/upload" component={CateUpload} exact />
          <Route path="/editcate" component={EditCate} exact />
          {/* end Category */}
          <Route path="/cart" component={Cart} />
          <Route path="/cart-orders" component={CartOrders} />
          {/* <Route path="/orders/ordered-product" component={OrderedProduct}/> */}
          <Route path="/orders" component={Orders}/>
          <Route path="/login" component={Login} />
          <Route path="/daftar" component={Daftar} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/checkout-orders" component={CheckoutOrders} />
          <Route path="/checkout-mycart" component={CheckoutMyCart} />
          <Route path="/checkout-myorders" component={CheckoutMyOrder} />
          <Route path="/after-orders" component={AfterOrders}/> 
          <Route path="/my-orders" component={MyOrders}/>
          <Route path="/province" component={Province} exact />
          <Route path="/city" component={City} exact />
          <Route path="/users" component={Users} exact />
          <Route path="/kecamatan" component={Kecamatan} exact />
          <Route path="/kodepos" component={Kodepos} exact />
          <Route path="/registerAccount" component={RegisterAccount} exact />
          <Route path="/dashboarduser" component={DashboardUserAccount} exact />
          <Route path="/address" component={Address} exact />
          <Route path="/myorders" component={MyOrders}/>
          <Route path="/advertising/my-pkg" component={Advertising}/>
          <Route path="/product/:prod_id" component={Product} />

          {/* <Route path="/product" component={ProductSaya}/> */}
          <Route path="/Archieve" component={ArchieveSidebar}/>
          <Route path="/Completed" component={CompletedSidebar}/>
          <Route path="/Blokir" component={BlokirSidebar}/>

          <Route path="/tambahproduct" component={TambahProduct} />
          <Route path="/editproduct" component={EditProduct}/>
          <Route path="/billTopup" component={billTopup}/>
          <Route path="/vendor" component={vendor}/>
          <Route path="/expeditionsroutes" component={ExpeditionRoutesIndex}/>
          <Route path="/expeditions" component={ExpeditionIndex}/>
          <Route path="/ordershipping" component={OrderShippingIndex}/>
          <Route path="/ordershippingarrival" component={OrderShippingArrivalIndex}/>
          <Route path="/advertising/my-adv" component={MyAdv}/>
          <Route path="/advertising/add-adv" component={AddAdv}/>
          <Route path="/advertising/orad" component={OrderAdvertising}/>
          <Route path="/advertising/orap" component={OrderAdvertisingProduct}/>
          <Route path="/wallet" component={Wallet}/>
          <Route path="/bank-account/" component={BankAccount}/>
          <Route path="/transactions/:acco_id" component={Transaction}/>
          <Route path="/order-kw" component={OrdersKw}/>
          <Route path="/wallet-bank" component={WalletAndBank}/>
          <Route path="/updatestatus" component={UpdateStatus}/>
          <Route path="/order/checkout" component={OrdersPayment}/>
          <Route path="/admin" component={IndexAdmin} exact/>
          <Route path="/admin/order-bk" component={OrderBK} exact/>
          <Route path="/admin/order-sk" component={OrderSK} exact/>
          <Route path="/admin/total-order-bk" component={TotalOrderBK} exact />
          <Route path="/admin/total-prod-bk" component={TotalProdBK} exact />
          <Route path="/admin/total-prod-sk" component={TotalProdSK} exact />
          <Route path="/admin/allproduct" component={AllProduct} exact/>

          <Route component={PageNotFound}/>
          <Route path="/summaryPulsa" component={SummaryPulsa}/>
          <Route path="/summaryInternet" component={SummaryInternet}/>
          <Route path="/summaryGame" component={SummaryGame}/>
          <Route path="/summaryPLN" component={SummaryPLN}/>
          <Route path="/summaryPDAM" component={SummaryPDAM}/>
          <Route path="/upload" component={FilesUpload}/>
          <Route path="/editAddress" component={EditAddress}/>


          <Route path="/order-kw" component={OrdersKw}/>
          <Route path="/wallet-bank" component={WalletAndBank}/>

          <Route path="/daftar-captcha" component={ReCaptchaSignup}/>
          <Route path="/penjualanku" component={Penjualanku}/>

          <Route path="/pembelianku" component={Pembelianku}/>
          <Route path="/dashboard-order" component={DashboardOrder}/>



          <Route component={PageNotFound}/>
        </Switch>
      </div>
      <Footer></Footer>
      </>
    </BrowserRouter>
  );
}

export default App;