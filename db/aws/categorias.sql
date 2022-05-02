/* getCategorias */
DROP PROCEDURE IF EXISTS getCategorias;
DELIMITER $$
CREATE PROCEDURE getCategorias(
    IN filtro varchar(100),
    IN limite int,
    IN desde int,
    IN orden varchar(100),
    IN campo varchar(100))
BEGIN
	SELECT id, nombre, estado, createdAt, updatedAt 
    FROM Categorias AS Categorias 
    WHERE nombre like CONCAT('%', filtro, '%')
    ORDER BY Categorias.nombre ASC 
    LIMIT desde, limite; 
END
$$