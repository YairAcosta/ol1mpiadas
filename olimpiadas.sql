-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-06-2025 a las 03:58:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `olimpiadas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `Id` int(11) NOT NULL,
  `Titulo` varchar(100) NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `Precio_uni` decimal(10,2) NOT NULL,
  `UnidadMedida` enum('Noche','Fijo','Dia','Hora','Persona') DEFAULT NULL,
  `Tipo` enum('Vuelo','Hotel','Auto','Excursion') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`Id`, `Titulo`, `Descripcion`, `Precio_uni`, `UnidadMedida`, `Tipo`) VALUES
(1, 'Hotel Playa Serena', 'Hotel boutique frente al mar con desayuno continental incluido.', 120000.00, 'Noche', 'Hotel'),
(2, 'Alojamiento Rural El Descanso', 'Casa rural acogedora con huerto orgánico y vistas a la sierra.', 65000.00, 'Noche', 'Hotel'),
(3, 'Apart Suites Urbanas', 'Modernos apartamentos en el centro de la ciudad, ideal para estancias largas.', 95000.00, 'Noche', 'Hotel'),
(4, 'Hostel Aventurero', 'Camas en dormitorio compartido, ambiente joven y actividades diarias.', 25000.00, 'Noche', 'Hotel'),
(5, 'Vuelo EZE-MAD (Ida y Vuelta)', 'Vuelo directo de Iberia, incluye selección de asiento y 2 maletas.', 1200000.00, 'Fijo', 'Vuelo'),
(6, 'Vuelo BRC-COR (Solo Ida)', 'Vuelo económico sin escalas, equipaje de mano permitido.', 90000.00, 'Fijo', 'Vuelo'),
(7, 'Vuelo con Escala a Tokio', 'Vuelo internacional con una escala, servicio de comida a bordo.', 2500000.00, 'Fijo', 'Vuelo'),
(8, 'Paquete de Vuelos Internos Argentina', '4 vuelos domésticos para explorar el país, tarifa flexible.', 600000.00, 'Fijo', 'Vuelo'),
(9, 'Alquiler Coche Económico', 'Fiat Argo o similar, transmisión manual, ideal para ciudad.', 35000.00, 'Dia', 'Auto'),
(10, 'Alquiler Camioneta Premium', 'Jeep Grand Cherokee o similar, 4x4, seguro full cover.', 120000.00, 'Dia', 'Auto'),
(11, 'Alquiler Auto de Lujo', 'BMW Serie 3 o similar, para ocasiones especiales, con GPS.', 200000.00, 'Dia', 'Auto'),
(12, 'Alquiler Minivan 7 Pasajeros', 'Para grupos grandes, aire acondicionado, espacio de equipaje amplio.', 75000.00, 'Dia', 'Auto'),
(13, 'Trekking Glaciar Perito Moreno', 'Excursión de trekking sobre el glaciar, equipo y guía incluidos.', 150000.00, 'Fijo', 'Excursion'),
(14, 'Paseo en Catamarán por el Delta', 'Recorrido de 3 horas por el Delta del Paraná con merienda.', 30000.00, 'Fijo', 'Excursion'),
(15, 'Visita Guiada a Bodega con Degustación', 'Tour por viñedos y cata de vinos premium.', 55000.00, 'Fijo', 'Excursion'),
(16, 'Clase de Cocina Regional', 'Aprende a preparar platos típicos, incluye ingredientes y degustación.', 70000.00, 'Fijo', 'Excursion');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_paq`
--

CREATE TABLE `estado_paq` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `estado_paq`
--

