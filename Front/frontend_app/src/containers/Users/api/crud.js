import {apiClient} from "../../../config/axios";

export const getUsers = async () => {
    return apiClient.get('/users');
}

export const getUser = async (id) => {
    return apiClient.get(`/users/${id}`)
}

export const getUserAvatar = async (id) => {
    return apiClient.get(`/users/${id}/avatar`)
}