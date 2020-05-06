<!DOCTYPE html>
<meta name="robots" content="noindex">
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
<style id="jsbin-css">
button{
  width: 120px;
  height: 120px;
}
</style>
</head>
<body>
<?php
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=id12472592_voclearn;charset=utf8', 'id12472592_voclearnuser', 'v0cL43rn');
	
	
	if(isset($_POST["addWords"]) && $_POST["addWords"] != ""){

		
		$ans = json_decode($_POST["addWords"], true);
		//echo json_decode($_POST["addWords"]);
		$fields = implode(",", array_keys($ans[0]));
		$keyFields = ":".implode(",:", array_keys($ans[0]));
		
		$req = $bdd->prepare('INSERT INTO Words('.$fields.') VALUES('.$keyFields.')');
		
		var_dump($ans);
		echo "<<".'INSERT INTO Words('.$fields.') VALUES('.$keyFields.')'.">>";
		
		foreach($ans as $word){
		    $req->execute($word);
		}
		
		echo 'Added';
	}
	// To Update
	$userID = 1;
	//
	$G_Lang = "fr";
	$L_Lang = "mn";
	if(isset($_POST["G_Lang"]))
	    $G_Lang = $_POST["G_Lang"];
	if(isset($_POST["L_Lang"]))
	    $L_Lang = $_POST["L_Lang"];
	
	if(isset($_POST["answerStats"],$_POST["settings"])){
	    $answerStats = json_decode($_POST["answerStats"],true);
	    
	    // insert update
		$req = $bdd->prepare('INSERT INTO Answers(USER, WORD, LANG, DATE) VALUES(:userID, :wordID, :Lang, NOW()) ON DUPLICATE KEY UPDATE TRUE_POS = VALUES(TRUE_POS) + :TP, TRUE_NEG = VALUES(TRUE_NEG) + :TN, FALSE_POS = VALUES(FALSE_POS) + :FP, FALSE_NEG = VALUES(FALSE_NEG) + :FN, SCORE_1 = :score, SCORE_2 = VALUES(SCORE_1), SCORE_3 = VALUES(SCORE_2), SCORE = :score*0.6+VALUES(SCORE_1)*0.4+VALUES(SCORE_2)*0.2, DATE = NOW()');
		
		foreach($answerStats as $wordID => $stat){
			$answer = ["userID" => $userID, "Lang" => $L_Lang, "wordID" => $wordID, "TP" => $stat[0],  "TN" => $stat[1], "FP" => $stat[2], "FN" => $stat[3], "score" => $stat[4]];
		    $req->execute($answer);
		}
	}

	$req = $bdd->prepare('SELECT CODE, LANGUAGE FROM Language');
	$req->execute();
	
	$LangList = [];
    while ($lang = $req->fetch())
        $LangList[$lang["CODE"]] = $lang["LANGUAGE"];

// join Answer
	$reqWords = $bdd->prepare('SELECT ID, '.$L_Lang.', '.$G_Lang.' FROM Words w LEFT JOIN Answer a ON w.ID = a.WORD ORDER BY SCORE LIMIT 20'); // RAND() INNER JOIN
	$reqWords->execute();
	
	$arr = [];
	$wordList = [];
	
	?>
	
<form action="/vocLearn.php" method="post">

 <label for="G_Lang">Language of the game:</label>

<select name="G_Lang" id="G_Lang">
<?php 
	
	foreach($LangList as $code => $language){
		echo "<option value=\"".$code."\"".($code == $G_Lang? " selected" : "").">".$language."</option>";
	}
?>
  
</select> 

<br/>

 <label for="L_Lang">Language to learn:</label>

<select name="L_Lang" id="L_Lang">
<?php 
	foreach($LangList as $code => $language){
		echo "<option value=\"".$code."\"".($code == $L_Lang? " selected" : "").">".$language."</option>";

	}
?>
  
</select> 

		<textarea id="addWords" name="addWords"></textarea>
		<input type="submit" value="Submit">
	</form>


  <h1 id="ans"></h1>
  <table>
    <tr>
  <td colspan="2" id="quest"></td>
  </tr>
  <tr>
  <td><button id="but_0"></button></td>
  <td><button id="but_1"></button></td>
  </tr>
  <tr>
  <td><button id="but_2"></button></td>
  <td><button id="but_3"></button></td>
  </tr>
    
    <p id="dbg"></p>
    <p id="disp"></p>
</table>
<script src="https://code.jquery.com/jquery-git.js"></script>
<script id="jsbin-javascript">

