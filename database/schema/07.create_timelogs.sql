CREATE TABLE timelogs (
	id INT NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    content_id int NOT NULL,
    duration float,
    budget_id int,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id)references users(id),
    FOREIGN KEY(content_id)references contents(id),
    FOREIGN KEY(budget_id)references budgets(id)
);