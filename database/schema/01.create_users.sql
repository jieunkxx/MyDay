CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    social BOOLEAN DEFAULT TRUE,
    password VARCHAR(500) DEFAULT NULL,
    user_img VARCHAR(3000) DEFAULT 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtdz6QQYO7SjHPl-ruRNK-KbfAKhjQEeOAmg&usqp=CAU',
    created_at DATETIME DEFAULT NOW(),
    updated_at DATETIME,
    PRIMARY KEY (id),
    CONSTRAINT social_check CHECK ((social AND password IS NULL)
        OR (NOT social
        AND NOT (password IS NULL OR password = '')))
);