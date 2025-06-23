"use client";
import { FullPackageData } from "@/src/app/types/Art&Paq";
import PackageCard from "@/src/app/components/PackageCard";
import { verMisPaquetesRQ } from "@/src/app/api/paquetes";
import { useEffect, useState } from "react";

const Paquete = () => {
  const [paquetes, setPaquetes] = useState<FullPackageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para cargar los paquetes cuando el componente se monte
  useEffect(() => {
    const fetchPaquetes = async () => {
      try {
        setLoading(true); // Activa el estado de carga
        setError(null); // Limpia cualquier error previo

        // Llama a la función de petición al backend
        const response = await verMisPaquetesRQ();
        setPaquetes(response.data); // Asigna los datos obtenidos a nuestro estado
      } catch (err: any) {
        // Manejo de errores
        console.error("Error al obtener los paquetes:", err);
        setError(
          err.response?.data?.error ||
            "Error al cargar tus paquetes. Inténtalo de nuevo."
        );
      } finally {
        setLoading(false); // Desactiva el estado de carga, haya éxito o error
      }
    };

    fetchPaquetes(); // Ejecuta la función de carga
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente

  // Renderizado condicional basado en el estado de carga y error
  if (loading) {
    return (
      <section className="bg-white px-4 sm:px-6 py-6 text-center font-sans">
        <h2 className="text-base sm:text-lg text-gray-800 font-normal mb-6">
          Cargando tus paquetes...
        </h2>
        {/* Aquí podrías añadir un spinner o animación de carga */}
        <p>Por favor, espera.</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white px-4 sm:px-6 py-6 text-center font-sans">
        <h2 className="text-base sm:text-lg text-red-600 font-normal mb-6">
          ¡Ocurrió un error!
        </h2>
        <p className="text-gray-700">{error}</p>
        <p className="text-gray-500 mt-2">
          Asegúrate de haber iniciado sesión.
        </p>
      </section>
    );
  }

  if (paquetes.length === 0) {
    return (
      <section className="bg-white px-4 sm:px-6 py-6 text-center font-sans">
        <h2 className="text-base sm:text-lg text-gray-800 font-normal mb-6">
          No tienes paquetes registrados aún.
        </h2>
        <p className="text-gray-700">
          ¡Es hora de planificar tu próxima aventura!
        </p>
      </section>
    );
  }

  // Si hay paquetes, los renderizamos
  return (
    <>
      <section className="bg-white px-4 sm:px-6 py-6 text-center font-sans">
        <h2 className="text-base sm:text-lg text-gray-800 font-normal mb-6">
          Tus paquetes de viaje
        </h2>

        <div className="flex flex-wrap justify-center gap-6 pb-4">
          {/* Mapea los paquetes reales y renderiza un PackageCard por cada uno */}
          {paquetes.map((paquete) => (
            <PackageCard
              key={paquete.Id}
              paquete={paquete}
              partPaqs={paquete.articulosEnPaquete}
              estadoPaq={paquete.estado}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Paquete;
