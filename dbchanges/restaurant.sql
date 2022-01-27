USE foody;

DROP TABLE IF EXISTS foody.restaurant;
CREATE TABLE foody.restaurant (
  restaurant_id INT AUTO_INCREMENT,
  restaurant_name VARCHAR(200),
  restaurant_address VARCHAR(200),
  restaurant_phone VARCHAR(200),
  restaurant_website VARCHAR(200),
  post_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (restaurant_id)
);