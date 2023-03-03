<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylegl.css">
    <title>Baza obrazów</title>
</head>
<body>
    <section class="container">
       <h1>PO PROSTU RYSUJ!<h1>
  <label>podaj nazwe obrazu</label><br>
  <form method="post"><input type="text" id="lname" name="lname"><input type="submit" name="but1" value="Stwórz nowy obraz"><br>
</form>
        
		<?php  

		$json_data=file_get_contents("listarys.json");
		
	$json=json_decode($json_data,true);
	$obrazcl="";

if(isset($_POST['but1'])) {
 $newob=$_POST['lname'];
 
 
if(!empty($newob)){
$t=0;
foreach($json as $rys){
if($rys['nazwa']==$newob)
{
	$t=1;
	break;
}
}

	if($t==0){
		$json[]['nazwa']=$newob;
     $endobra=json_encode($obrazcl);

file_put_contents("bibliotek/".$newob.".json",$encoded);	 
}}
else
{$error = "Użyta nazwa już istnieje";
echo $error;

}
var_dump($error);
  header('location: glowna.php');
}


$encoded=json_encode($json);
file_put_contents('listarys.json',$encoded);
	
	
		if(count($json)!=0)
		{
		
		foreach($json as $rys){
		$i=$rys['nazwa']?>
		<a class="btn" href="http://localhost/canvas/new%201.html?n=<?php echo  $i?>">
		<button type="button" ><?php echo $rys['nazwa'] ?></button>
		</a>
		<br>
		
		<?php } }?>
	
	
    </section>
    <script src="./sendname.js"></script>
</body>
</html>