CREATE TABLE budgets (
    id INT NOT NULL AUTO_INCREMENT,
    yearweek    INT NOT NULL,
    budget      INT,
    remains     INT,
    weeklyBudget_id INT,
    PRIMARY KEY(id),
    FOREIGN KEY(weeklyBudget_id) REFERENCES weeklyBudgets(id)
);