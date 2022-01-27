<?php 
include "php/services/UsersService.php";


class UsersController {
	
	private $usersService;

	public function __construct() {
		$this->usersService = new UsersService();
	}
	
	public function createNewUser($data) {
		$username = (string)$data->username;
		$email = (string)$data->emailaddress;
		$password = (string)$data->password;
		
		// echo "create new user called";
		$response['response'] = $this->usersService->validateNewUserData($username, $email, $password);

		// echo json_encode($response);
		return json_encode($response);
	}

	public function userLoginRequest($data) {
		$username = (string)$data->username;
		$password = (string)$data->password;

		$response['response'] = $this->usersService->validateUserLoginRequest($username, $password);
		return json_encode($response);
	}
    
}