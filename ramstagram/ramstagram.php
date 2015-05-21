<html>
<head><title>RAMTAGRAM</title>
<link rel="stylesheet" type="text/css" href="style/style.css"/>   
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.6.3/jquery.min.js"></script>

<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script src="js/script.js" type="text/javascript"></script>

</head>

<body>

	<h1>RAMSTAGRAM</h1>
  
<form action="ramstagram.php" method="goal">
	<input id="yazilan" type="text" name="tag">

	<input type="submit" value="ara" />
</form>

<div>
	<h1>ARATILAN : <?php echo $_GET['tag']; ?></h1>
	<!-- instagram pics -->
	<div id="instagram"></div>
	<div class='clearfix'></div>
	<!-- button -->
	<div id="showMore">
		<div class='clearfix '><a id='more' next_url='"+next_url+"' href='#'>[Load More]</a></div>		
	</div>


</div>

</body>
</html>

