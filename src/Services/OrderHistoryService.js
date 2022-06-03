
import http from "./http-common";

class OrderHistoryService{

    getHistory(userEmail){
        return http.get(`/orderhistory/${userEmail}`);
      }

}
export default new OrderHistoryService();