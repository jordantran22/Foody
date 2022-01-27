<?php

include_once "php/services/ReviewService.php";
include_once "php/services/RestaurantService.php";

class ReviewController {
    private $reviewService;

    public function __construct() {
        $this->reviewService = new ReviewService();

    }

    public function saveUserReview ($data) {
        $restaurantData = array(
            'name' => (string)$data->restaurantName,
            'phone' => (string)$data->restaurantPhone,
            'address' => (string)$data->restaurantAddress,
            'website' => (string)$data->restaurantWebsite
        );
        $reviewData = array(
            'username' => (string)$data->username,
            'textReview' => (string)$data->textReview,
            'deliciousnessScore' => (int)$data->deliciousnessScore,
            'serviceScore' => (int)$data->serviceScore,
            'experienceScore' => (int)$data->experienceScore,
            'pricingScore' => (int)$data->pricingScore,
            'pricingValue' => (float)$data->pricingValue
        );
        $images = (array)$data->images;

        $response['response'] = $this->reviewService->processReview($restaurantData, $reviewData, $images);

        return json_encode($response);
    }

    public function getReviewImage () {
        $reviewId = $_GET['reviewId'];
        $response['response'] = $this->reviewService->getReviewImage($reviewId);

        return json_encode($response);
    }

    public function getRestaurantReviews() {
        $restaurantName = $_GET['restaurantName'];
		$restaurantAddress = $_GET['restaurantAddress'];

        $response['response'] = $this->reviewService->getRestaurantReviews($restaurantName, $restaurantAddress);


		// echo json_encode($response);
		return json_encode($response);

    }

    public function updateReviewLikes($data) {
        $username = $data->username;
        $reviewId = $data->reviewId;

        $response['response'] = $this->reviewService->updateReviewLikes($username, $reviewId);

        return json_encode($response);
    }

    public function getReviewLikes() {
        $reviewId = $_GET['reviewId'];
        $response['response'] = $this->reviewService->getReviewLikes($reviewId);

        return json_encode($response);
    }

    public function getRestaurantRatings() {
        $restaurantName = $_GET['restaurantName'];
		$restaurantAddress = $_GET['restaurantAddress'];

        $response['response'] = $this->reviewService->getRestaurantRatings($restaurantName, $restaurantAddress);

		return json_encode($response);
    }

    public function getRestaurantsByCategoryHighest() {
        $category = $_GET['category'];

        $response['response'] = $this->reviewService->getRestaurantsByCategoryHighest($category);
		return json_encode($response);
    }

    public function getRestaurantsByCategoryLowest() {
        $category = $_GET['category'];

        $response['response'] = $this->reviewService->getRestaurantsByCategoryLowest($category);
		return json_encode($response);
    }

    public function deleteUserReview($data) {
        $reviewId = $data->reviewId;
        $username = $data->username;

        $response['response'] = $this->reviewService->deleteUserReview($reviewId);
        return json_encode($response); 
    }

}