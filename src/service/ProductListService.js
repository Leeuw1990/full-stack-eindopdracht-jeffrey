import http from "../http-common";

class ProductListService {
  postData(data) {
    return http.post("/api/productlist", data);
  }

  getData() {
    return http.get("/api/productlist");
  }

  deleteData(listId) {
    return http.delete(`/api/productlist/${listId}`)
  }
}

export default new ProductListService();
