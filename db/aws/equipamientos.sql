/* getEquipamientos */
DROP PROCEDURE IF EXISTS getEquipamientos;
DELIMITER $$
CREATE PROCEDURE getEquipamientos(
    IN filtro varchar(100),
    IN limite int,
    IN desde int,
    IN orden varchar(100),
    IN campo varchar(100))
BEGIN
	SELECT id, nombre, estado, createdAt, updatedAt 
    FROM Equipamientos AS Equipamientos 
    WHERE nombre like CONCAT('%', filtro, '%')
    ORDER BY Equipamientos.nombre ASC 
    LIMIT desde, limite; 

END
$$