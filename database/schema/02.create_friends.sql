CREATE TABLE friends (
	id INT NOT NULL AUTO_INCREMENT,
    user_id int not null,
    friend_id int,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id)references users(id),
    FOREIGN KEY(friend_id)references users(id)
);