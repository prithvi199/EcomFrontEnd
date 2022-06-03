import { useEffect, useState } from "react"
import { Link,useNavigate } from 'react-router-dom'
import { useCookies } from "react-cookie";
import ProductService from "../Services/ProductService";
import LoginService from "../Services/LoginService";



function EditProduct(){
    document.title = "Admin";
    const [cookie, setCookie, removeCookie] = useCookies();
    const [search, setSearch] = useState([]);
    const [admin, setAdmin] = useState(null)
    const [adminEmail, setAdminEmail] = useState()
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState();


    var i = 1;

    const loadRecords = async () =>{
        const data = await ProductService.getAll()
        .then((response) => {
          setSearch(response.data)
        })
        .catch((error) => {
          alert(error.response.data)
        })
    
      } 

      const loadAdmin = async () => {

        const data = await LoginService.getAdmin()
          .then((response) => {
            console.log(response.data)
            setAdmin(response.data);
            setAdminEmail(response.data.email)
            
          })
          .catch((error) => {
            setShow(true);
            setErrorMsg(error.response.data);
    
            navigate("/login");
          });
        return () => { };
    
      }
    

      useEffect( () => {

        loadRecords();
        loadAdmin();
   
       // const data2 = ProductService.getAll()
       //   .then((response) => {
       //     setProduct(response.data)
   
       //   })
       //   .catch((error) => {
       //     console.log(error.response.data)
       //   })
   
   
   
   
     }, []);

     const logout = () => {
      const logoutDTO = {
        "email":adminEmail,
        "type": "Admin"
      }
      LoginService.logout(logoutDTO)
        .then((response) => {
          removeCookie(logoutDTO.type)
          localStorage.removeItem("token");
          navigate('/')
        })
        .catch((error) => {
          alert(error.response.data)
        })
  
    };

     



     const deletefromCartHandler = async(id) => {

        // console.log(JSON.stringify(id))
       
        const data = await ProductService.delete(id)
        .then((response) => {
         alert("item delted successfully")
        })
        .catch((error) => {
          alert(error.response.data)
        })
    
       
       
      }

      const goToProductScreen = ()=>{
        navigate("/orderhistory")
      }

     return(
      
        <>
        

          <button type="button" className="primary block" onClick={goToProductScreen} >Go to Tacking Payment</button> 
          
          <button onClick={logout} className="primary block" >Logout</button>
          

         <table class="table table-striped table-bordered">
         <thead>
           <tr>
             <th>Sr.No</th>
             <th>Product Name</th>
             <th>Image</th>
             <th>Price</th>
             <th>Quantity</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           {
             search.map((item)=>
              <tr key = {item.id}>
                 <td>{i++}</td>
                 <td><h6>{item.name}</h6></td>
                 <td><img src={`data:image/jpg;base64,${item.image}`} className="img-thumbnail imageButton" alt="Responsive image" /></td>
                 <td>₹{item.price}</td>
                 <td>{item.quantity}</td>
                 <td> <button onClick={() => deletefromCartHandler(item.prodId)}  className="primary block" >Delete</button></td>

              </tr>
             )
           }
         </tbody>
       </table>
     
 


        
        
        
        
        </>



     )



}

export default EditProduct