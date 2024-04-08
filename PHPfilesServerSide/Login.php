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
    if (isset($requestData["Email"]) && isset($requestData["Password"])) {
        $Email = $conn->real_escape_string($requestData["Email"]);
        $Password = $conn->real_escape_string($requestData["Password"]);

        // Cryptage du mot de passe
        $PasswordCrypted = CryptPassword($Password, $saltHash); 

        // Requête préparée pour éviter les injections SQL
        $stmt = $conn->prepare("SELECT * FROM `user` WHERE `Email` = ?");
        $stmt->bind_param("s", $Email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            if ($PasswordCrypted == $row["Password"]) {
                $response["success"] = true;
                $response["message"] = "Connexion réussie";
            } else {
                $response["message"] = 'Mot de passe incorrect';
            }
        } else {
            $response["message"] = "Utilisateur non trouvé";
        }
        $stmt->close();
    } else {
        $response["message"] = "Email ou mot de passe non fourni";
    }
} else {
    $response["message"] = "Invalid request method";
}

header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
