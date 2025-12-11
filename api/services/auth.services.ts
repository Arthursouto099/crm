import { api } from "../config/api"




const userServices = {
    signup: (email: string, name: string, password: string) => api.post("/auth/signup", {email, name, password}), 
    sign: (email: string, password: string) => api.post("/auth/sign", {email, passwordTry: password}),
    getUser: (token: string, id_user: string) => api.get(`user/admin/${id_user}`, {headers: {Authorization: `bearer ${token}`}}),
    updateUser: (token: string, id_user: string, data: {email: string, name: string, profile_image?: string}) => api.put(`user/update/${id_user}`, data, {headers:{Authorization: `bearer ${token}`}})
}



export default userServices