CREATE TABLE contents (
	id INT NOT NULL AUTO_INCREMENT,
    title varchar(300),
    memo text,
    user_id int not null,
    category_id int default null,
    start_time timestamp,
    end_time timestamp,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id)references users(id),
    FOREIGN KEY(category_id)references categories(id)
);