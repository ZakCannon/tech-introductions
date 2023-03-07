import axios from "axios";

const API_URL = "http://localhost:8080"

class AuthenticationService {
    private static isUserLoggedIn: boolean;

    static getLoginStatus () {
        return this.isUserLoggedIn
    }

    static logUserIn(email: string, password: string) {

    }
}

export default AuthenticationService