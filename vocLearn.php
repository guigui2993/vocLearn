<!DOCTYPE html>
<meta name="robots" content="noindex">
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
<style id="jsbin-css">
button.MCQ{
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
	$M_Lang = 1; //"fr";
	$L_Lang = 3; //"mn";

	if(isset($_POST["M_Lang"]))
	    $M_Lang = $_POST["M_Lang"];
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

	$req = $bdd->prepare('SELECT ID, CODE, LANGUAGE FROM Language');
	$req->execute();
	
	$LangList = [];
	$LangCodeList = [];
    while ($lang = $req->fetch()){
		$LangList[$lang["ID"]] = $lang["LANGUAGE"];
		$LangCodeList[$lang["ID"]] = $lang["CODE"];
	}

// join Answer
	$reqWords = $bdd->prepare('SELECT ID, '.$LangCodeList[$L_Lang].', '.$LangCodeList[$M_Lang].' FROM Words w LEFT JOIN Answer a ON w.ID = a.WORD ORDER BY SCORE LIMIT 20'); // RAND() INNER JOIN
	$reqWords->execute();

	$arr = [];
	$wordList = [];
	
	?>
	
<form action="/vocLearn.php" method="post">

 <label for="M_Lang">Language masterized:</label>

<select name="M_Lang" id="M_Lang">
<?php 
	
	foreach($LangList as $code => $language){
		echo "<option value=\"".$code."\"".($language == $M_Lang? " selected" : "").">".$language."</option>";
	}
?>
  
</select> 

<br/>

 <label for="L_Lang">Language to learn:</label>

<select name="L_Lang" id="L_Lang">
<?php 
	foreach($LangList as $code => $language){
		echo "<option value=\"".$code."\"".($language == $L_Lang? " selected" : "").">".$language."</option>";

	}
?>
  
</select> 

		<textarea id="addWords" name="addWords"></textarea>
		<input type="submit" value="Submit">
	</form>
  <table>
  <tr>
	<td>Question Language</td>
	<td><button id="switchLang"><=></button></td>
	<td>Choices Language</td>
  </tr>
  <tr>
	<td id="questLang"><?php echo $LangList[$M_Lang];?></td>
	<td></td>
	<td id="choicesLang"><?php echo $LangList[$L_Lang];?></td>
  </tr>
    
    <p id="dbg"></p>
    <p id="disp"></p>
</table>

  <h1 id="ans"></h1>
  <table>
    <tr>
  <td colspan="2" id="quest"></td>
  </tr>
  <tr>
  <td><button id="but_0" class="MCQ"></button></td>
  <td><button id="but_1" class="MCQ"></button></td>
  </tr>
  <tr>
  <td><button id="but_2" class="MCQ"></button></td>
  <td><button id="but_3" class="MCQ"></button></td>
  </tr>
    
    <p id="dbg"></p>
    <p id="disp"></p>
</table>
<script src="https://code.jquery.com/jquery-git.js"></script>
<script id="jsbin-javascript">

<?php
	
	
	while ($data = $reqWords->fetch())
	{
		$arr[]= [$data[$LangCodeList[$L_Lang]],$data[$LangCodeList[$M_Lang]],$data["ID"]];
		$wordList[] = $data["ID"];
		$answerStats[$data["ID"]] = [0,0,0,0,-1,-1];
	}

	echo 'var wordList ='.json_encode($arr).";";
	echo 'var answerStats ='.json_encode($answerStats).";";
	echo 'var Learn_Lang = "'.$L_Lang.'";';
	
	/*
	echo "\n";
	var_dump($arr);
	var_dump($wordList);
	echo "\n";
	*/

?>

var words = {};
var arr_mcq;
var idx_words = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19];
// answer always the last
//var mcq = { "choices" : ["эу", "дарс", "сүү", "шар айраг"], "quest" : "Bière"};

function generateMCQ(wordList){
  
  MCQ_Number++;
  
  arr_mcq = mcqIdxLst_rand(idx_words);

  //$("#dbg").text($("#dbg").text()+r.choices+"\n");
  return { "choices": [wordList[arr_mcq[0]][0], wordList[arr_mcq[1]][0], wordList[arr_mcq[2]][0], wordList[arr_mcq[3]][0]], "quest" : wordList[arr_mcq[0]][1]};
}


