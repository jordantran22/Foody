<?php

include_once "php/config.php";

class RestaurantDbGateway {

    private $dbConnection = null;

    public function __construct() {
        $this->dbConnection = new DbConnecter();
    }

    public function getRestaurant (string $restaurantName, string $restaurantAddress) {
        $restaurantName = $this->dbConnection->cleanInput($restaurantName);
        $restaurantAddress = $this->dbConnection->cleanInput($restaurantAddress);

        $sql = "SELECT restaurant_id,
                    restaurant_name,
                    restaurant_address,
                    restaurant_phone,
                    restaurant_website
                FROM foody.restaurant
                WHERE
                    restaurant_name = '$restaurantName' AND
                    restaurant_address = '$restaurantAddress';";

        $result = $this->dbConnection->returnQuery($sql);
        $output = [];

        if (mysqli_num_rows($result) > 0) {
            while($row = mysqli_fetch_assoc($result)) {
                array_push($output, $row);
            }
        }

        return $output;
    }

    public function getRestaurantId (string $restaurantName, string $restaurantAddress) {
        $restaurantName = $this->dbConnection->cleanInput($restaurantName);
        $restaurantAddress = $this->dbConnection->cleanInput($restaurantAddress);

        $sql = "SELECT restaurant_id
                FROM foody.restaurant
                WHERE
                    restaurant_name = '$restaurantName' AND
                    restaurant_address = '$restaurantAddress';";

        $result = $this->dbConnection->returnQuery($sql);
        $output = [];

        if (mysqli_num_rows($result) > 0) {
         while($row = mysqli_fetch_assoc($result)) {
             $output['restaurantId'] = $row["restaurant_id"];
         }
       }

      return $output;
    }

    public function saveRestaurant (string $restaurantName, string $restaurantAddress, string $restaurantPhone, string $restaurantWebsite) {
        $restaurantName = $this->dbConnection->cleanInput($restaurantName);
        $restaurantAddress = $this->dbConnection->cleanInput($restaurantAddress);
        $restaurantPhone = $this->dbConnection->cleanInput($restaurantPhone);
        $restaurantWebsite = $this->dbConnection->cleanInput($restaurantWebsite);

        $sql = "INSERT INTO foody.restaurant (
                    restaurant_name,
                    restaurant_address,
                    restaurant_phone,
                    restaurant_website
                )
                SELECT
                    restaurant_name,
                    restaurant_address,
                    restaurant_phone,
                    restaurant_website
                FROM (
                    SELECT 
                    '$restaurantName' AS restaurant_name,
                    '$restaurantAddress' AS restaurant_address,
                    '$restaurantPhone' AS restaurant_phone,
                    '$restaurantWebsite' AS restaurant_website) AS tmp
                WHERE NOT EXISTS (
                    SELECT
                        1
                    FROM foody.restaurant
                    WHERE restaurant_name = '$restaurantName' AND
                    restaurant_address = '$restaurantAddress');";

        $this->dbConnection->returnQuery($sql);
    }
}
