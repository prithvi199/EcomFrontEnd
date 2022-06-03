import React, { useState } from 'react';
import './Login.css';
import LoginService from '../Services/LoginService';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'

import Footer from '../components/navigations/Footer'
import { useCookies } from 'react-cookie';



function Login() {
    const [cookie, setCookie]= useCookies()
    const history = useNavigate();
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);    
    const [loginFailureMsg, setLoginFailureMsg] = useState("");
    const [loginFailure, setLoginFailure] = useState(false);    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [login, setLogin] = useState(
        {
            email: "",
            password: ""
        });
    const changeHandle = e => {
        setLogin((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true)
        var data = await LoginService.login(login)
            .then(response => {
                setLoginFailure(false)
           
                if (response.data[0] == "User" ) {
                    setCookie(response.data[0], response.data[2]);
                    history('/viewdetail', { state: { email: login.email } })
                    
                }
                
                // if (response.data[0] === "Applicant" && response.data[1] === true) {
                //     setCookie(response.data[0], response.data[2]);
                
                else if (response.data[0] == "Admin" ) {
                    setCookie(response.data[0], response.data[2]);
                    history('/add-product', { state: { email: login.email } })
                }
                

            })
            .catch((error) => {
                setLoginFailure(true)
                setLoginFailureMsg(error.response.data)
            })
        setLoading(false)
    };
    
    return (
        <>
             <Link to="/">HomeScreen</Link>
                    <div className="container container1">
                        <div className="row align-items-center">
                            <div className="col-sm-7 col-md-8 col-lg-5 mx-auto">
                                <div className="card shadow border">
                                    <div className="card-body d-flex flex-column align-items-center">
                                        {loginFailure && <p className='text-center text-danger'>{loginFailureMsg}</p>}
                                        <h2 className="text-uppercase text-center mb-2">Login</h2>
                                        <form onSubmit={handleSubmit}>

                                            <div className="form-group">
                                                <label >Email:</label>
                                                <input type="email" className="form-control" placeholder="Enter email" name="email" value={login.email} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" title="Email should be in valid format.(ex: example@gmail.com)" onChange={changeHandle} required/>
                                            </div>

                                            <div className="form-group">
                                                <label >Password:</label>
                                                <input type="password" className="form-control mb-2" placeholder="Enter password" name="password" value={login.password} onChange={changeHandle} required />
                                            </div>

                                            <button type="submit" className="btn-light btn-change">Login</button>
                                            {/* <button type="button" className="btn btn-link" onClick={handleShow}>forget Password?</button> */}
                                            <a href="/register">User Register</a>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
        
    
    )
}

export default Login