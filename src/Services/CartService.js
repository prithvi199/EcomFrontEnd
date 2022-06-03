import http from "./http-common";



class CartService{
    getAll(orderId){
        return http.get(`/review/getCart/${orderId}`);
      }

      getHistory(){
        return http.get(`/review/gethistory`);
      }


      getAllCart(){
        return http.get(`/review/orderhistory`);
      }

      addCart(tempProdCart){
        return http.put(`/review/cart`,tempProdCart)
      }

      dispatch(orderId){
        return http.put(`/review/userHistory/${orderId}`)

      }

      changeCart(productId){
        return http.put(`/review/changeHistory/${productId}`)

      }

      deleteById(orderId,productId){
        return http.delete(`/review/deletebyId/${orderId}/${productId}`);
      }

      agree(email,paythrough,paymentid) {
        return http.put(`/review/useragree/${email}/${paythrough}/${paymentid}`);
      }

}

export default new CartService();