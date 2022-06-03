import { useEffect, useState } from "react"
import { Navigate } from "react-router-dom";
import ProductService from "../Services/ProductService";
import { Link, useNavigate, useLocation } from "react-router-dom";

function Details(){

    const [search, setSearch] = useState([]);
    const navigate = useNavigate();


    var i =1;
    


       const loadRecords= async()=>{

        const data = await ProductService.getAll()
          .then((response) => {
            setSearch(response.data)
    
          })
          .catch((error) => {
            console.log(error.response.data)
          })
      }

      useEffect(() => {
        //setProdId(location.state.prodId)
    
        
        
        loadRecords();
    
        
          
        
        
    
    
    
    
    
    
      }, []);

      const goToProductScreen=()=>{
          navigate("/allproduct")
      }



      return(

        <>

<button type="button" className="primary block" onClick={goToProductScreen} >Go to Select Screen</button> 

<table class="table table-striped table-bordered">
         <thead>
           <tr>
            
             <th>Product Name</th>
             <th>Image</th>
             <th>Price</th>
            
             <th>Description</th>
           </tr>
         </thead>
         <tbody>
           {
             search.map((item)=>
              <tr key = {item.id}>
               
                 <td><h6>{item.name}</h6></td>
                 <td><img src={`data:image/jpg;base64,${item.image}`} className="img-thumbnail imageButton" alt="Responsive image" /></td>
                 <td>₹{item.price}</td>
                
                 <td>{item.description}</td>
                

              </tr>
             )
           }
         </tbody>
       </table>
     
 


        
        


        </>
      )

}
export default Details