import http from "../http-common";

class ProductService {

  upload(file) {
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/api/product/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  getFiles() {
    return http.get("/api/product/files", {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  patchFiles(object, data) {
    return http.patch(`${object}`, data)
  }

}

export default new ProductService();
