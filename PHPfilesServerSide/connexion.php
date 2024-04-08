<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include('config.php');

$response = array("success" => false, "message" => "An error occurred");

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$requestData = json_decode(file_get_contents('php://input'), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($requestData["username"]) && isset($requestData["password"])) {
        $username = $conn->real_escape_string($requestData["username"]);
        $password = $conn->real_escape_string($requestData["password"]);

        // Cryptage du mot de passe
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        //$query = "INSERT INTO user (Name, PWD) VALUES ('$username', '$password')";
        $query = "INSERT INTO `user`(`Name`, `Password`, `Pseudo`, `JourBorn`, `MoisBorn`, `AnneeBorn`, `Sexe`, `Email`) VALUES ('[value-2]','[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]')";

        if ($conn->query($query) === TRUE) {
            $response["success"] = true;
            $response["message"] = "Registration successful";
        } else {
            $response["message"] = "Error: " . $query . "<br>" . $conn->error;
        }
    } else {
        $response["message"] = "Username or password not provided";
    }
} else {
    $response["message"] = "Invalid request method";
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
