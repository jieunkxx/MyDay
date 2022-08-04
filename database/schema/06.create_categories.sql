CREATE TABLE categories (
	id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_name VARCHAR(300),
    color_id INT DEFAULT 1,
    timelogs INT,
    budget_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(color_id) REFERENCES colors(id),
    FOREIGN KEY(budget_id) REFERENCES budgets(id)
);