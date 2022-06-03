
import http from "./http-common";

class UserService {
  getAll() {
    return http.get("/User");
  }
  get(id) {
    return http.get(`/User/${id}`);
  }

  getAdmin(id) {
    return http.get(`/admin/${id}`);
  }
  
  
  create(user) {
    return http.post("/User", user);
  }
  
  delete(email) {
    return http.delete(`/User/${email}`);
  }
  
}
export default new UserService();