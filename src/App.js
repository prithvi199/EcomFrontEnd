

import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ListUserComponent from './components/ListUserComponent';
import HeaderComponent from './components/HeaderComponent';
//import FooterComponent from './components/FooterComponent';

// import ProductScreen from './screens/ProductScreen';
// import CreateProductComponent from './components/CreateProductComponent';
// import ProductComponent from './components/ProductComponent';
import Login from './LoginComponent/Login';
import Home from './HomeComponent/Home';
import AddProduct from './ProductComponent/AddProduct';
import AllProduct from './ProductComponent/AllProduct';
import UserRegister from './UserComponent/UserRegister';
import CartScreen from './ProductComponent/CartPage';
import EditProduct from './ProductComponent/EditProduct';
import OrderHistory from './ProductComponent/OrderHistory';
import UserDash from './LoginComponent/UserDash';
import UserOrderHistory from './ProductComponent/UserOrderHistory';
import Details from './ProductComponent/Deatils';
// import HomeScreen from './screens/HomeScreen';
// import CartScreen from './screens/CartScreen';

function App() {
  return (
    <div>
     <Router>
       <div className="container">
      <HeaderComponent />
      <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<Home />} />
      </Route>
     
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<UserRegister />} />
      <Route path='/add-product' element={<AddProduct />} />
      <Route path='/allproduct' element={<AllProduct />} />
      <Route path='/editproduct' element={<EditProduct/>}/>
      <Route path='/orderhistory' element={<OrderHistory/>}/>
      <Route path='/allproduct' element={<AllProduct/>}/>
      <Route path='/vieworderhistory' element={<UserOrderHistory/>}/>
      <Route path='/viewdetail' element={<Details/>}/>
      
      <Route path='/cart' element={<CartScreen />} />
     
     
     
    </Routes>
    {/* <FooterComponent /> */}
    </div>
    </Router>
    </div>

   
  );
}

export default App;

