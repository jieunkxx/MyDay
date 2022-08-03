CREATE TABLE categories (
	id INT NOT NULL AUTO_INCREMENT,
    category_name varchar(300),
    color_id int,
    PRIMARY KEY(id),
    FOREIGN KEY(color_id)references colors(id)
);
