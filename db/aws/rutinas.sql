/* getRutinas */
DROP PROCEDURE IF EXISTS getRutinas;
DELIMITER $$
CREATE PROCEDURE getRutinas(
    IN id int,
    IN limite int,
    IN desde int,
    IN orden varchar(100),
    IN campo varchar(100))
BEGIN
    
	SELECT id, idPerfil, nombre, estado, createdAt, updatedAt 
	FROM Rutinas AS Rutinas 
    WHERE idPerfil = id
    ORDER BY Rutinas.id ASC 
    LIMIT desde, limite;
END
$$