CREATE TABLE Menu (
    p_id INT PRIMARY KEY IDENTITY (1, 1),
    p_name VARCHAR (50) NOT NULL,
    item1 VARCHAR (50),
    item2 VARCHAR (50),
    item3 VARCHAR (50),
);
INSERT INTO Menu ("p_name","item1","item2","item3") VALUES ('Arroz Chino','Arroz','Pollo','Verduras');
INSERT INTO Menu ("p_name","item1","item2","item3") VALUES ('Sopa de Fideos','Sopa','Fideos','Verduras');
INSERT INTO Menu ("p_name","item1","item2","item3") VALUES ('Ramen','Sopa','Cerdo','Fideos');
