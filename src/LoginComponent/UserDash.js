// import LoginService from "../../services/LoginService";
// import { useCookies } from "react-cookie";
// import { IconContext } from "react-icons";

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import UserService from "../Services/UserService";



// function UserDash(){
//     document.title = "User";
//     const [cookie, setCookie, removeCookie] = useCookies();
//     const [user, setUser] = useState([]);
//     const [show, setShow] = useState(false);
//     const [errorMsg, setErrorMsg] = useState();
//     const navigate = useNavigate();
//     const location = useLocation();

//     useEffect(() => {
//         const data = UserService.getAll()
//           .then((response) => {
//             console.log(response.data)
//             setUser(response.data);
//           })
//           .catch((error) => {
//             setShow(true);
//             setErrorMsg(error.response.data);
    
//             navigate("/login");
//           });
//         return () => {};
//       }, []);


//       const logout = () => {
//         const logoutDTO = {
//           email: user.email,
//           type: "User",
//         };
//         LoginService.logout(logoutDTO).then((response) => {
//           removeCookie(logoutDTO.type);
//           localStorage.removeItem("token");
//           navigate("/login");
//         });
//       };


//       return(

//         <>
        
//         <div className="navbar">
//           {/* <Link to="#" className="menu-bars">
//             <FaIcons.FaBars onClick={showSidebar} />
//           </Link> */}

//           <div className="navbar-nav mx-auto">
//             <h5 className="nav-item">
//               {" "}
//               Welcome Customer:&nbsp; {user.name}{" "}
//             </h5>
//           </div>
//         </div>

//         <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
//           <ul className="nav-menu-items" onClick={showSidebar}>
//             <li className="navbar-toggle">
//               <Link to="#" className="close-bars">
//                 <AiIcons.AiOutlineClose />
//               </Link>
//             </li>
//             <li>
//               <a onClick={goToHome} className="nav-text">
//                 <AiIcons.AiOutlineHome />
//                 <span>Home </span>
//               </a>
//             </li>
//             <li>
//               <a onClick={goToPersonalDetails} className="nav-text">
//                 <FaIcons.FaUserAlt />
//                 <span>Perosnal Details </span>
//               </a>
//             </li>
//             <li>
//               <a onClick={goToAvailJobs} className="nav-text">
//                 <FaIcons.FaUsers />
//                 <span>All Available jobs </span>
//               </a>
//             </li>
//             <li>
//               <a onClick={goToAppliedJobsAndStatus} className="nav-text">
//                 <AiIcons.AiTwotoneSnippets />
//                 <span>Application Status </span>
//               </a>
//             </li>
//             {/* <li>
//               <a onClick={goToContactUs} className="nav-text">
//                 <AiIcons.AiOutlineContacts />
//                 <span>Contact-Us </span>
//               </a>
//             </li>
//             <li>
//               <a onClick={goToDeleteAccount} className="nav-text">
//                 <AiIcons.AiOutlineDelete />
//                 <span>Delete Account </span>
//               </a>
//             </li> */}

//             <li>
//               <a onClick={logout} className="nav-text">
//                 <AiIcons.AiOutlineLogout />
//                 <span>Logout </span>
//               </a>
//             </li>
//           </ul>
//         </nav>
     
        
        
        
//         </>
//       )



// }

// export default UserDash