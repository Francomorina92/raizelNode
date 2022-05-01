/* getLikes */
DROP PROCEDURE IF EXISTS getLikes;
DELIMITER $$
CREATE PROCEDURE getLikes(
    IN id int,
    IN limite int,
    IN desde int,
    IN orden varchar(100),
    IN campo varchar(100))
BEGIN
    SELECT id, idPerfil, idRutina, estado, createdAt, updatedAt 
    FROM Likes AS Likes 
    WHERE idRutina = id
    ORDER BY Likes.updatedAt 
    DESC LIMIT desde, limite;
END
$$