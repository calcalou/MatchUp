<?php
// Autorisations pour les requêtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Inclusion du fichier de configuration
include('config.php');
$conn = new mysqli($servername, $username, $password, $database);

session_start();

$response = array("success" => false, "message" => "Une erreur est survenue.");

// Check if the session variable is set
if (isset($_SESSION["IDEquipe"])) {
    $teamID = $_SESSION["IDEquipe"];
    
    // Check connection
    if ($conn->connect_error) {
        $response["message"] = "Erreur de connexion à la base de données.";
    } else {
        // Prepare the SQL statement to prevent SQL injection
        $stmt = $conn->prepare("SELECT * FROM equipe WHERE ID = ?");
        $stmt->bind_param("i", $teamID); // assuming ID is an integer
        
        if ($stmt->execute()) {
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $row = $result->fetch_assoc();
                
                // Format the response data
                $response = array(
                    "success" => true,
                    "message" => "Connexion réussie",
                    "user" => array(
                        "ID" => $row["ID"],
                        "Nom" => $row["Nom"],
                        "NbJoueurs" => $row["NbJoueurs"],
                        "Points" => $row["Points"],
                        // Add other fields here as needed
                    )
                );
            } else {
                $response["message"] = "Aucune équipe trouvée avec cet ID.";
            }
        } else {
            $response["message"] = "Échec de l'exécution de la requête.";
        }
        
        $stmt->close();
    }
    
    $conn->close();
} else {
    $response["message"] = "ID de l'équipe non spécifié dans la session.";
}


// Return the JSON response
header('Content-Type: application/json');
echo json_encode($response);
$conn->close();
?>
