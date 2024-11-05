<?php
// Autorisations pour les requêtes CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Inclusion du fichier de configuration
include('config.php');

try {
    // Connexion à la base de données
    $pdo = new PDO("mysql:host=$servername;dbname=$database;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupérer toutes les équipes
    $equipes = $pdo->query("SELECT ID FROM equipe")->fetchAll(PDO::FETCH_ASSOC);

    foreach ($equipes as $equipe) {
        $idEquipe = $equipe['ID'];

        // Compter les joueurs pour chaque équipe
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM user WHERE IDequipe = :idEquipe");
        $stmt->execute(['idEquipe' => $idEquipe]);
        $nbJoueurs = $stmt->fetchColumn();

        // Mettre à jour NbJoueurs dans la table equipe
        $update = $pdo->prepare("UPDATE equipe SET NbJoueurs = :nbJoueurs WHERE ID = :idEquipe");
        $update->execute(['nbJoueurs' => $nbJoueurs, 'idEquipe' => $idEquipe]);
    }

    // Retourner une réponse JSON de succès
    header('Content-Type: application/json');
    echo json_encode(['success' => true, 'message' => 'Mise à jour des nombres de joueurs réussie.']);
} catch (PDOException $e) {
    // En cas d'erreur, retourner une réponse JSON d'erreur
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => 'Erreur de connexion : ' . $e->getMessage()]);
}
?>
