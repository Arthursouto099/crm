import { UserSignup } from "@/src/app/(public)/signup/page"
import { api } from "../config/api"




const userServices = {
    signup: ({email, name, password, store_name, store_bio}: UserSignup) => api.post("/auth/signup", {email, name, password, store_name, store_bio}), 
    sign: (email: string, password: string) => api.post("/auth/sign", {email, passwordTry: password}, { withCredentials: true}),
    getMe: () => api.get(`user/me`, {withCredentials: true}),
    updateUser: (data: {email: string, name: string, profile_image?: string}) => api.put(`user/update`, data, {withCredentials: true})
}



export default userServices