<?php


include_once "php/Dbgateways/ReviewDbGateway.php";
include_once "php/services/RestaurantService.php";
include_once "php/services/UsersService.php";

class ReviewService {
    private $reviewDbGateway;
    private $restaurantService;
    private $usersService;

    public function __construct() {
        $this->reviewDbGateway = new ReviewDbGateway();
        $this->restaurantService = new RestaurantService();
        $this->usersService = new UsersService();
    }

    public function validateReview(int $userId, int $restaurantId) {
        $reviewId = $this->reviewDbGateway->getReviewId($userId, $restaurantId);
        if (empty($reviewId)) {
            return "Review not found";
        }
        else {
            return "Review found";
        }
    }

    public function processReview (array $restaurantData, array $reviewData, array $images) {
        $restaurantExists = $this->restaurantService->validateRestaurant($restaurantData['name'], $restaurantData['address']);
        if ($restaurantExists == "Restaurant not found") {
            $this->restaurantService->saveRestaurant($restaurantData['name'], $restaurantData['address'], $restaurantData['phone'], $restaurantData['website']);
        }
        $restaurantId = $this->restaurantService->getRestaurantId($restaurantData['name'], $restaurantData['address'])['restaurantId'];

        $userId = $this->usersService->getUserId($reviewData['username']);

        $checkReview = $this->validateReview($userId, $restaurantId);

        if ($checkReview == "Review not found") {
            $this->reviewDbGateway->saveReview($userId, $restaurantId, $reviewData['textReview'], $reviewData['deliciousnessScore'], $reviewData['serviceScore'], $reviewData['experienceScore'], $reviewData['pricingScore'], $reviewData['pricingValue']);
            $result = "Review saved";
        }
        else {
            $this->reviewDbGateway->updateReview($userId, $restaurantId, $reviewData['textReview'], $reviewData['deliciousnessScore'], $reviewData['serviceScore'], $reviewData['experienceScore'], $reviewData['pricingScore'], $reviewData['pricingValue']);
            $result = "Review updated";
        }

        $reviewId = $this->getReviewId($userId, $restaurantId);

        $this->saveReviewImages($reviewId, $images);

        // TODO: retrieve review id, save images (sprint 3)
        return $result;
    }

    public function getReviewId(int $userId, int $restaurantId) {
        $reviewId = $this->reviewDbGateway->getReviewId($userId, $restaurantId);

        if (empty($reviewId)) {
            return "No review found";
        }
        else {
            return $reviewId;
        }
    }

    public function saveReviewImages (int $reviewId, array $images) {
        if (!empty($images)) {
            foreach ($images as $image) {
                $this->reviewDbGateway->saveReviewImage($reviewId, $image->name, $image->size, $image->type, $image->base64);
            }
        }
    }

    public function getReviewImage (int $reviewId) {
        $images = $this->reviewDbGateway->getReviewImage($reviewId);
        if (empty($images)) {
            return "No images for this review";
        }
        else {
            return $images;
        }
    }

    public function getRestaurantReviews($restaurantName, $restaurantAddress) {
        $restaurantId = $this->restaurantService->getRestaurantId($restaurantName, $restaurantAddress);

        // $session = Session::getInstance();
        // echo $session->__get('username');

        // this should really check if restaurant is null or not
        #TODO: refactoring getRestaurantId method in restaurantService
        if(empty($restaurantId)) {
            return "No Reviews For This Restaurant!";
        }

        $reviews = $this->reviewDbGateway->getRestaurantReviews($restaurantId['restaurantId']);
        return $reviews;
    }

    public function updateReviewLikes($username, $reviewId) {
        // $userIdArray = $this->usersService->getUserId($username);
        // $userId = $userIdArray['userId'];

        $userId = $this->usersService->getUserId($username);
        $didUserLikeThisReviewAlready = $this->reviewDbGateway->getUserLikedReview($userId, $reviewId);
        //print_r($didUserLikeThisReviewAlready);

        if(empty($didUserLikeThisReviewAlready)) {
            $this->reviewDbGateway->insertNewUserLike($userId, $reviewId);
        } 
        
        if($didUserLikeThisReviewAlready[0]['is_liked'] == "yes") {
            $this->reviewDbGateway->unlikeUserReview($userId, $reviewId);
        } else {
            $this->reviewDbGateway->likeUserReview($userId, $reviewId);
        }

        return $this->reviewDbGateway->getReviewLikes($reviewId);
    }

    public function getReviewLikes($reviewId) {
        return $this->reviewDbGateway->getReviewLikes($reviewId);
    }

    public function getRestaurantRatings($restaurantName, $restaurantAddress) {
        $restaurantId = $this->restaurantService->getRestaurantId($restaurantName, $restaurantAddress);

        if(empty($restaurantId)) {
            return "No Reviews For This Restaurant!";
        }

        $restaurantRatings = $this->reviewDbGateway->getRestaurantRatings($restaurantId['restaurantId']);
        return $restaurantRatings;
    }

    public function getRestaurantsByCategoryHighest($category) {
        $restaurantsByCategoryHighest = $this->reviewDbGateway->getRestaurantsByCategoryHighest($category);

        if(empty($restaurantsByCategoryHighest)) {
            return 'No Reviews Currently!';
        }

        return $restaurantsByCategoryHighest;
    }

    public function getRestaurantsByCategoryLowest($category) {
        $restaurantsByCategoryLowest = $this->reviewDbGateway->getRestaurantsByCategoryLowest($category);

        if(empty($restaurantsByCategoryLowest)) {
            return 'No Reviews Currently!';
        }

        return $restaurantsByCategoryLowest;
    }

    public function deleteUserReview($reviewId) {
        return $this->reviewDbGateway->deleteUserReview($reviewId);
    }
}