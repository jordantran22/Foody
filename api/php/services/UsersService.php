<?php

include "php/DBgateways/UsersDbGateway.php";

class UsersService {

	private $usersDbGateway;


	public function __construct() {
		$this->usersDbGateway = new UsersDbGateway();
		// echo "service obj created";
	}

	public function validateNewUserData(string $username, string $email, string $password){
		$isUsernameValid = $this->usersDbGateway->checkIfUsernameIsValid($username);

		if(empty($isUsernameValid)){
			$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
			$this->usersDbGateway->registerNewUser($username, $email, $hashedPassword);
			return "Valid username, account created";
		} else {
			return "Username is already in use with another account. Try a different username!";
		}
	}

	public function validateUserLoginRequest($username, $password) {
		$loginInformation = $this->usersDbGateway->getUserLoginInformation($username);

		if(!empty($loginInformation) && password_verify($password, $loginInformation['password'])){
		//	session_start();
			//$session = Session::getInstance();
			//$session->__set('username', $username);
			//echo $session->__get('username');
			
			
			// session_set_cookie_params(0);
			// session_start();
			// $_SESSION['username'] = $username;

			// echo $_SESSION['username'];

			//echo JWT::encode($token, 'secret_server_key');

			
			return "User logged in";
		} else {
			return "Invalid username or password! Please try again.";
		}

	}

	public function getUserId (string $username) {
		$userId = $this->usersDbGateway->getUserId($username);

		if (empty($userId['userId'])) {
			return "No user id found for '$username'";
		}
		else {
			return $userId['userId'];
		}
	}

}