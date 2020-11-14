<?php 
require_once('user.php');
session_start();

//require_once('model.php'); // model

$db = new PDO('mysql:host=localhost;dbname=id12472592_voclearn;charset=utf8', 'id12472592_voclearnuser', 'v0cL43rn');
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>Improve your vocabulary</title>
  <link rel="stylesheet" href="vocLearn.css">
  <script src="https://code.jquery.com/jquery-git.js"></script>
</head>
<body>


<?php

	if(! isset($_SESSION["user"])){ // user session not set
		if(isset($_POST["login"], $_POST["pwd"])){ // user is signing in
			$login = substr(htmlspecialchars($_POST["login"]),0,15); // max login size is 15 !
			$pwd = substr(htmlspecialchars($_POST["pwd"]),0,15); // max pwd size is 15 !
			$_SESSION["user"] = User::userConnection($login, $pwd);
		}else{
			$_SESSION["user"] = User::userVisitor();
		}
	}
	
	$user = $_SESSION["user"];
	
// MODEL

// Get the list of language supported with their code
$req = $db->prepare('SELECT ID, CODE, LANGUAGE FROM Language');
$req->execute();

$langList = []; // key is lang code => value is the language
while($lang = $req->fetch()){
	$langList[$lang["ID"]] = ["code" => $lang["CODE"], "language" => $lang["LANGUAGE"]];
}

// Get and shuffle the 20 words having the worse score 
$reqWords = $db->prepare('SELECT ID, '.$langList[$user->learntLang]["code"].', '.$langList[$user->masteredLang]["code"].' FROM Words w LEFT JOIN Answer a ON w.ID = a.WORD ORDER BY SCORE LIMIT 20');
$reqWords->execute();
$words = [];
while ($data = $reqWords->fetch()){
	$words[$data["ID"]]= ["learntLang" => $data[$langList[$user->learntLang]["code"]], "masteredLang" =>  $data[$langList[$user->masteredLang]["code"]], "score" => -1]; // -1 => no score otherwise score is between 0 and 1 
}
// END MODEL
?>

<div>
<label for="masterizedLang">Language masterized:</label>

<select name="masterizedLang" id="masterizedLang">
<?php 
	foreach($langList as $id => $lang){
		echo "<option value=\"".$lang["code"]."\"".($id == $user->masteredLang? " selected" : "").">".$lang["language"]."</option>";
	}
?>
  
</select> 

<br/>

<label for="learnedLang">Language to learn:</label>

<select name="learnedLang" id="learnedLang">
<?php 
	foreach($langList as $id => $lang){
		echo "<option value=\"".$lang["code"]."\"".($id == $user->learntLang? " selected" : "").">".$lang["language"]."</option>";
	}
?>
  
</select> 
</div>

<div><h1>Improve your vocabulary</h1></div>

<div>
<input type="text" id="login" name="login"/>
<br/>
<input type="password" id="pwd" name="pwd"/>
<br/>
<input type="submit" value="Connect"/>
</div>

<div>
<table> 
  <tr> 
	<td>Question Language</td> 
	<td rowspan=2><button id="switchLang"><=></button></td> 
	<td>Answer Language</td> 
  </tr> 
  <tr> 
	<td id="questLang"><?php echo ($user->reverseLangMode)? $langList[$user->learntLang]["language"] : $langList[$user->masteredLang]["language"];?></td>  
	<td id="answerLang"><?php echo ($user->reverseLangMode)? $langList[$user->masteredLang]["language"] : $langList[$user->learntLang]["language"];?></td> 
  </tr> 
</table>
</div>

<div>
<input type="range" id="difficulty" name="difficulty" min="0" max="3" step="1">
</div>

<div id="game">Game</div>
<div id="msg"></div>

    <p id="dbg"></p>
    <p id="disp"></p>
<script>
<?php
echo 'var words ='.json_encode($words).";\n";
?>
</script>
<script src="vocLearn.js"></script>
</body>
</html>