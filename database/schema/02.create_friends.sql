CREATE TABLE friends (
	id INT NOT NULL AUTO_INCREMENT,
    user_id int not null,
    friend_id int,
    PRIMARY KEY(id),
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME,
    FOREIGN KEY(user_id)references users(id),
    FOREIGN KEY(friend_id)references users(id)
);