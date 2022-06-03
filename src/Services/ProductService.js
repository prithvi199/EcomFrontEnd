import http from "./http-common";

class ProductService {
  getAll() {
    return http.get("/product");
  }
  get(id) {
    return http.get(`/product/${id}`);
  }

  get(name) {
    return http.get(`/product/${name}`);
  }

  create(product) {
    return http.post("/product", product);
  }

  
 
  delete(id) {
    return http.delete(`/product/${id}`);
  }
 
}
export default new ProductService();