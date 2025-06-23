export type Articulo = {
    Id: number;
    Titulo: string;
    Descripcion: string;
    Precio_uni: number;
    Tipo: "Hotel" | "Vuelo" | "Excursion" | "Auto";
    UnidadMedida: "Noche" | "Fijo" | "Dia" | "Hora" | "Persona";
}

export type EstadoPaq = {
    Id: number;
    Nombre: string;
};

export type Paquete = {
    Id: number;
    id_estado: number;
    id_user: number;
    Adultos: number;
    Menores: number;
    Codigo: string;
};


export type PartPaq = {
    Id: number;
    id_art: number;
    id_paquete: number;
    articulo: Articulo;

};

export type FullPackageData = Paquete & {
    estado: EstadoPaq;
    articulosEnPaquete: PartPaq[];
};