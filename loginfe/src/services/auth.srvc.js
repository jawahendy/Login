import axios from "axios";

const URL = "http://localhost:8003/api/";

class AuthService {
    login(username, password) {
        return axios.post(URL + "signin", {
            username,
            password
        })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                    console.log(response.data)
                }

                return response.data;
            });
    }

    register(username, email, password, fullname) {
        return axios.post(URL + "signup", {
            username,
            email,
            password,
            fullname
        });
    }

    Forgotpass(username, email) {
        return axios.post(URL + "forgotpass", {
            username,
            email
        });
    }

    UpdatedpassDB(username, password) {
        return axios.post(URL + "updatepassDb", {
            username,
            password
        });
    }
    getUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }

}

export default new AuthService();