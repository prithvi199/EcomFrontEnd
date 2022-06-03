
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

function OrderHistory(props) {
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
    const data =  CartService.getAllCart()
      .then((response) => {
        setSearch(response.data)
        console.log(search)
        //alert(JSON.stringify(search))
      })


    .catch((error) => {
      alert(error.response.data)
    })

  }

  // const loadUser = async()=>{

  //   function parseJwt(token) {
  //     if (!token) { return; }
  //     const base64Url = token.split('.')[1];
  //     const base64 = base64Url.replace('-', '+').replace('_', '/');
  //     return JSON.parse(window.atob(base64));
  // }
    
  //   try{

  //     const data = await UserService.get(parseJwt(localStorage.getItem('Recruiter'), { decrypt: true}).iss)
  //       .then((response) => {
  //         console.log(response.data)
  //         setUser(response.data);
  //         //setProductId(response.data.email)
          
  //       })
  //       .catch((error) => {
  //         setShow(true);
  //         setErrorMsg(error.response.data);
  
  //       });
  //     } catch{
  //     navigate("/login");

  //   }
   

  // }

  useEffect(() => {
    //setProdId(location.state.prodId)

    
    //loadUser();
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

  const deletefromCartHandler = async () => {

    
    const data = await CartService.dispatch(orderId)
    .then((response) => {
      alert("item dispatched succesfully")
    })
    .catch((error) => {
      alert(error.response.data)
    })
    



  }

  const goToProductScreen = ()=>{
    navigate("/editproduct")
  }





  return (

    <>
        {/* {JSON.stringify(userEmail)}  */}
      

      <button type="button" className="primary block" onClick={goToProductScreen} >Back to Product Screen</button> 

      {/* //<button onClick={logout} className="primary block" >Logout</button> */}
      <div className="container">
        <h4 className="text-center text-success mt-5"><b>Tracking Payment </b></h4>

        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>PaymentID</th>


              <th>Paythrough</th>

              <th>Payment Status</th>
              <th>Agreed</th>
              <th>Shipment Status </th>
              

            </tr>
          </thead>
          <tbody>
            {
              search.map((item) =>



                <tr key={item.id}>
                  <td>{i++}</td>
                  <td>{item.paymentID}</td>
                  <td>{item.payThrough}</td>
                  <td>{item.paid}</td>
                  <td>{item.agree}</td>
                  <td>{item.shipmentStatus}</td>
                  <td> <button onClick={() => deletefromCartHandler()} className="primary block" >Dispatch</button></td>
                 

                 
                </tr>



              )
            }
          </tbody>




        </table>

       
      </div>

    </>
  )



}

export default OrderHistory




