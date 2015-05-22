<?php
header('Content-Type: text/html; charset=utf-8');

	$dsn = 'mysql:host=localhost;dbname=instapi';
	$user = 'root';
	$password = 'root';

try {
    $db = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}

	if($resimler = $db ->query('SELECT * FROM resimler')){

	}else{
		echo 'Sorguda bir hata meydana geldi.';
		$error = $db->errorInfo();
		echo 'Hata mesajı: ' . $error[2];
	}

	$link = $_POST["link"];
	$query = $db->prepare('INSERT INTO resimler (link) VALUES(?)');
	

	$query->execute(array($link));

	echo $link . " sql e eklendi";

?>