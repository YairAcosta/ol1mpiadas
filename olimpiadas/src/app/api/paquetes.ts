import axios, { AxiosResponse } from "axios";
import { RegisterPedidoPayload } from "@/src/app/types/ApiResponse";
import { FullPackageData } from "../types/Art&Paq";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const registerPedidoRQ = (payload: RegisterPedidoPayload): Promise<AxiosResponse<{ message: string; paqueteProcesado: any; nuevoPaquete: any }>> => {
    return axios.post(`${API}/paquete/registrarPedido`, payload, {
        withCredentials: true,
    });
};

export const verMisPaquetesRQ = (): Promise<AxiosResponse<FullPackageData[]>> => {
    return axios.get(`${API}/paquete/verMisPaquetes`, {
        withCredentials: true,
    });
};