function mcqIdxLst_rand(wordLists_idx_cst){
	var wordLists_idx = wordLists_idx_cst.slice();
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
var idx_mcq;

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
idx_mcq = sortIdx[shuffle];
for(var i=0;i<4;++i){
  var but_ans = "#but_" + idx_mcq[i];
  $(but_ans).text(mcq.choices.pop()); // but_idx[0] = choices[3], ... , but_idx[3] = choices[0] = ans
}
$("#ans").text(mcq.quest);
mcq.ans = "but_"+idx_mcq[3];
}

var gameNumber = 0;
displayMCQ();
// TP 0.6+0.4
// FN 0.4+0.6
// FP 0.2

$("button.MCQ").click(function() {
  //$( "#target" ).click();
  var clk = 3-idx_mcq.indexOf(Number(this.id.slice(-1)));
  if(this.id==mcq.ans){
    $("#dbg").text("Good");
	$("#dbg_2").text(arr_mcq[3]+" "+idx_words + "\n");
	idx_words.splice(arr_mcq[3],1);
	$("#dbg_2").text($("#dbg_2").text()+" "+idx_words + "\n");
	for(var i=0;i<4;++i)
		if(i==clk){
			answerStats[wordList[arr_mcq[i]][2]][0]++; // TP
			if(answerStats[wordList[arr_mcq[i]][2]][4]==-1)
				answerStats[wordList[arr_mcq[i]][2]][4] = 1;
			else
				answerStats[wordList[arr_mcq[i]][2]][4] = answerStats[wordList[arr_mcq[i]][2]][4]*0.6+0.4;
		}else{
			answerStats[wordList[arr_mcq[i]][2]][1]++; // TN
			if(answerStats[wordList[arr_mcq[i]][2]][5]==-1)
				answerStats[wordList[arr_mcq[i]][2]][5] = 1;
			else
				answerStats[wordList[arr_mcq[i]][2]][5] = answerStats[wordList[arr_mcq[i]][2]][5]*0.6+0.4;
		}
  }else{
    // arr_mcq[clk] => FP, arr_mcq[0] => FN, others TN
    $("#dbg").text("wrong " + idx_words+ " " +idx_words.indexOf(3)+" "+arr_mcq[clk]+ " " + wordList[arr_mcq[clk]]);
	
	
	answerStats[wordList[arr_mcq[0]][2]][3]++; // FN
	if(answerStats[wordList[arr_mcq[0]][2]][4]==-1)
		answerStats[wordList[arr_mcq[0]][2]][4] = 0;
	else
		answerStats[wordList[arr_mcq[0]][2]][4] = answerStats[wordList[arr_mcq[0]][2]][4]*0.4;
	for(var i=1;i<4;++i)
		if(i==clk){
			answerStats[wordList[arr_mcq[i]][2]][2]++; //FP
			if(answerStats[wordList[arr_mcq[i]][2]][4]==-1)
				answerStats[wordList[arr_mcq[i]][2]][4] = 1;
			else
				answerStats[wordList[arr_mcq[i]][2]][4] = answerStats[wordList[arr_mcq[i]][2]][4]*0.2;
		}else{
			answerStats[wordList[arr_mcq[i]][2]][1]++; // TN
			if(answerStats[wordList[arr_mcq[i]][2]][5]==-1)
				answerStats[wordList[arr_mcq[i]][2]][5] = 1;
			else
				answerStats[wordList[arr_mcq[i]][2]][5] = answerStats[wordList[arr_mcq[i]][2]][5]*0.6+0.4;
		}
  // send arr_mcq OK + ID // FN

  }
  gameNumber++;
	if(gameNumber==8){
		$("#ans").text("Test terminé");
		var posting = $.post( "updateStats.php", { L_Lang: Learn_Lang, AnswerStats: JSON.stringify(answerStats) } ); // ToUpdate L_Lang

		// Put the results in a div
		posting.done(function( data ) {
		$( "#disp" ).empty().append( data );
		});
	}else{
		setTimeout(function(){$("#dbg").text("");
							 mcq = generateMCQ(wordList);
							 displayMCQ();
							 $("#dbg").text($("#dbg").text()+arr_mcq+" "+idx_words + "\n");
							  // send arr_mcq OK + ID // TP TN FP FN
							 }, 1000);
	}
});

$("#switchLang").click(function(){
	var tmp;
	for(var i=0;i<wordList.length;++i){
		tmp = wordList[i][1];
		wordList[i][1] = wordList[i][0];
		wordList[i][0] = tmp;
	}
	tmp = $("#questLang").html();
	$("#questLang").html($("#choicesLang").html());
	$("#choicesLang").html(tmp);
	mcq = generateMCQ(wordList);
	displayMCQ();
});
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