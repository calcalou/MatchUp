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
    $response["message"] = "Connection failed: " . $conn->connect_error;
    echo json_encode($response);
    exit();
}

// Récupération des données de la requête
$requestData = json_decode(file_get_contents('php://input'), true);

// Traitement de la requête POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Assurez-vous que la session ID est définie
    if (isset($_SESSION["ID"])) {
        // Préparer la requête SQL pour récupérer les trophées
        $sql = "SELECT TrophyFoot, TrophyBasket, TrophyVolley, TrophyPadel, TrophyBadminton, TrophySquash FROM user WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $_SESSION["ID"]);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $trophies = $result->fetch_assoc();
            $_SESSION['trophies'] = $trophies;

            // Réponse de succès avec les trophées de l'utilisateur
            $response = array(
                "success" => true,
                "message" => "Connexion réussie",
                "user" => array(
                    "TrophyFoot" => $_SESSION['trophies']['TrophyFoot'],
                    "TrophyBasket" => $_SESSION['trophies']['TrophyBasket'],
                    "TrophyVolley" => $_SESSION['trophies']['TrophyVolley'],
                    "TrophyPadel" => $_SESSION['trophies']['TrophyPadel'],
                    "TrophyBadminton" => $_SESSION['trophies']['TrophyBadminton'],
                    "TrophySquash" => $_SESSION['trophies']['TrophySquash']
                )
            );
        } else {
            $response["message"] = "Aucun trophée trouvé pour cet utilisateur.";
        }
    } else {
        $response["message"] = "Session ID non définie.";
    }
}

// Envoi de la réponse JSON
header('Content-Type: application/json');
echo json_encode($response);

// Fermeture de la connexion à la base de données
$conn->close();
?>
