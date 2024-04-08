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
    if (isset($requestData["Email"])) {
        $Email = $conn->real_escape_string($requestData["Email"]);

        // Requête préparée pour éviter les injections SQL
        $stmt = $conn->prepare("SELECT * FROM `user` WHERE `Email` = ?");
        $stmt->bind_param("s", $Email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $response["success"] = false;
            $response["message"] = "L'email existe déjà";
        } else {
            $response["success"] = true;
            $response["message"] = "L'e-mail n'existe pas";
        }        
        $stmt->close();
    } else {
        $response["message"] = "Email non fourni";
    }
} else {
    $response["message"] = "Invalid request method";
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