INSERT INTO `estado_paq` (`Id`, `Nombre`) VALUES
(1, 'armando'),
(2, 'pendiente'),
(3, 'aprobado'),
(4, 'desaprobado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paquete`
--

CREATE TABLE `paquete` (
  `Id` int(11) NOT NULL,
  `Codigo` varchar(50) DEFAULT NULL,
  `Id_estado` int(11) DEFAULT NULL,
  `Id_user` int(11) DEFAULT NULL,
  `Adultos` int(11) NOT NULL DEFAULT 0,
  `Menores` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `paquete`
--

INSERT INTO `paquete` (`Id`, `Codigo`, `Id_estado`, `Id_user`, `Adultos`, `Menores`) VALUES
(2, 'PKG-YFZ598', 1, 3, 0, 0),
(3, 'PKG-26U798', 1, 4, 0, 0),
(4, 'PKG-B4R944', 1, 6, 0, 0),
(5, 'PKG-QV4181', 1, 7, 0, 0),
(6, 'PKG-F2D341', 1, 8, 0, 0),
(7, 'PKG-3VX540', 1, 9, 0, 0),
(8, 'PKG-FHS737', 2, 10, 0, 0),
(9, 'PKG-AFG340', 2, 10, 0, 0),
(10, 'PKG-WPE653', 2, 10, 0, 0),
(11, 'PKG-LJV895', 1, 10, 0, 0),
(12, 'PKG-DXM773', 2, 11, 0, 0),
(13, 'PKG-W1O761', 1, 11, 0, 0),
(14, 'PKG-ARS519', 1, 12, 0, 0),
(15, 'PKG-PJO865', 2, 13, 0, 0),
(16, 'PKG-POH956', 1, 13, 0, 0),
(17, 'PKG-KMB291', 2, 14, 0, 0),
(18, 'PKG-54Z980', 3, 14, 2, 1),
(19, 'PKG-ODN889', 1, 14, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `part_paq`
--

CREATE TABLE `part_paq` (
  `Id` int(11) NOT NULL,
  `Id_art` int(11) DEFAULT NULL,
  `Id_paquete` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `part_paq`
--

INSERT INTO `part_paq` (`Id`, `Id_art`, `Id_paquete`) VALUES
(1, 6, 8),
(2, 3, 8),
(3, 15, 8),
(4, 16, 8),
(5, 7, 8),
(6, 7, 9),
(7, 15, 9),
(8, 3, 9),
(9, 8, 10),
(10, 12, 10),
(11, 5, 12),
(12, 10, 12),
(13, 16, 12),
(14, 15, 12),
(15, 5, 15),
(16, 6, 15),
(17, 4, 15),
(18, 15, 17),
(19, 12, 17),
(20, 11, 17),
(21, 7, 17),
(22, 2, 17),
(23, 15, 18),
(24, 10, 18),
(25, 6, 18),
(26, 3, 18);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(100) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Rol` enum('admin','user') DEFAULT 'user',
  `Dni` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Id`, `Nombre`, `Contraseña`, `Email`, `Rol`, `Dni`) VALUES
(3, 'Test 2', 'test2', 'test2@gmail.com', 'user', '12345678'),
(4, 'Test3', 'test123', 'test3@gmail.com', 'user', '12345671'),
(6, 'David Tejedor', 'raul_jeje', 'davidtest@gmail.com', 'user', '12345679'),
(7, 'Carolina Diaz', 'caro_me_ama', 'carolina@test.com', 'user', '47777200'),
(8, 'Lionel Messi', '$2b$10$FKYgYRyhWo1fA3zXCw/VFeYLliZ7ZJFcF6vRHchhPpVZug.BYP/KS', 'messi@gmail.com', 'user', '10101010'),
(9, 'David Tejedor', '$2b$10$0WiIet39X59LLlVYCDDKGOnMjOM3FMXUsnW5F3tE5G6UA7RUEg03m', 'david@gmail.com', 'admin', '18181818'),
(10, 'David Tejedor', '$2b$10$ETW0LB.1ig05seACLHBfP.hB1B8Mkrji107FyY0tHWb0uYewzlf/y', 'davo@gmail.com', 'user', '12121212'),
(11, 'yamil quinotos', '$2b$10$iuSNOusnGlzwQaZ3aAfQee/F4rQn391vAqlpQHuOdFWBn5fszpl5y', 'yamil@gmail.com', 'user', '13131313'),
(12, 'yair quinotos', '$2b$10$a4140bhq0GuySmnyovAKieBQHIZ1sdslkm//9kbEscA2LwpY7PdNK', 'yi@gmail.com', 'user', '13131315'),
(13, 'Carolina Diaz', '$2b$10$SN.v5C8VXJoeL9iNwOt.XOe9mNDDB8YcC6TtkF1bgR7M95lge4Fqu', 'carolina@gmail.com', 'user', '09090909'),
(14, 'David Tejedor', '$2b$10$lLddaLHbj2DgAYY8PSmhcu24O0b3ZcfqXcfdDEVsSGs2/8UsbhS/a', 'david@test.com', 'user', '28282828');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `estado_paq`
--
ALTER TABLE `estado_paq`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Codigo` (`Codigo`),
  ADD KEY `Id_estado` (`Id_estado`),
  ADD KEY `Id_user` (`Id_user`);

--
-- Indices de la tabla `part_paq`
--
ALTER TABLE `part_paq`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_art` (`Id_art`),
  ADD KEY `Id_paquete` (`Id_paquete`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `dni` (`Dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `estado_paq`
--
ALTER TABLE `estado_paq`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `paquete`
--
ALTER TABLE `paquete`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `part_paq`
--
ALTER TABLE `part_paq`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `paquete`
--
ALTER TABLE `paquete`
  ADD CONSTRAINT `paquete_ibfk_1` FOREIGN KEY (`Id_estado`) REFERENCES `estado_paq` (`Id`),
  ADD CONSTRAINT `paquete_ibfk_2` FOREIGN KEY (`Id_user`) REFERENCES `usuario` (`Id`);

--
-- Filtros para la tabla `part_paq`
--
ALTER TABLE `part_paq`
  ADD CONSTRAINT `part_paq_ibfk_1` FOREIGN KEY (`Id_art`) REFERENCES `articulos` (`Id`),
  ADD CONSTRAINT `part_paq_ibfk_2` FOREIGN KEY (`Id_paquete`) REFERENCES `paquete` (`Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
