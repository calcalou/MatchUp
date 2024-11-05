<?php
session_start();

// Autorisations pour les requêtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Inclusion du fichier de configuration de la base de données
include('config.php');

// Vérifier que la session contient un IDequipe
if (!isset($_SESSION["IDEquipe"])) {
    echo json_encode(['success' => false, 'message' => 'Aucun ID d\'équipe trouvé dans la session']);
    exit();
}

$idEquipe = $_SESSION["IDEquipe"];

try {
    // Connexion à la base de données
    $pdo = new PDO("mysql:host=$servername;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer tous les membres de l'équipe spécifiée
    $stmt = $pdo->prepare("SELECT ID, Pseudo FROM user WHERE IDequipe = :idEquipe");
    $stmt->execute(['idEquipe' => $idEquipe]);
    $members = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retourner les membres sous format JSON
    echo json_encode(['success' => true, 'members' => $members]);
} catch (PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion : ' . $e->getMessage()]);
}
?>
