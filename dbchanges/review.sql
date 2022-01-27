USE foody;

DROP TABLE IF EXISTS foody.restaurant_review;
CREATE TABLE foody.restaurant_review (
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  review_id INT AUTO_INCREMENT,
  review VARCHAR(500) NOT NULL,
  deliciousness_score INT,
  service_score INT,
  experience_score INT,
  pricing_score INT,
  pricing_value FLOAT,
  post_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  update_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (review_id),
  KEY (user_id),
  KEY (restaurant_id)
);

DROP TABLE IF EXISTS foody.review_image;
CREATE TABLE foody.review_image (
  review_id INT NOT NULL,
  image_id INT AUTO_INCREMENT,
  image_name VARCHAR(200),
  image_size VARCHAR(50),
  image_type VARCHAR(50),
  image_encoded LONGTEXT CHARACTER SET ascii COLLATE ascii_bin,
  post_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (image_id),
  KEY (review_id)
);