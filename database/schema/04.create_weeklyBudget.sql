CREATE TABLE weeklyBudgets (
    id INT NOT NULL AUTO_INCREMENT,
    user_id     INT NOT NULL,
    yearweek    INT NOT NULL,
    budget      INT,
    remains     INT,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);