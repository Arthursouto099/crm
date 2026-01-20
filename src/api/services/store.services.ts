import { api } from "../config/api";
import { StoreModel } from "../types/user.types";


export interface CreateStoreModel {
    store_name: string
    store_bio: string
    store_image?: string
    logo?: string

}

export const storeServices = {
    allStores: () => api.get("/store/owner/all", {withCredentials: true}),
    getStore: (id_store: string) => api.get(`/store/owner/${id_store}`, {withCredentials: true}),
    createStore: (data: CreateStoreModel) => api.post("/store/owner", data, {withCredentials: true}),
    updateStore: (data: Partial<StoreModel>, id_store: string) => api.put(`/store/owner/${id_store}`, data, {withCredentials: true})
}