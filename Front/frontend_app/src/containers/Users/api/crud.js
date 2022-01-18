import {apiClient} from "../../../config/axios";

export const getUsers = async () => {
    return apiClient.get('/users');
}