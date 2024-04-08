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

// Fonction pour saler un mot de passe avec un sel personnalisé
function CryptPassword($Password, $saltHash) {
    // On combine le mot de passe avec le sel
    $PasswordSalted = $Password . $saltHash;

    $PasswordHashed = hash('sha256', $PasswordSalted);
    return $PasswordHashed;
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($requestData["Password"]) && isset($requestData["Pseudo"]) && isset($requestData["Day"]) && isset($requestData["Month"]) && isset($requestData["Year"]) && isset($requestData["Gender"]) && isset($requestData["Email"])) {
        $Password = $conn->real_escape_string($requestData["Password"]);
        $Pseudo = $conn->real_escape_string($requestData["Pseudo"]);
        $Day = $conn->real_escape_string($requestData["Day"]);
        $Month = $conn->real_escape_string($requestData["Month"]);
        $Year = $conn->real_escape_string($requestData["Year"]);
        $Gender = $conn->real_escape_string($requestData["Gender"]);
        $Email = $conn->real_escape_string($requestData["Email"]);


        // Cryptage du mot de passe
        $PasswordCrypted = CryptPassword($Password, $saltHash);


        //$query = "INSERT INTO user (Name, PWD) VALUES ('$username', '$password')";
        $query = "INSERT INTO `user`(`Password`, `Pseudo`, `JourBorn`, `MoisBorn`, `AnneeBorn`, `Sexe`, `Email`) VALUES ('$PasswordCrypted','$Pseudo','$Day','$Month','$Year','$Gender','$Email')";

        if ($conn->query($query) === TRUE) {
            $response["success"] = true;
            $response["message"] = "Inscription réussie";
        } else {
            $response["message"] = "Error: " . $query . "<br>" . $conn->error;
        }
    } else {
        $response["message"] = "Nom d'utilisateur ou mot de passe non fourni";
    }
} else {
    $response["message"] = "Invalid request method";
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
