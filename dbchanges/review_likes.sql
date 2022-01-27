DROP TABLE IF EXISTS review_likes;
CREATE TABLE review_likes (
    review_like_id INT(6) NOT NULL,
    user_id INT(6) NOT NULL,
    review_id INT(6) NOT NULL,
    is_liked VARCHAR(5),
    PRIMARY KEY(review_like_id) AUTO_INCREMENT,
    KEY(user_id),
    KEY(review_id)
)