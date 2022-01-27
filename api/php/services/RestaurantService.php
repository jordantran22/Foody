<?php

include_once "php/Dbgateways/RestaurantDbGateway.php";

class RestaurantService {
    private $restaurantDbGateway;

    public function __construct() {
        $this->restaurantDbGateway = new RestaurantDbGateway();
    }

    public function validateRestaurant (string $restaurantName, string $restaurantAddress) {

        $restaurantId = $this->restaurantDbGateway->getRestaurantId($restaurantName, $restaurantAddress);
        if (empty($restaurantId)) {
            return "Restaurant not found";
        }
        else {
            return "Restaurant found";
        }
    }

    public function saveRestaurant (string $restaurantName, string $restaurantAddress, string $restaurantPhone, string $restaurantWebsite) {
        $checkRestaurant = $this->validateRestaurant($restaurantName, $restaurantAddress);

        if ($checkRestaurant == "Restaurant not found") {
            $this->restaurantDbGateway->saveRestaurant($restaurantName, $restaurantAddress, $restaurantPhone, $restaurantWebsite);
            return "Restaurant saved";
        }
        else {
            return $checkRestaurant;
        }
    }

    public function getRestaurantId (string $restaurantName, string $restaurantAddress) {
        $restaurantId = 0;
        $result = $this->validateRestaurant($restaurantName, $restaurantAddress);


        if ($result == "Restaurant found") {
            $restaurantId = $this->restaurantDbGateway->getRestaurantId($restaurantName, $restaurantAddress);

        }

        return $restaurantId;
    }

    public function getRestaurant (string $restaurantName, string $restaurantAddress) {
        $result = $this->validateRestaurant($restaurantName, $restaurantAddress);

        if ($result == "Restaurant found") {
            $restaurant = $this->restaurantDbGateway->getRestaurant($restaurantName, $restaurantAddress);

            return $restaurant;
        }
    }


}



