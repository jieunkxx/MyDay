CREATE TABLE contents (
	id INT NOT NULL AUTO_INCREMENT,
    title varchar(300),
    memo text,
    category_id int default null,
    start_time timestamp,
    end_time timestamp,
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME,
    PRIMARY KEY(id),
    FOREIGN KEY(category_id)references categories(id)
);