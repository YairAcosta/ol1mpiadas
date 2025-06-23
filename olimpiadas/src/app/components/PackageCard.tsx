"use client";

import { motion } from "framer-motion";
import { Paquete, EstadoPaq, PartPaq } from "@/src/app/types/Art&Paq";

type PackageCardProps = {
    paquete: Paquete;
    partPaqs: PartPaq[];
    estadoPaq: EstadoPaq;
};

export default function PackageCard({ paquete, partPaqs, estadoPaq }: PackageCardProps) {
    const { Codigo, Adultos, Menores } = paquete;
    const numberOfArticles = partPaqs.length;

    const calculateTotalPrice = () => {
        let total = 0;

        for (const part of partPaqs) {
            let price =
                typeof part.articulo.Precio_uni === "string"
                    ? parseFloat(part.articulo.Precio_uni)
                    : part.articulo.Precio_uni;
            total += price;
        }
        return total;
    };

    const calculatedTotalPrice = calculateTotalPrice();

    const getEstadoColor = (estadoName: string) => {
        switch (estadoName.toLowerCase()) {
            case "armando":
                return "bg-blue-500";
            case "pendiente":
                return "bg-orange-500";
            case "aprobado":
                return "bg-green-600";
            case "desaprobado":
                return "bg-red-500";
            default:
                return "bg-gray-400";
        }
    };

    const getPrecioUnidadTexto = (unidad: string) => {
        switch (unidad) {
            case "Noche":
                return " / Noche";
            case "Dia":
                return " / Día";
            case "Hora":
                return " / Hora";
            case "Persona":
                return " / Persona";
            case "Fijo":
            default:
                return "";
        }
    };

    const handleBuy = () => {

    }

    return (
        <motion.div className="relative w-full sm:max-w-md bg-gradient-to-br from-[#dff3fd] to-[#bad5ee] rounded-2xl overflow-hidden transition-all duration-500 shadow-md border border-white/20 hover:shadow-xl hover:border-violet-500 group p-5">
            {/* Efectos visuales de hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/80 to-transparent opacity-0 group-hover:opacity-100 animate-pulse pointer-events-none" />
            <div className="absolute -inset-2 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.3)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-4">
                {/* Encabezado del Paquete: Código y Estado */}
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-slate-800">
                        Paquete: {Codigo}
                    </h2>
                    <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getEstadoColor(
                            estadoPaq.Nombre
                        )}`}
                    >
                        {estadoPaq.Nombre}
                    </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-700 text-sm">
                    <p>
                        <span className="font-semibold">Artículos:</span> {numberOfArticles}
                    </p>
                    <p>
                        <span className="font-semibold">Adultos:</span> {Adultos}
                    </p>
                    <p>
                        <span className="font-semibold">Menores:</span> {Menores}
                    </p>
                    <p className="col-span-2 sm:col-span-1">
                        <span className="font-semibold">Total:</span> ARS{" "}
                        {calculatedTotalPrice.toLocaleString("es-AR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                    </p>
                </div>

                {/* Sección de Artículos Incluidos */}
                <div className="flex flex-col gap-2">

                    {partPaqs.length > 0 ? (
                        <ul className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {partPaqs.map((part) => (
                                <li
                                    key={part.Id}
                                    className="bg-white rounded-md p-3 shadow-sm border border-gray-100 flex flex-col gap-1"
                                >
                                    <p className="text-sm font-semibold text-gray-800">
                                        {part.articulo.Titulo}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Tipo:{" "}
                                        <span className="capitalize font-medium">
                                            {part.articulo.Tipo}
                                        </span>
                                    </p>
                                    <p className="text-xs text-gray-600">
                                        Precio unitario: ARS{" "}
                                        {part.articulo.Precio_uni.toLocaleString("es-AR", {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                        {getPrecioUnidadTexto(part.articulo.UnidadMedida)}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-slate-600 italic">
                            No hay artículos en este paquete.
                        </p>
                    )}
                    {estadoPaq.Nombre === 'aprobado' &&
                        <button className="cursor-pointer p-2 mt-2 font-semibold bg-green-600 text-white hover:bg-green-700 transition duration-300 rounded-lg">Comprar</button>
                    }
                </div>
            </div>
        </motion.div>
    );
}
