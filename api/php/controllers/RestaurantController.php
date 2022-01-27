<?php

include_once "php/services/RestaurantService.php";

class RestaurantController {
    private $restaurantService;

    public function __construct() {
        $this->restaurantService = new RestaurantService();

    }

    public function saveRestaurant ($data) {
        $restaurantName = (string)$data->restaurantName;
        $restaurantPhone = (string)$data->restaurantPhone;
        $restaurantAddress = (string)$data->restaurantAddress;
        $restaurantWebsite = (string)$data->restaurantWebsite;

        $response['response'] = $this->restaurantService->saveRestaurant($restaurantName, $restaurantAddress, $restaurantPhone, $restaurantWebsite);

        return json_encode($response);
    }

    public function getRestaurantId ($data) {
        $restaurantName = (string)$data->restaurantName;
        $restaurantAddress = (string)$data->restaurantAddress;

        $response['response'] = $this->restaurantService->getRestaurantId($restaurantName, $restaurantAddress);

        return json_encode($response);
    }
}