<?php
	
	
	while ($data = $reqWords->fetch())
	{
		$arr[]= [$data[$L_Lang],$data[$G_Lang],$data["ID"]];
		$wordList[] = $data["ID"];
		$answerStats[$data["ID"]] = [0,0,0,0,-1];
	}

	echo 'var wordList ='.json_encode($arr).";";
	echo 'var answerStats ='.json_encode($answerStats).";";
	
	/*
	echo "\n";
	var_dump($arr);
	var_dump($wordList);
	echo "\n";
	*/

?>

var words = {};
var arr_mcq;
var idx;
// answer always the last
//var mcq = { "choices" : ["эу", "дарс", "сүү", "шар айраг"], "quest" : "Bière"};

function generateMCQ(wordList){
  var idx = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
  MCQ_Number++;
  
  arr_mcq = mcqIdxLst_rand(idx);

  //$("#dbg").text($("#dbg").text()+r.choices+"\n");
  return { "choices": [wordList[arr_mcq[0]][0], wordList[arr_mcq[1]][0], wordList[arr_mcq[2]][0], wordList[arr_mcq[3]][0]], "quest" : wordList[arr_mcq[0]][1]};
}


function mcqIdxLst_rand(wordLists_idx){
  arr_mcq = [];
  for(var i=0;i<4;++i){
    
    var id = Math.floor(Math.random()*(wordLists_idx.length-i));
    arr_mcq.push(wordLists_idx[id]);
    wordLists_idx.splice(id, 1);
    //$("#dbg").text($("#dbg").text()+wordLists_idx+" : "+arr_mcq+"\n");
  }
  
  return arr_mcq;
}

var MCQ_Number = 0;

var mcq = generateMCQ(wordList);

function displayMCQ(){
  var sortIdx = [[0,1,2,3],
[0,1,3,2],
[0,2,1,3],
[0,2,3,1],
[0,3,1,2],
[0,3,2,1],
[1,0,2,3],
[1,0,3,2],
[2,0,1,3],
[2,0,3,1],
[3,0,1,2],
[3,0,2,1],
[1,2,0,3],
[1,3,0,2],
[2,1,0,3],
[2,3,0,1],
[3,1,0,2],
[3,2,0,1],
[1,2,3,0],
[1,3,2,0],
[2,1,3,0],
[2,3,1,0],
[3,1,2,0],
[3,2,1,0]];


var shuffle = Math.floor(Math.random()*24);
idx = sortIdx[shuffle];
for(var i=0;i<4;++i){
  var but_ans = "#but_" + idx[i];
  $(but_ans).text(mcq.choices.pop());
}
$("#ans").text(mcq.quest);
mcq.ans = "but_"+idx[3];
}

displayMCQ();


$( "button" ).click(function() {
  //$( "#target" ).click();
  var clk = 3-idx.indexOf(Number(this.id.slice(-1)));
  if(this.id==mcq.ans){
    $("#dbg").text("Good");
    for(var i=0;i<4;++i)
      if(i==clk)
	      answerStats[wordList[arr_mcq[i]][2]][0]++;
	   else
    setTimeout(function(){$("#dbg").text("");
                         mcq = generateMCQ(wordList);
                         displayMCQ();
                         $("#dbg").text($("#dbg").text()+arr_mcq+" "+idx + "\n");
                          // send arr_mcq OK + ID // TP TN FP FN
                         }, 1000);
  }else{
    // arr_mcq[clk] => FP, arr_mcq[0] => FN, others TN
    $("#dbg").text("wrong " + idx+ " " +idx.indexOf(3)+" "+arr_mcq[clk]+ " " + wordList[arr_mcq[clk]]);
	answerStats[wordList[arr_mcq[clk]][2]][2]++; //TODO
  // send arr_mcq OK + ID // FN

  }
});

/*
// Send the data using post
  var posting = $.post( url, { s: term } );
 
  // Put the results in a div
  posting.done(function( data ) {
    var content = $( data ).find( "#content" );
    $( "#result" ).empty().append( content );
  });
*/

</script>

<?php
	$wordList = pack("S*",...$wordList);

	$req = $bdd->prepare('INSERT INTO MCQ(DATETIME, USER, WORD_LIST) VALUES(NOW(), :userID, :wordList)');
	$req->execute(["userID" => $userID, "wordList"=> $wordList]);
	
	$id = $bdd->lastInsertId();
	
	echo $id;
	
	$req = $bdd->prepare('SELECT WORD_LIST FROM MCQ WHERE ID=:ID ');
	$req->execute(["ID"=>$id]);
	$data = $req->fetch();
	$arr = unpack("S*", $data["WORD_LIST"]);

	
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}


?>

</body>
</html>
