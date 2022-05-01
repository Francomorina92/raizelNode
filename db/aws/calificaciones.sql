/* getCalificaciones */
DROP PROCEDURE IF EXISTS getCalificaciones;
DELIMITER $$
CREATE PROCEDURE getCalificaciones(
    IN id int,
    IN limite int,
    IN desde int,
    IN orden varchar(100),
    IN campo varchar(100))
BEGIN
    SELECT id, mensaje, calificacion, idPerfil, idUsuario, estado, createdAt, updatedAt 
    FROM Calificaciones AS Calificaciones 
    WHERE idPerfil = id
    ORDER BY Calificaciones.updatedAt 
    DESC LIMIT desde, limite;
END
$$
