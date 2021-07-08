import React from 'react';
import http from "../http-common";

class ProductUploadService {
    upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("file", file);

        return http.post("/api/product/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }

    getFiles() {
        return http.get("/api/product/files", {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    }
}

export default new ProductUploadService();