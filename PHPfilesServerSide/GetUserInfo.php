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

// Traitement de la requête POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Réponse de succès avec les données de l'utilisateur
    $response = array(
        "success" => true,
        "message" => "Connexion réussie",
        "user" => array(
            "Pseudo" => $_SESSION["Pseudo"],
            "JourBorn" => $_SESSION["JourBorn"],
            "MoisBorn" => $_SESSION["MoisBorn"],
            "AnneeBorn" => $_SESSION["AnneeBorn"],
            "Sexe" => $_SESSION["Sexe"],
            "ID" =>  $_SESSION["ID"]
        )
    );
}

// Envoi de la réponse JSON
header('Content-Type: application/json');
echo json_encode($response);

// Fermeture de la connexion à la base de données
$conn->close();
?>
