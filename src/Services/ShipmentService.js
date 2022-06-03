import http from "./http-common";

class ShipmentService {
  agree(email,paythrough,paymentid) {
    return http.put(`/review/useragree/${email}/${paythrough}/${paymentid}`);
  }
  delivery(orderid){
    return http.put(`/review/userHistory/${orderid}`);
  }

}
export default new ShipmentService();