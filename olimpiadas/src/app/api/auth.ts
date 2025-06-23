import axios, { AxiosResponse } from "axios";
import { formRegister, formLogin } from "../../server/schemas/user.schema";
import { UserApiResponse, RegisterPedidoPayload } from "@/src/app/types/ApiResponse";
import { FullPackageData } from "../types/Art&Paq";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// El token se recibirá como una cookie HttpOnly.

export const registerRQ = (user: formRegister): Promise<AxiosResponse<{ message: string; user: UserApiResponse }>> => {
    return axios.post(`${API}/usuario/register`, user, {
        withCredentials: true,
    });
};
export const loginRQ = (user: formLogin): Promise<AxiosResponse<{ message: string; user: UserApiResponse }>> => {
    return axios.post(`${API}/usuario/login`, user, {
        withCredentials: true,
    });
};

export const logoutRQ = (): Promise<AxiosResponse<{ message: string }>> => {
    return axios.post(`${API}/usuario/logout`, {}, { // El segundo argumento es un cuerpo vacío
        withCredentials: true,
    });
};

export const profileRQ = (): Promise<AxiosResponse<{ message: string; user: UserApiResponse }>> => {
    return axios.get(`${API}/usuario/profile`, {
        withCredentials: true,
    });
};




