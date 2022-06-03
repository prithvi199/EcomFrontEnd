import { useEffect, useState } from "react"


import ProductService from "../Services/ProductService";
import LoginService from '../Services/LoginService';
import CartService from "../Services/CartService";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
//import Details from "../HomeComponent/Details";
import UserService from "../Services/UserService";
import { Link, useNavigate, useLocation } from "react-router-dom";
//import CartService from "../Services/CartService";
import { useCookies } from "react-cookie";
import axios from "axios";
import OrderHistory from "./OrderHistory";
//import UserService from "../Services/UserService";



function AllProduct(props) {



  document.title = "User";
  const [cookie, setCookie, removeCookie] = useCookies();
  const [user, setUser] = useState([]);
  //const [productId, setProdId] = useState();
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const navigate = useNavigate();
  const [search, setSearch] = useState([]);
  const [name, setRecord] = useState();
  const [loading, setLoading] = useState(false);
  const [changeEffect, setChangeEffect] = useState(true)
  const [tempProduct, setCart] = useState([])
  const [tempProdCart, setProductCart] = useState([])
  //const[productId,setProductId]= useState();

  const [product, setProduct] = useState([{
    "prodId": "",
    "name": "",
    "quantity": 0,
    "price": 0.0
  }])



  var i = 1;

   var productId = "628ee738173c9e4a1494280a";

  // var productId = user.email;




  const loadRecords = async () => {




    const data = await ProductService.getAll()
      .then((response) => {
        setProduct(response.data)

      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  const loadUser = async () => {
    function parseJwt(token) {
      if (!token) { return; }
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
  }
    
    try{

      const data = await UserService.get(parseJwt(localStorage.getItem('Recruiter'), { decrypt: true}).iss)
        .then((response) => {
          console.log(response.data)
          setUser(response.data);
          //setProductId(response.data.email)
          
        })
        .catch((error) => {
          setShow(true);
          setErrorMsg(error.response.data);
  
        });
      } catch{
      navigate("/login");

    }
    return () => { };

  }

  const loadCart = ()=>{
    const data =  CartService.getAllCart()
    .then((response) => {
      //setProductId(response.data.)
      

    })
    .catch((error) => {
      console.log(error.response.data)
    })

  }




  useEffect(() => {






    // return () => {};

    loadCart();
    loadRecords();
    loadUser();








  }, []);





  

  const [dropdown_Prod, setDropdown_Prod] = useState({
    "prodId": "",
    "name": "",
    "quantity": "",
    "price": ""
  })
  const [addProd_error, setAddProd_error] = useState(false)
  const [addProd_errorMsg, setAddProd_errorMsg] = useState("")
  const handleSelect = (e) => {
    //event.preventDefault()
    //console.log(JSON.stringify(e));
    console.log(product.find(it => it.prodId === e).name);
    setDropdown_Prod({
      "prodId": e,
      "name": product.find(it => it.prodId === e).name,
      "quantity": product.find(it => it.prodId === e).quantity,
      "price": product.find(it => it.prodId === e).price

    })
    setChangeEffect(true)
  }
  const addProd = (id, req) => {
    // e.preventDefault()
    if (dropdown_Prod.quantity === 0 || (req > 0 && req > dropdown_Prod.quantity)) {
      setAddProd_errorMsg("Please enter valid quantity. Available Quantity:" + dropdown_Prod.quantity)
      setAddProd_error(true)
    }
    else {

      if (tempProduct.filter(it => it.objectid === id).length > 0) {
        setAddProd_errorMsg("Product already added. Please remove to add again")
        setAddProd_error(true)
      }
      else {

        tempProduct.push({
          "objectid": id,
          "reqQty": req
        })


        if (changeEffect === true) {
          setChangeEffect(false)
        }
        else {
          setChangeEffect(true)
        }
      }

    }


  }

  const addtoCartHandler = async () => {


    //  tempProduct.push({
    //   "objectid": id,
    //   "reqQty": quantity
    // })



    const tempProdCart = { productId, tempProduct }

    //alert(JSON.stringify(tempProdCart))

    const d = await CartService.addCart(tempProdCart)
      .then((response) => {
        setChangeEffect(false)
        alert("item added successfully")
      })
      .catch((error) => {
        alert(error.response.data)
      })
    setLoading(false)
    setChangeEffect(true)
  }

  const logout = () => {
    const logoutDTO = {
      email: user.email,
      type: "User",
    };


    
    //alert(JSON.stringify(logoutDTO))
    LoginService.logout(logoutDTO).then((response) => {
      // removeCookie(logoutDTO.type);
      localStorage.removeItem("token");
      
      navigate("/");
    });
  };

  const OrderHistory = () => {
    navigate("/vieworderhistory",{
      state: {prodId: productId}
    })
  }




  const goToCart = () => {
    navigate("/cart", {
      state: { prodId: productId }
    })
  }

  const goToDetail = ()=>{
    navigate("/viewdetail")
  }


  const deletefromCartHandler =  () => {

    // search.splice(search.indexOf(id),1)


    // console.log(JSON.stringify(id))
   

    // alert(JSON.stringify(productId))

    

      const data =  CartService.changeCart(productId)
      .then((response) => {
        setChangeEffect(false)
        alert("Status are updated")
      })
      .catch((error) => {
        alert(error.response.data)
      })



  }


  // const goToAvailJobs = () => {
  //   navigate("/ApplicantDash/AvailJobs", {
  //     state: { applicantEmail: applicantV.applicantEmail },
  //   });
  // };



  return (
    <>

    
      <button type="button" className="primary block" onClick={goToCart} >Go To Cart</button>

       <button type="button" className="primary block" onClick={goToDetail} >Go To Details</button> 
      
      <button onClick={logout} className="primary block" >Logout</button>
      <button onClick={deletefromCartHandler} className="primary block" >Clear Everything</button>

      <button onClick={OrderHistory} className="primary block" >Order History</button>

      <div className="navbar-nav mx-auto">
        <h5 className="nav-item">
          {" "}
          Welcome :&nbsp; {user.name}{" "}
        </h5>
      </div>


      <div className="container">
        <h4 className="text-center text-success mt-5"><b>Select Product By Name</b></h4>


        <div id="no-more-tables">
          <table className="table">
            <thead>
              <tr>
                <th>Select</th>
                <th>Product Name</th>
                <th>Available Quantity</th>
                <th>PricePer Quantity</th>
                <th>Required Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-title="Select">
                  <DropdownButton
                    alignRight
                    title="Select Product"
                    id="dropdown-menu-align-right"
                    onSelect={handleSelect}
                  >
                    {product.map((prod, index) => {
                      return (
                        <Dropdown.Item title={prod.name} eventKey={prod.prodId}>{prod.name}</Dropdown.Item>
                      )
                    })}
                  </DropdownButton>
                </td>

                <td data-title="Prod Name">{dropdown_Prod.name}</td>
                {dropdown_Prod.quantity === 0 ? <td data-title="Available Qty">Out of Stock</td> : <td data-title="Available Qty">{dropdown_Prod.quantity}</td>}
                <td data-title="Price/qty">{dropdown_Prod.price}</td>
                {Object.keys(dropdown_Prod.name).length === 0 ? <></> : <>
                  <td data-title="Required Qty">
                    <input type="number" placeholder="Req Qty" name="req" id="reqQty" style={{ width: "100px" }} required />

                  </td>
                  <td>
                    <button type="button" className="btn btn-primary" onClick={
                      () => {
                        if (Object.is(document.getElementById("reqQty").value, "0") || document.getElementById("reqQty").value === "") {
                          setAddProd_error(true)
                          setAddProd_errorMsg("Product required quantity is mandatory")
                        }
                        else {
                          setAddProd_error(false)
                          addProd(dropdown_Prod.prodId, document.getElementById("reqQty").value)
                        }

                      }
                    }>Check Availabilty</button>

                  </td>
                  <td>
                    {addProd_error && <p className='text-danger'>{addProd_errorMsg}</p>}
                  </td>
                </>
                }
                <td> <button onClick={() => addtoCartHandler()} className="primary block" >Add to Cart</button></td>

                

              </tr>


            </tbody>
          </table>

        </div>
      </div>



    </> // this is the error bro i am having</>

  )

}

export default AllProduct