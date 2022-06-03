import http from "./http-common";

class LoginService {

  login(loginDTO) {
    return http.put("/login",loginDTO);
  }
  getUser(){
     return http.get("/responseuser", {withCredentials: true});
  }
  
 getAdmin(){
  return http.get("/responseadmin", {withCredentials: true});
}

  logout(logoutDTO){
    return http.put("/logout",logoutDTO);
  }
  
  
}
export default new LoginService();