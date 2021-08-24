import http from "../http-common";

class AdminService {

    getUsers() {
        return http.get("http://localhost:8080/api/users/allusers");
    }
}

export default new AdminService();