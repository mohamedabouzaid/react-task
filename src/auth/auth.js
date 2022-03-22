import axios from "axios"
class Auth {
    LogIn(user){
        return axios.post('http://localhost:3000/api/v1/users/logIn',user)
    }

    LogOut(){
        localStorage.removeItem('token');
    }

    checkAdmin(){
        let token = localStorage.getItem('token')
        return axios.get('http://localhost:3000/api/v1/users/check-admin',{
            headers:{
                'Authorization':token
            }
        })
    }

    isAuthinticated(){
        return localStorage.getItem('token');
    }
}

export default new Auth()