import Authaxios from "../axios/axios";

const userApi = {
    addUserDetails : async (payload:object) => {
        try{
            const response = await Authaxios.post("/add/user", payload) 
            return response.data
        }
        catch (error) {
            console.error("error")
            throw error
        }
    },
    getUserDetails : async () => {
        try{
            const response = await Authaxios.get("/get/user")
            return response.data
        }
        catch (error){
            console.error("error")
            throw error
        }
    },
    getFilterUserDetails: async (User_Id:number) => {
        try{
            const response = await Authaxios.get(`/get/user?User_Id=${User_Id}`)
            return response.data
        }
        catch (error){
            console.error("error")
            throw error
        }
    },
    updateUserDetails : async (user_id:number, payload:object) => {
        try{
            const response = await Authaxios.put(`/update/user/${user_id}`, payload)
            return response.data
        }
        catch (error){
            console.error("error")
            throw error
        }
    },
    daleteUserDateils : async (user_id:number) => {
        try{
            const response = await Authaxios.delete(`/delete/user/${user_id}`)
            return response.data
        }
        catch (error){
            console.error("error")
            throw error
        }
    },
}

export default userApi