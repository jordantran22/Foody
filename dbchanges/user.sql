
/* Jordan Tran 9/17/21 - created user table */
CREATE TABLE user (
    user_id INT(6) AUTO_INCREMENT PRIMARY KEY,
    email_address VARCHAR(50) NOT NULL,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP );

/* Jordan Tran 11/17/21 - updated user table password to 256 characters, for password encryption*/
ALTER TABLE foody.user MODIFY password VARCHAR(255);