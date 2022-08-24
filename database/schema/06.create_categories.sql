CREATE TABLE categories (
	id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    category_name VARCHAR(300),
    color_id INT DEFAULT 1,
    timelogs INT,
    PRIMARY KEY(id),
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(color_id) REFERENCES colors(id)
);