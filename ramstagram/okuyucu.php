<?php
 	$database = "";
    $host = "localhost";
    $dbuser = "";
    $dbpass = "";
    $baglan = @mysql_connect($host,$dbuser,$dbpass);
    if(! $baglan) die ("Mysql Baglantisi Yapilamadi");
    @mysql_select_db($database,$baglan) or die ("Veri Tabanina Baglanti Yapilamadi");
		$sql = mysql_query("SELECT id,link FROM resimler"); 
		while($row=mysql_fetch_assoc($sql)) 
		{ 
		     echo $row['id'].'-'.$row['link'].'<br />'; 
		}  


?>
