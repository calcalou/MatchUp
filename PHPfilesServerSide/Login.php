<?php
// Autorisations pour les requêtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Inclusion du fichier de configuration
include('config.php');

// Démarrer la session
session_start();

$response = array("success" => false, "message" => "An error occurred");

// Connexion à la base de données
$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Récupération des données de la requête
$requestData = json_decode(file_get_contents('php://input'), true);

// Fonction pour saler un mot de passe avec un sel personnalisé
function CryptPassword($Password, $saltHash) {
    $PasswordSalted = $Password . $saltHash;
    return hash('sha256', $PasswordSalted);
}

// Traitement de la requête POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($requestData["Email"]) && isset($requestData["Password"])) {
        $Email = $conn->real_escape_string($requestData["Email"]);
        $Password = $conn->real_escape_string($requestData["Password"]);

        // Cryptage du mot de passe
        $PasswordCrypted = CryptPassword($Password, $saltHash);

        // Requête préparée pour récupérer l'utilisateur avec cet email
        $stmt = $conn->prepare("SELECT * FROM `user` WHERE `Email` = ?");
        $stmt->bind_param("s", $Email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();

            // Vérification du mot de passe
            if ($PasswordCrypted == $row["Password"]) {
                // Connexion réussie, création de la session
                $_SESSION["Pseudo"] = $row["Pseudo"];
                $_SESSION["JourBorn"] = $row["JourBorn"];
                $_SESSION["MoisBorn"] = $row["MoisBorn"];
                $_SESSION["AnneeBorn"] = $row["AnneeBorn"];
                $_SESSION["Sexe"] = $row["Sexe"];
                $_SESSION["ID"] = $row["ID"];

                $response["success"] = true;
                $response["message"] = "Connexion réussie";               

                // Réponse de succès avec les données de l'utilisateur
                // $response = array(
                //     "success" => true,
                //     "message" => "Connexion réussie",
                //     "user" => array(
                //         "Pseudo" => $_SESSION["Pseudo"],
                //         "JourBorn" => $_SESSION["JourBorn"],
                //         "MoisBorn" => $_SESSION["MoisBorn"],
                //         "AnneeBorn" => $_SESSION["AnneeBorn"],
                //         "Sexe" => $_SESSION["Sexe"],
                //         "ID" =>  $_SESSION["ID"]
                //     )
                // );
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

// Envoi de la réponse JSON
header('Content-Type: application/json');
echo json_encode($response);

// Fermeture de la connexion à la base de données
$conn->close();
?>
