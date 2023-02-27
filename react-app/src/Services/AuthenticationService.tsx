import axios from "axios";

const API_URL = "localhost:8080"

class AuthenticationService {
    private static isUserLoggedIn: boolean;

    static getLoginStatus () {
        return this.isUserLoggedIn
    }

    static executeBasicAuthenticationService(username: string, password: string) {
        return axios.get(`${API_URL}/basicauth`,
            { headers: { authorization: this.createBasicAuthToken(username, password) } })
    }

    static createBasicAuthToken(username: string, password: string) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    static registerSuccessfulLogin(username: string, password: string) {
        //let basicAuthHeader = 'Basic ' +  window.btoa(username + ":" + password)
        //console.log('registerSuccessfulLogin')
        this.isUserLoggedIn = true;
        sessionStorage.setItem(`${username}_AUTH_SESSION`, username)
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }

    static setupAxiosInterceptors(token: string) {
        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }
}

export default AuthenticationService