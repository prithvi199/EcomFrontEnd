
//import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import ProductService from "../Services/ProductService";
import CartService from "../Services/CartService";
import ShipmentService from '../Services/ShipmentService';
import UserCartService from '../Services/UserCartService';
import LoginService from '../Services/LoginService';
import { useCookies } from "react-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserService from "../Services/UserService";

function CartScreen(props) {
  const location = useLocation();
  const [prodId, setProdId] = useState()
  const [search, setSearch] = useState([]);
  const [userEmail,setuserEmail] = useState();
  const [cookie, setCookie, removeCookie] = useCookies();
  const [item, setItem] = useState([]);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [failure, setFailure] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pay, setPay] = useState(true)

  var totalcartprice = 0;

  var i = 1;

  var orderId = "628ee738173c9e4a1494280a";
  //var userEmail = "roshan@gmail.com"

  // const getlocalItem =()=>{
  //   let list = localStorage.getItem('user');
  //   console.log(list);

  // }
   
  
  const loadRecords =  () => {
    const data =  CartService.getAll(orderId)
      .then((response) => {
        setSearch(response.data)
        console.log(search)
        //alert(JSON.stringify(search))
      })


    .catch((error) => {
      alert(error.response.data)
    })

  }

//   const loadUser = async()=>{


// function parseJwt(token) {
//       if (!token) { return; }
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace('-', '+').replace('_', '/');
//       return JSON.parse(window.atob(base64));
//   }
    
//     try{

//       const data = await UserService.get(parseJwt(localStorage.getItem('Recruiter'), { decrypt: true}).iss)
//         .then((response) => {
//           console.log(response.data)
//           setUser(response.data);
//           //setProductId(response.data.email)
          
//         })
//         .catch((error) => {
//           setShow(true);
//           setErrorMsg(error.response.data);
  
//         });
//       } catch{
//       navigate("/login");

//     }

//   }

  useEffect(() => {
    setProdId(location.state.prodId)

    
    loadUser();
    loadRecords();
    


    
      
    
    






  }, []);

  // const deletefromCartHandler = (id)=>{

  //   console.log(JSON.stringify(id))



  // }

  





  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = src
      script.onload = () => {
        resolve(true)
      }
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script)
    })
  }

  // const logout = () => {
  //   const logoutDTO = {
  //     email: userEmail,
  //     type: "User",
  //   };

  //   // alert(JSON.stringify(logoutDTO))
  //   LoginService.logout(logoutDTO).then((response) => {
  //     removeCookie(logoutDTO.type);
  //     localStorage.removeItem("token");
  //     navigate("/");
  //   });
  // };

  const handleSubmitPayment = async (price) => {

    // console.log(JSON.stringify(price))

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    let status = "Online Payment"
    if (!res) {
      alert("Please be in online")
      return
    }

    const options = {
      key: "rzp_test_FNq631LgAU39Br",
      key_secret: "ueqUYfrpsIpISogGCEVtVghC",
      currency: "INR",
      amount: price * 100,
      name: "Ecommerce Website for Electronics",
      description: "Thank you",

      handler: function (response) {
        if (response.razorpay_payment_id !== null) {
          setLoading(true)
          const data = ShipmentService.agree(orderId, status, response.razorpay_payment_id)
            .then(response => {
              setPay(false)
            })
            .catch(error => {
              alert(error.response.data)
            })
          setPay(true)
          setLoading(false)
        }
        else {
          alert("Payment failed")
        }

      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()


  }

  const deletefromCartHandler = async (prodid) => {

    // search.splice(search.indexOf(id),1)


    // console.log(JSON.stringify(id))
    const productId = prodid;

    // alert(JSON.stringify(productId))

    const data = await CartService.deleteById(orderId, productId)
      .then((response) => {
        alert(response.data)
      })
      .catch((error) => {
        alert(error.response.data)
      })



  }

  const goToProductScreen = ()=>{
    navigate("/allproduct")
  }







  return (

    <>
         {/* {JSON.stringify(prodId)}  */}
     
      <button type="button" className="primary block" onClick={goToProductScreen} >Go to Select Screen</button> 

      {/* //<button onClick={logout} className="primary block" >Logout</button> */}
      <div className="container">
        <h4 className="text-center text-success mt-5"><b>Welcome To Cart Screen</b></h4>

        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Product Name</th>


              <th>Quantity</th>

              <th>Product Total Price</th>
              <th>Grand Total </th>
              {/* <th>Actions</th> */}

            </tr>
          </thead>
          <tbody>
            {
              search.map((item) =>



                <tr key={item._id}>
                  <td>{i++}</td>
                  <td>{item.productName}</td>
                  <td>{item.productQty}</td>
                  <td>₹{item.productPrice}</td>
                  <td>₹{totalcartprice += item.productPrice}</td>

                  {/* <td> <button onClick={() => deletefromCartHandler(item.id)} className="primary block" >Delete</button></td> */}
                  {/* <td> <button onClick={clearCart}  className="primary block" >Clear cart</button></td> */}

                </tr>



              )
            }
          </tbody>




        </table>

        <div className="col-md-8"></div>
        <div className="col-md-4">
          <div className="card card-body mt-3">
            <h4>Grand Total:
              <span className="float-end">₹{totalcartprice}</span>

            </h4>
            <hr />
            <button type="button" className="btn btn-success" onClick={() => handleSubmitPayment(totalcartprice)} disabled={search.length === 0}>Proceed to Pay</button>

          </div>
        </div>
      </div>

    </>
  )



}

export default CartScreen




