import { api } from "../config/api"




const userServices = {
    signup: (email: string, name: string, password: string) => api.post("/auth/signup", {email, name, password}), 
    sign: (email: string, password: string) => api.post("/auth/sign", {email, passwordTry: password})
}



export default userServices