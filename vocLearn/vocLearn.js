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


difficulty