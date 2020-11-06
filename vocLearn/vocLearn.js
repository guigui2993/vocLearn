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

function msg(text){
  $("#msg").html(txt).show();
  // timeout
  
  $("#msg").hide();
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

class Game{
	static difficultyLabels = ["Easy", "Intermediate", "Hard", "Extreme"];
	
	constructor(words){
		this.words = words;
		this.wordsIds = shuffleArray(Object.keys(words)); // shuffle IDs of the words
		this.answer = 0;
		this.answerLang = "learntLang";
		this.questionLang = "masteredLang";
		this.progress = 0; // 0 (not yet started) to 100 (done)
		this.level = 0;
		this.answerWordID = 0;
		
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
		
	}
}

class MCQ extends Game{
	
	constructor(words){
		super(words);
		this.falseAnswersWordID = [];
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
		$("button.MCQ").click(function(but){
			this.checkAnswer($(but).value);
		});
	}
	
	generateGame(){
		
	  this.answer = math.floor(Math.random()*4);
	  for(var i=0;i<4;i++){
		idWord = this.wordsIds.pop();
		word = this.words[idWord][this.answerLang];
		$("#but_"+ i).html(word);
		if(this.answer==i){
			$("#quest").html(this.words[this.questionLang]);
			this.answerWordID.push(idWord);
		}else{
			this.falseAnswersWordID.push(idWord);
		}
	  }
	  this.progress += 20;
	  // todo update progress barre
	}
	
	checkAnswer(answer){
		if(answer == this.answer){
			$("#but_"+this.answer).addClass("goodAnswer");
			this.words[this.answerWordID]["score"] = 0.5; // easy mode
		}else{
			$("#but_"+this.answer).addClass("badAnswer");
			this.words[this.answerWordID]["score"] = 0;
		}
		
		// show result few second then go next MCQ or finish the game
		setTimeout(function(){
			$("#but_"+this.answer).attr("class","MCQ");
			
			if(this.progress < 100){
				this.generateGame()
			}else{
				this.displayResult();
			}
		}, 1500);
	}
}

game = new MCQ(words);