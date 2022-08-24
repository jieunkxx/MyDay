CREATE TABLE colors (
	id INT NOT NULL AUTO_INCREMENT,
    color_name varchar(100) unique not null,
    hex varchar(100),
    PRIMARY KEY(id)
);