
//import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import ProductService from "../Services/ProductService";
import CartService from "../Services/CartService";
import ShipmentService from '../Services/ShipmentService';
import UserCartService from '../Services/UserCartService';
import LoginService from '../Services/LoginService';
import { useCookies } from "react-cookie";
import { Link, useNavigate, useLocation } from "react-router-dom";
import OrderHistoryService from "../Services/OrderHistoryService";
import UserService from "../Services/UserService";

function UserOrderHistory(props) {
  const location = useLocation();
  const [prodId, setProdId] = useState();
  const [search, setSearch] = useState([]);
  const [userName, setuserName] = useState();
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


  const loadRecords = () => {
    const data =  CartService.getHistory(orderId)
      .then((response) => {

        if(response.data.products.length === 0){
          alert("No order history present");
        }
        setSearch(response.data)
       
        //alert(JSON.stringify(search))
      })


      .catch((error) => {
        alert(error.response.data)
      })

  }

  const loadUser = async() => {

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


  }

  useEffect(() => {
    


    loadUser();
   loadRecords();













  }, []);

  // const deletefromCartHandler = (id)=>{

  //   console.log(JSON.stringify(id))



  // }









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




  console.log(search)

  const goToProductScreen = ()=>{
    navigate("/allproduct")
  }



  return (

    <>
      
      

      <button type="button" className="primary block" onClick={goToProductScreen} >Go to Select Screen</button> 

      {/* //<button onClick={logout} className="primary block" >Logout</button> */}
      <div className="container">
        <h4 className="text-center text-success mt-5"><b>Your Order History</b></h4>
    
        <table class="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Custmer Name</th>


             
              <th>Item Purchased</th>
              <th>Items Quantity </th>
              <th>Delivery Status</th>

            </tr>
          </thead>
          <tbody>
            {
              search.map((item) =>



                <tr key={item._id}>
                  <td>{i++}</td>
                  <td>{userName}</td>

                  <td>
                     <tbody>
                         {
                             item.products.map((data)=>
                             
                             <tr>
                               
                                 <td>{data.productName}</td>
                                
                                
                             </tr>

                             )
                         }
                     </tbody>

                 </td>

                 <td>
                     <tbody>
                         {
                             item.products.map((data)=>
                             
                             <tr>
                               
                                 <td>{data.productQty}</td>
                                
                                
                             </tr>

                             )
                         }
                     </tbody>

                 </td>
                 <td>{item.deliveryStatus}</td>

                 

                </tr>



              )
            }
          </tbody>




        </table>
      </div>
      

      

    </>
  )



}

export default UserOrderHistory




