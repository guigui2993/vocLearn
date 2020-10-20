// VocLearn games

function generateSwapGame(words){
	$("#game").append(
``
	);
}

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

function generateMCQ(words){
	
}