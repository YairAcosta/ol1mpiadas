import { Router } from "express";
import PaqueteController from "../controllers/paquete.controller";
import { AuthenticateToken } from "../middleware/AuthenticateToken";

const paqueteR = Router();

paqueteR.post("/registrarPedido", AuthenticateToken, PaqueteController.registrarPedido);
paqueteR.get("/verMisPaquetes", AuthenticateToken, PaqueteController.verMisPaquetes);


export default paqueteR;
