import axios from 'axios'
import _localStorage from "./BrowserLocalstorage";
import jwtDecode from "jwt-decode";

export default axios.create({
    baseURL : process.env.NEXT_PUBLIC_SERVICE,
    headers : {
        'Content-Type': 'application/json',
    },
    transformRequest :[(data, headers) => {

        const token = _localStorage.get('token')
        const refresh_token = _localStorage.get('refresh_token')

        if (token){
            const token_decode = jwtDecode(token)
            if (token_decode.exp < Date.now / 1000) {
                console.log('Token expired')
                RefreshToken(refresh_token)
            }
        }
        if (token) headers.Authorization = "Bearer " + token
        return JSON.stringify(data);
    }]
})

const logout = () => {
    _localStorage.remove("token");
    _localStorage.remove("refresh_token");
    window.location.href = "/login";
}

const RefreshToken = async (refreshtokenval) => {
    try {
        if (refreshtokenval) {
            const { data } = await axios({
                method: "get",
                url: `${process.env.NEXT_PUBLIC_SERVICE}/provider/refreshToken`,
                headers: { Authorization: "Bearer " + refreshtokenval },
            })
            const token = data.items
            _localStorage.set('token', token);
        } else {
            logout()
        }
    } catch (error) {
        logout()
    }
}