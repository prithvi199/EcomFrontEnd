import http from "./http-common";

class UserCartService{

    getAll(userEmail){
        return http.get(`/cart/list/${userEmail}`);
      }

      getById(userEmail){
        return http.get(`/cart/${userEmail}`);
      }


}
export default new UserCartService();