<?php

// class Config {
//     private $host = "localhost";
//     private $db_name = "foody";
//     private $username = "root";
//     private $password = "";
//     public $conn;

//     // get the database connection
// public function getConnection(){
//     $this->conn = null;
//     try{
//     $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" .          $this->db_name, $this->username, $this->password);
//     $this->conn->exec("set names utf8");
//     }
//     catch(PDOException $exception){
//     echo "Connection error: " . $exception->getMessage();
//     }
//     return $this->conn;
//      }
//     }
// }

class DBConnecter {
  private $servername="localhost";
  private $username="root";
  private $password="foody";
  public $connection = null;
  private $db="foody";


  public function __construct() {
    $this->getConnection();
  }

  public function getConnection() {
    // $conn = new mysqli($this->servername, $this->username, $this->password, $this->db);

    $conn = mysqli_connect($this->servername, $this->username, $this->password, $this->db);

      // Check connection
      if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
      }
      // echo "Connected successfully";
      $this->connection = $conn;
  }

  public function returnQuery($sql) {
    return mysqli_query($this->connection, $sql);
 }

 public function cleanSPResults() {
   // stored procedures return 2 result sets
   mysqli_next_result($this->connection);
 }

 public function cleanInput($string) {
   return mysqli_real_escape_string($this->connection, $string);
 }


}


// $servername = "localhost";
// $username = "root";
// $password = "";
// // $db = "foody";

// // Create connection
// $conn = new mysqli($servername, $username, $password);

// // Check connection
// if ($conn->connect_error) {
//   die("Connection failed: " . $conn->connect_error);
// }
// echo "Connected successfully";