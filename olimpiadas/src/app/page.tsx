"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Card from "./components/Card";
import axios from "axios";
import { Articulo } from "./types/Art&Paq";

export default function Home() {
  const [articulos, setArticulos] = useState<Articulo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get<Articulo[]>(
          "http://localhost:8000/api/articulo/verArticulos/Vuelo"
        );

        setArticulos(response.data);
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Ocurrió un error inesperado."
        );
        console.error("Error al cargar vuelos:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <section className="bg-white px-4 sm:px-6 py-6 text-center font-sans">
        <h2 className="text-lg sm:text-xl text-gray-800 font-medium mb-10">
          Cargando vuelos...
        </h2>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white px-4 sm:px-6 py-6 text-center font-sans">
        <h2 className="text-lg sm:text-xl text-red-600 font-medium mb-10">
          Error al cargar los vuelos: {error}
        </h2>
      </section>
    );
  }

  if (articulos.length === 0) {
    return (
      <section className="bg-white px-4 sm:px-6 py-6 text-center font-sans">
        <h2 className="text-lg sm:text-xl text-gray-500 font-medium mb-10">
          No hay vuelos disponibles en este momento.
        </h2>
      </section>
    );
  }

  return (
    <>
      <section className="bg-white px-4 sm:px-6 py-6 text-center font-sans">
        <h2 className="text-lg sm:text-xl text-gray-800 font-medium mb-10">
          Tus destinos favoritos, al mejor precio.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
          {articulos.map((vuelo) => (
            <motion.div
              key={vuelo.Id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <Card articulo={vuelo} />
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
