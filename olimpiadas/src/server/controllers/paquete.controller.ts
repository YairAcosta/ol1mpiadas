import { Request, Response } from "express";
import { db } from "../db";
import { FullPackageData } from "@/src/app/types/Art&Paq"; // Asegúrate de que esta importación sea correcta

export default class PaqueteController {
    static async registrarPedido(req: Request, res: Response) {
        const userId = req.user?.id;
        const { articulosIds, adultos, menores } = req.body;

        if (!Array.isArray(articulosIds) || articulosIds.length === 0) {
            res.status(400).json({ message: "No se enviaron IDs de artículos." });
            return;
        }

        if (typeof adultos !== 'number' || adultos < 0 || typeof menores !== 'number' || menores < 0) {
            res.status(400).json({ message: "Las cantidades de adultos y menores deben ser números no negativos." });
            return;
        }
        if (adultos === 0) {
            res.status(400).json({ message: "Debe haber al menos un adulto en el pedido." });
            return;
        }


        const connection = await db.getConnection();
        await connection.beginTransaction(); // Comienzo

        try {
            const [[estadoArmando]]: any = await connection.query(
                "SELECT Id, Nombre FROM estado_paq WHERE Nombre = 'armando'"
            );
            const [[estadoPendiente]]: any = await connection.query(
                "SELECT Id, Nombre FROM estado_paq WHERE Nombre = 'pendiente'"
            );

            if (!estadoArmando || !estadoPendiente) {
                throw new Error("Estados 'armando' o 'pendiente' no encontrados.");
            }

            const [[paqueteActual]]: any = await connection.query(
                "SELECT Id, codigo FROM paquete WHERE id_user = ? AND id_estado = ?",
                [userId, estadoArmando.Id]
            );

            if (!paqueteActual) {
                throw new Error("No se encontró paquete 'armando' para el usuario.");
            }

            const idPaqueteActual = paqueteActual.Id;

            // Insertar artículos en part_paq
            for (const id_art of articulosIds) {
                if (typeof id_art !== "number") {
                    throw new Error(`El id_art '${id_art}' debe ser un número.`);
                }
                await connection.query(
                    "INSERT INTO part_paq (id_paquete, id_art) VALUES (?, ?)",
                    [idPaqueteActual, id_art]
                );
            }

            // Actualizar el paquete existente a 'pendiente' y establecer los adultos/menores globales
            await connection.query(
                "UPDATE paquete SET id_estado = ?, Adultos = ?, Menores = ? WHERE Id = ?",
                [estadoPendiente.Id, adultos, menores, idPaqueteActual]
            );

            const codigoNuevo =
                "PKG-" +
                Math.random()
                    .toString(36)
                    .substring(2, 5)
                    .toUpperCase() +
                Math.floor(100 + Math.random() * 900);

            // Insertar un nuevo paquete 'armando' para el próximo carrito
            const [insertPaq]: any = await connection.query(
                "INSERT INTO paquete (id_user, id_estado, codigo, Adultos, Menores) VALUES (?, ?, ?, ?, ?)", // <--- AÑADIDAS COLUMNAS EN INSERT
                [userId, estadoArmando.Id, codigoNuevo, 0, 0] // El nuevo paquete 'armando' comienza con 0 adultos y 0 menores
            );

            const nuevoPaqueteId = insertPaq.insertId;

            await connection.commit();

            res.status(201).json({
                message: "Pedido registrado correctamente.",
                paqueteProcesado: {
                    id: idPaqueteActual,
                    codigo: paqueteActual.codigo,
                    articulosIds,
                    adultos,
                    menores
                },
                nuevoPaquete: {
                    id: nuevoPaqueteId,
                    codigo: codigoNuevo,
                    estado: estadoArmando.Nombre,
                },
            });
        } catch (error: any) {
            await connection.rollback();
            console.error("Error en registrarPedido:", error);
            res.status(500).json({ error: error.message || "Error interno al registrar pedido.", });
        } finally {
            connection.release();
        }
    }

    static async verMisPaquetes(req: Request, res: Response) {
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ message: "No autorizado. Se requiere ID de usuario autenticado." });
            return
        }

        const connection = await db.getConnection();
        try {
            const [[estadoArmando]]: any = await connection.query(
                "SELECT Id FROM estado_paq WHERE Nombre = 'armando'"
            );

            if (!estadoArmando) {
                throw new Error("Estado 'armando' no encontrado en la tabla estado_paq.");
            }

            const idEstadoArmando = estadoArmando.Id;

            // Obtener todos los paquetes del usuario, EXCLUYENDO el estado 'armando',
            const [rawPaquetes]: any = await connection.query(
                `SELECT
                    p.Id,
                    p.Codigo,
                    p.id_estado,
                    p.id_user,
                    p.Adultos,
                    p.Menores,
                    es.Id AS estado_Id,
                    es.Nombre AS estado_Nombre
                FROM
                    paquete AS p
                JOIN
                    estado_paq AS es ON p.id_estado = es.Id
                WHERE
                    p.id_user = ? AND p.id_estado != ?
                ORDER BY p.Id DESC`,
                [userId, idEstadoArmando]
            );

            const paquetesMap = new Map<number, FullPackageData>();

            for (const row of rawPaquetes) {
                paquetesMap.set(row.Id, {
                    Id: row.Id,
                    Codigo: row.Codigo,
                    id_estado: row.id_estado,
                    id_user: row.id_user,
                    Adultos: row.Adultos,
                    Menores: row.Menores,
                    estado: {
                        Id: row.estado_Id,
                        Nombre: row.estado_Nombre,
                    },
                    articulosEnPaquete: [],
                });
            }

            if (paquetesMap.size === 0) {
                res.status(200).json([]);
                return
            }

            const paqueteIds = Array.from(paquetesMap.keys());

            if (paqueteIds.length === 0) {
                res.status(200).json([]);
                return
            }

            // Obtener los artículos para todos esos paquetes (ya filtrados).
            const [rawArticulos]: any = await connection.query(
                `SELECT
                    pp.Id AS partPaqId,
                    pp.id_paquete,
                    pp.id_art,
                    a.Id AS articulo_Id,
                    a.Titulo,
                    a.Descripcion,
                    a.Precio_uni,
                    a.Tipo,
                    a.UnidadMedida
                FROM
                    part_paq AS pp
                JOIN
                    articulos AS a ON pp.id_art = a.Id
                WHERE
                    pp.id_paquete IN (?)`,
                [paqueteIds]
            );

            // Organizar los artículos dentro de sus respectivos paquetes.
            for (const row of rawArticulos) {
                const paquete = paquetesMap.get(row.id_paquete);
                if (paquete) {
                    paquete.articulosEnPaquete.push({
                        Id: row.partPaqId,
                        id_art: row.id_art,
                        id_paquete: row.id_paquete,
                        articulo: {
                            Id: row.articulo_Id,
                            Titulo: row.Titulo,
                            Descripcion: row.Descripcion,
                            Precio_uni: row.Precio_uni,
                            Tipo: row.Tipo,
                            UnidadMedida: row.UnidadMedida,
                        },
                    });
                }
            }

            const paquetesConDetalles: FullPackageData[] = Array.from(paquetesMap.values());

            res.status(200).json(paquetesConDetalles);

        } catch (error: any) {
            console.error("Error en verMisPaquetes:", error);
            res.status(500).json({ error: error.message || "Error interno del servidor al obtener los paquetes." });
        } finally {
            connection.release();
        }
    }
}