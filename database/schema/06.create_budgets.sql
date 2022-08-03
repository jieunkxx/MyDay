CREATE TABLE budgets (
	id INT NOT NULL AUTO_INCREMENT,
    year	year not null,
    week	tinyint not null,
    budget float,
    remains float,
    user_id int not null,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id)references users(id)
);