<?php
try
{
	$bdd = new PDO('mysql:host=localhost;dbname=id12472592_voclearn;charset=utf8', 'id12472592_voclearnuser', 'v0cL43rn');

	// To Update
	$userID = 1;
	//
	$L_Lang = "mn";

	if(isset($_POST["L_Lang"]))
	    $L_Lang = $_POST["L_Lang"];
	
	if(isset($_POST["AnswerStats"])){
	    $answerStats = json_decode($_POST["AnswerStats"],true);
	    // insert update
		$req = $bdd->prepare('INSERT INTO Answer(USER, WORD, LANG, DATE, TRUE_POS, TRUE_NEG, FALSE_POS, FALSE_NEG, SCORE_1, SCORE) VALUES(:userID, :wordID, :Lang, NOW(), :TP, :TN, :FP, :FN, :score, :score *0.5) ON DUPLICATE KEY UPDATE TRUE_POS = TRUE_POS + :TP, TRUE_NEG = TRUE_NEG + :TN, FALSE_POS = FALSE_POS + :FP, FALSE_NEG = FALSE_NEG + :FN, SCORE = :score*0.5+SCORE_1*0.3+SCORE_2*0.2, SCORE_3 = SCORE_2, SCORE_2 = SCORE_1, SCORE_1 = :score, DATE = NOW()');

		foreach($answerStats as $wordID => $stat){
			$score = $stat[4];
			if($stat[4] == -1){ // get the last score
				$score = 0;
				$reqScore = $bdd->prepare('SELECT SCORE FROM Answer WHERE USER = ?, WORD = ?, LANG = ?');
				$reqScore->execute([$userID,$wordID,$L_Lang]);
				
				if($sc = $reqScore->fetch())
					$score = $sc["SCORE"];
				if($stat[5] == -1)
					continue;
			}
			
			if($stat[5] != -1)
				$score = 0.8*$score+0.2*$stat[5];
			
			$answer = ["userID" => $userID, "Lang" => $L_Lang, "wordID" => $wordID, "TP" => $stat[0],  "TN" => $stat[1], "FP" => $stat[2], "FN" => $stat[3], "score" => $score];
		    $req->execute($answer);
		}
	}
	
	echo "Stats updated";
}
catch (Exception $e)
{
        die('Erreur : ' . $e->getMessage());
}
?>
