/* getMusculos */
DROP PROCEDURE IF EXISTS getMusculos;
DELIMITER $$
CREATE PROCEDURE getMusculos(
    IN filtro varchar(100),
    IN limite int,
    IN desde int,
    IN orden varchar(100),
    IN campo varchar(100))
BEGIN
	SELECT id, nombre, estado, createdAt, updatedAt 
    FROM Musculos AS Musculos 
    WHERE nombre like CONCAT('%', filtro, '%')
    ORDER BY Musculos.nombre ASC 
    LIMIT desde, limite; 

END
$$