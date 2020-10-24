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

var progress = -1; // -1 not in a game otherwise 0 to 100
var level = 0;
var difficultyLabels = ["Easy", "Intermediate", "Hard", "Extreme"];
$("#difficulty").change(fonction(){
  if(progress != -1){
    msg("modification not yet supported during a game");
    $(this).value = level;
  }else{
    level =$(this).value;
    $("#difficultyLabel").html(difficultyLabels[level]);
  }
});

function msg(text){
  $("#msg").html(txt).show();
  // timeout
  
  $("#msg").hide();
}

function generateMCQ(){
  
}