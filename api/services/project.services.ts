import { api } from "../config/api";




const projectServices = {
    create: (
        title: string,
        description: string,
        isPublic: boolean,
        token: string
    ) => api.post("/project/create", {title, description, isPublic}, {headers: {Authorization: `bearer ${token}`}}),
    findAll: (token: string) => api.get("/project/myProjects/all", {headers: {Authorization: `bearer ${token}`}}),
    find: (token: string, id_project: string) => api.get(`/project/${id_project}`, {headers: {Authorization: `bearer ${token}`}})
}


export default projectServices