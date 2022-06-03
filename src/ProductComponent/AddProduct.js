import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
//import { Backdrop, CircularProgress } from '@material-ui/core';


function ProductRegister(props) {
    const [femail, setFarmerEmail] = useState(props.farmersEmail)
    const [success, SetSuccess] = useState(false)
    const [failure, SetFailure] = useState(false)
    const [failureMessage, SetFailureMessage] = useState(null)
    const [fileName, setFileName] = useState(null);
    const [price, setPrice] = useState()
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState()
    const [productName, setProductName] = useState("");
    const [description, setProductDescription] = useState("");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [loading, setLoading] = useState(false);
    const history = useNavigate();
    
    const formData = new FormData();
   
    formData.append("productImage", fileName)
    formData.append("name", productName)
    formData.append("price", price)
    formData.append("quantity", quantity)
    formData.append("description",description)
    

    const handleSubmit = async (event) => {
        
        event.preventDefault();
        var image = document.getElementById("imag");
        var size = parseFloat(image.files[0].size / (1024 * 1024)).toFixed(2); 

        if(size > 1) {

            document.getElementById("imageSize").innerHTML = "Please select image size less than 1 MB"

        }else{

            setLoading(true)
            await axios({
                method: 'post',
                url: 'http://localhost:8090/product/add',
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((response) => {
                SetSuccess(true)
                SetFailure(false)
                alert("Product Added successfully")
                history('/add-product')
            })
                .catch((e) => {
                    SetSuccess(true)
                    SetFailure(false)
                })
                setLoading(false)
               
        }
      
    }

    const goToProductScreen = ()=>{
        navigate("/editproduct")
      }


    return (
        <>
            
            {/* <Link to="/">Logout</Link> */}
           
            <button type="button" className="primary block" onClick={goToProductScreen} >Go to product page</button>
            {/* {loading && <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>} */}
            {!loading && <>
                <div className="row d-flex justify-content-center  align-items-center h-100">
                    <div className="col-12 col-md-9 col-lg-7  col-xl-6">
                        <div className="card " >
                            <div className="card-body p-5">
                                {success && <p className='text-center fw-bold fs-6 text-success'>Successfully Added.</p>}
                                {failure && <p className='text-center fw-bold fs-6 text-danger'>Failed to register. <b>{failureMessage}</b></p>}
                                <p id="imageSize" className='text-center fw-bold fs-6 text-danger'></p>
                                <h4 className="text-uppercase text-center mb-4">Add Product</h4>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label >Product Name:</label>
                                        <textarea className="form-control" rows = "3" placeholder = "Enter name" name="name" value={productName} onChange={(e) => setProductName(e.target.value)} required/>
                                       
                                    </div>
                                    <div className="form-group mb-2">
                                        <label >Product Price:</label>
                                        <input type="number" className="form-control" placeholder="Enter price" value={price} name="price" onChange={(e) => setPrice(e.target.value)} required/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label >Product Quantity:</label>
                                        <input type="number" className="form-control" placeholder="Enter quantity" value={quantity} name="quantity" onChange={(e) => setQuantity(e.target.value)} required/>
                                    </div>
                                    <div className="form-group mb-2">
                                        <label >Upload image:</label>
                                        <input type="file" id="imag" className="form-control" name ="productImage " onChange={(e) => setFileName(e.target.files[0])} required/>
                                    </div>
                                    <div className="form-group">
                                        <label >Product Description:</label>
                                        <textarea className="form-control" rows = "3" placeholder = "Enter description" name="description" value={description} onChange={(e) => setProductDescription(e.target.value)} required/>
                                       
                                    </div>
                                    <button type="submit" className="btn-light btn-change">Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </>}
        </>
    )
}

export default ProductRegister