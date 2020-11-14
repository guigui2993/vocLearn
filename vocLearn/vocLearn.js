// VocLearn games

function generateSwapGame_template(words){
	$("#game").append(
`
<table>
	<tr>
		<td><button id="L0" class="MCQ"></button></td>
		<td><button id="but_1" class="MCQ"></button></td>
	</tr>
	<tr>
		<td><button id="but_2" class="MCQ"></button></td>
		<td><button id="but_3" class="MCQ"></button></td>
	</tr>
</table>
`
	);
}

function generateMCQ_template(words){
	$("#game").append(
`
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
</table>
`
	);
}

$("#difficulty").change(function(){
	$(this).value = game.setDifficulty($(this).value);
});

// switch language question <> answer
$("#switchLang").click(function(){
	game.switchQuestAnsLang();
});

/*
function displayMSG(msg, func){
	$("#msg").html(msg).show();

	if(func !== undefined)
		func();
}*/

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

class Game{
	static difficultyLabels = ["Easy", "Intermediate", "Hard", "Extreme"];
	
	constructor(words){
		this.words = words;
		this.wordsIds = Object.keys(words); // IDs of the words
		shuffleArray(this.wordsIds); // shuffle IDs of the words
		this.answer = 0;
		this.answerLang = "learntLang";
		this.questionLang = "masteredLang";
		this.progress = 0; // 0 (not yet started) to 100 (done)
		this.level = 0;
		this.answerWordID = 0;
		this.score = 0;
		
		this.loadGame();
	}
	
	loadGame(){
	}
	
	generateGame(){
	}
	
	switchQuestAnsLang(){
		if(answerLang=="learntLang"){
			this.answerLang = "masteredLang";
			this.questionLang = "learntLang";
		}else{
			this.answerLang = "learntLang";
			this.questionLang = "masteredLang";
		}
	}
	
	setDifficulty(level){
		if(this.progress != 0){
			msg("Modification not yet supported during a game");
			return this.level;
		}else{
			$("#difficultyLabel").html(difficultyLabels[level]);
			return level;
		}
	}
	
	displayResult(){
		$("msg").html("Result: "+this.score+"/"+5);
	}
}

class MCQ extends Game{
	
	constructor(words){
		super(words);
		this.falseAnswersWordID = [];
		this.MCQ_wordsId = [];
	}
	
	loadGame(){
		$("#game").append(`
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
</table>
`);
		let _this = this;
		$("button.MCQ").click(function(){
			_this.checkAnswer(parseInt($(this).attr("id")[4]));
		});
		
		let msg = `
<div><button id="msgButton">Start</button></div>
`;
		$("#msg").html(msg).show();
		$("#msgButton").click(function(){
			$("#msg").hide();
			_this.generateGame();
		});
	}
	
	generateGame(){
		
	  this.answer = Math.floor(Math.random()*4);
	  for(var i=0;i<4;i++){
		let idWord = this.wordsIds.pop();
		this.MCQ_wordsId[i] = idWord;
		let word = this.words[idWord][this.answerLang];
		$("#but_"+ i).html(word);
		if(this.answer==i){
			$("#quest").html(this.words[idWord][this.questionLang]);
			this.answerWordID = idWord;
		}else{
			this.falseAnswersWordID.push(idWord);
		}
	  }
	  this.progress += 20;
	  // todo update progress barre
	}
	
	checkAnswer(userAnswer){
		let _this = this;
		for(var i=0;i<4;i++){
			this.words[this.MCQ_wordsId[i]]["score"] = 0.2; // 0.2 pt for TN
		}
		if(userAnswer == this.answer){
			$("#but_"+this.answer).addClass("goodAnswer");
			this.words[this.answerWordID]["score"] = 0.5; // easy mode
			this.score++;
		}else{
			$("#but_"+userAnswer).addClass("wrongAnswer");
			$("#but_"+this.answer).addClass("HighlightGoodAnswer");
			this.words[this.MCQ_wordsId[userAnswer]]["score"] = 0; // score 0 for the chosen user answer 
			this.words[this.answerWordID]["score"] = 0;  // 0 also for the real answer
		}
		
		// show result few second then go next MCQ or finish the game
		setTimeout(function(){
			$("#but_"+_this.answer).attr("class","MCQ");
			$("#but_"+userAnswer).attr("class","MCQ");
			
			if(_this.progress < 100){
				_this.generateGame()
			}else{
				_this.displayResult();
			}
		}, 1000);
	}
}

game = new MCQ(words);