/*
TODO: backspace in case someone delete the selection
combination ô
*/

var KB_layout, key_comb='', lastKeyPressed;
var KB_layout_be_fr =
    {
     E : {
"Backquote": ["²","³",""],
"Digit1": ["&","1","|"],
"Digit2": ["é","2","@"],
"Digit3": ["\"","3","#"],
"Digit4": ["'","4",""],
"Digit5": ["(","5",""],
"Digit6": ["§","6","^"],
"Digit7": ["è","7",""],
"Digit8": ["!","8",""],
"Digit9": ["ç","9","{"],
"Digit0": ["à","0","}"],
"Minus": [")","°",""],
"Equal": ["-","_",""],
"Backspace": ["←","","",{"width":"64"}]},

D: {
"Tab": ["↹","","",{"width":"48"}],
"KeyQ": ["a","A",""],
"KeyW": ["z","Z",""],
"KeyE": ["e","E","€"],
"KeyR": ["r","R",""],
"KeyT": ["t","T",""],
"KeyY": ["y","Y",""],
"KeyU": ["u","U",""],
"KeyI": ["i","I",""],
"KeyO": ["o","O",""],
"KeyP": ["p","P",""],
"BracketLeft": ["^","¨","["],
"BracketRight": ["$","*","]"]},
DC: {
"Enter": ["↵","","",{"height":"64px","width":"38px"}]},
C: {
"CapsLock": ["⇪ Lock","","",{"width":"56"}],
"KeyA": ["q","Q",""],
"KeyS": ["s","S",""],
"KeyD": ["d","D",""],
"KeyF": ["f","F",""],
"KeyG": ["g","G",""],
"KeyH": ["h","H",""],
"KeyJ": ["j","J",""],
"KeyK": ["k","K",""],
"KeyL": ["l","L",""],
"Semicolon": ["m","M",""],
"Quote": ["ù","%","´"],
"Backslash": ["µ","`"]},
B : {
"ShiftLeft": ["⇧","","",{"width": "39"}],
"IntlBackslash": ["<",">",""],
"KeyZ": ["w","W",""],
"KeyX": ["x","X",""],
"KeyC": ["c","C",""],
"KeyV": ["v","V",""],
"KeyB": ["b","B",""],
"KeyN": ["n","N",""],
"KeyM": [",","?",""],
"Comma": [";",".",""],
"Period": [":","/",""],
"Slash": ["=","+","~"],
"ShiftRight": ["⇧","","",{"width":"88"}]},
A: {
"ControlLeft": ["Ctrl","","",{"width": "44","font-size":"10px"}],
"MetaLeft": ["Meta","","",{"width": "44","font-size":"10px"}],
"AltLeft": ["Alt","","",{"width": "44","font-size":"10px"}],
"Space": ["\b","","",{"width": "171","font-size":"10px"}],
"AltRight": ["Alt Gr","","",{"width": "44","font-size":"10px"}],
"MetaRight": ["Meta","","",{"width": "44","font-size":"10px"}],
"ContextMenu": ["Menu","","",{"width": "44","font-size":"10px"}],
"ControlRight": ["Ctrl","","",{"width": "44","font-size":"10px"}]
}
    };

// backspce is split into 2 keys 
var KB_layout_ru = 
    {
      E: {
"Backquote": ["ё","Ё",""],
"Digit1": ["1","!",""],
"Digit2": ["2","\"",""],
"Digit3": ["3","№",""],
"Digit4": ["4",";",""],
"Digit5": ["5","%",""],
"Digit6": ["6",":",""],
"Digit7": ["7","?",""],
"Digit8": ["8","*","₽"],
"Digit9": ["9","(",""],
"Digit0": ["0",")",""],
"Minus": ["-","_",""],
"Equal": ["=","+",""],
"Backslash": ["\\","/",""],
"Backspace": ["←","",""]},
D : {
"Tab": ["↹","","",{"width":"48"}],
"KeyQ": ["й","Й",""],
"KeyW": ["ц","Я",""],
"KeyE": ["у","У",""],
"KeyR": ["к","К",""],
"KeyT": ["е","Е",""],
"KeyY": ["н","Н",""],
"KeyU": ["г","Г",""],
"KeyI": ["ш","Ш",""],
"KeyO": ["щ","Щ",""],
"KeyP": ["з","З",""],
"BracketLeft": ["х","Х",""],
"BracketRight": ["ъ","Ъ",""]},
DC : {
"Enter": ["↵","","",{"height":"64px","width":"47px"}]},
C : {
"CapsLock": ["⇪ Lock","","",{"width":"56"}],
"KeyA": ["ф","Ф",""],
"KeyS": ["ы","Ы",""],
"KeyD": ["в","В",""],
"KeyF": ["а","А",""],
"KeyG": ["п","П",""],
"KeyH": ["р","Р",""],
"KeyJ": ["о","О",""],
"KeyK": ["л","Л",""],
"KeyL": ["д","Д",""],
"Semicolon": ["ж","Ж",""],
"Quote": ["э","Э",""]},
B : {
"ShiftLeft": ["⇧","","",{"width":"71"}],
"IntlBackslash": ["⇧","","","void"],
"KeyZ": ["я","Я",""],
"KeyX": ["ч","Ч",""],
"KeyC": ["с","С",""],
"KeyV": ["м","М",""],
"KeyB": ["и","И",""],
"KeyN": ["т","Т",""],
"KeyM": ["ь","Ь",""],
"Comma": ["б","Б",""],
"Period": ["ю","Ю",""],
"Slash": [".",",",""],
"ShiftRight": ["⇧","","",{"width":"88"}]},
A: {
"ControlLeft": ["Ctrl","","",{"width": "44","font-size":"10px"}],
"MetaLeft": ["Meta","","",{"width": "44","font-size":"10px"}],
"AltLeft": ["Alt","","",{"width": "44","font-size":"10px"}],
"Space": ["\b","","",{"width": "171","font-size":"10px"}],
"AltRight": ["Alt Gr","","",{"width": "44","font-size":"10px"}],
"MetaRight": ["Meta","","",{"width": "44","font-size":"10px"}],
"ContextMenu": ["Menu","","",{"width": "44","font-size":"10px"}],
"ControlRight": ["Ctrl","","",{"width": "44","font-size":"10px"}]
}};

var KB_layout_mn = 
    {
E: {
"Backquote": ["=","+",""],
"Digit1": ["№","1","|"],
"Digit2": ["-","2","@"],
"Digit3": ["\"","3","#"],
"Digit4": ["₮","4",""],
"Digit5": [":","5",""],
"Digit6": [".","6","^"],
"Digit7": ["_","7",""],
"Digit8": [",","8",""],
"Digit9": ["%","9","{"],
"Digit0": ["?","0","}"],
"Minus": ["e","E",""],
"Equal": ["щ","Щ",""],
"Backspace": ["←","","",{"width":"64"}]},
D: {
"Tab": ["↹","","",{"width":"48"}],
"KeyQ": ["ф","Ф",""],
"KeyW": ["ц","Ц",""],
"KeyE": ["у","У",""],
"KeyR": ["ж","Ж",""],
"KeyT": ["э","Э",""],
"KeyY": ["н","Н",""],
"KeyU": ["г","Г",""],
"KeyI": ["ш","Ш",""],
"KeyO": ["ү","Ү",""],
"KeyP": ["з","З",""],
"BracketLeft": ["к","К",""],
"BracketRight": ["ъ","Ъ",""],
"Backslash": ["¥","|","",{"width":"48"}]},
DC: {},
C: {
"CapsLock": ["⇪ Lock","","",{"width":"56"}],
"KeyA": ["й","Й",""],
"KeyS": ["ы","Ы",""],
"KeyD": ["б","Б",""],
"KeyF": ["ө","Ө",""],
"KeyG": ["а","А",""],
"KeyH": ["х","Х",""],
"KeyJ": ["р","Р",""],
"KeyK": ["о","О",""],
"KeyL": ["л","Л",""],
"Semicolon": ["д","Д",""],
"Quote": ["п","П",""],
"Enter": ["↵","","",{"width":"72"}]},
B: {
"ShiftLeft": ["⇧","","",{"width":"71"}],
"IntlBackslash": ["⇧","","","void"],
"KeyZ": ["я","Я",""],
"KeyX": ["ч","Ч",""],
"KeyC": ["ё","Ё",""],
"KeyV": ["с","С",""],
"KeyB": ["м","М",""],
"KeyN": ["и","И",""],
"KeyM": ["т","Т",""],
"Comma": ["ь","Ь",""],
"Period": ["в","В",""],
"Slash": ["ю","Ю",""],
"ShiftRight": ["⇧","","",{"width":"89"}]},
A: {
"ControlLeft": ["Ctrl","","",{"width": "44","font-size":"10px"}],
"MetaLeft": ["Meta","","",{"width": "44","font-size":"10px"}],
"AltLeft": ["Alt","","",{"width": "44","font-size":"10px"}],
"Space": ["\b","","",{"width": "171","font-size":"10px"}],
"AltRight": ["Alt Gr","","",{"width": "44","font-size":"10px"}],
"MetaRight": ["Meta","","",{"width": "44","font-size":"10px"}],
"ContextMenu": ["Menu","","",{"width": "44","font-size":"10px"}],
"ControlRight": ["Ctrl","","",{"width": "44","font-size":"10px"}]
}};

function generateKeyboard(keyboardLayout){
  KB_layout = keyboardLayout;
  var but;
  for(var row in keyboardLayout){
    $("#KB_row_"+row).empty();

    for(var j in keyboardLayout[row]){
      but = $(document.createElement('button')).data('KB-col',j).html(keyboardLayout[row][j][0]);
      if(keyboardLayout[row][j].length==4)
        but.css(keyboardLayout[row][j][3]);
        if(keyboardLayout[row][j][3]=="void")
          continue;
      $("#KB_row_"+row).append(but);
    }
  }
  //$("#keyboard").show();
}


// KB_layout_be_fr
// KB_layout_ru
// KB_layout_mn
generateKeyboard(KB_layout_be_fr);

function physicalKey2map(emulKB, physKey){
keyboard_mapping={ // std_102
"Backquote": "E0",
"Digit1": "E1",
"Digit2": "E2",
"Digit3": "E3",
"Digit4": "E4",
"Digit5": "E5",
"Digit6": "E6",
"Digit7": "E7",
"Digit8": "E8",
"Digit9": "E9",
"Digit0": "E10",
"Minus": "E11",
"Equal": "E12",
"Backspace": "E13",

"Tab": "D0",
"KeyQ": "D1",
"KeyW": "D2",
"KeyE": "D3",
"KeyR": "D4",
"KeyT": "D5",
"KeyY": "D6",
"KeyU": "D7",
"KeyI": "D8",
"KeyO": "D9",
"KeyP": "D10",
"BracketLeft": "D11",
"BracketRight": "D12",

"CapsLock": "C0",
"KeyA": "C1",
"KeyS": "C2",
"KeyD": "C3",
"KeyF": "C4",
"KeyG": "C5",
"KeyH": "C6",
"KeyJ": "C7",
"KeyK": "C8",
"KeyL": "C9",
"Semicolon": "C10",
"Quote": "C11",
"Backslash": "C12",
"Enter": "C13",

"ShiftLeft": "B99",
"IntlBackslash": "B0",
"KeyZ": "B1",
"KeyX": "B2",
"KeyC": "B3",
"KeyV": "B4",
"KeyB": "B5",
"KeyN": "B6",
"KeyM": "B7",
"Comma": "B8",
"Period": "B9",
"Slash": "B10",
"ShiftRight": "B11"};
 /*
  switch(emulKB){
    case "std_101":
      keyboard_mapping["Backslash"] = "D13";
  }
  */
  var coord = keyboard_mapping[physKey];
    
  var row = coord[0];
  var col = coord.substring(1);
  return {"row":row, "col": col};
}
/*
$( "#answer" ).keydown(function( event ){
  //var x = event.code;
  //event.preventDefault();
  //x = event.location;
  /*
  var loc = keyboard_be_fr_mapping[x];
  var row = loc[0];
  var col = loc.substring(1);
  
  $("#dbg").append(x+ " " +row+" "+col);
  $( "#answer" ).val($( "#answer" ).val()+KB_layout[row][col][KBcomb]);
  * /
  $("#dbg").append(event.which);
  alert(event.code);
});*/

/*
document.getElementById("answer").addEventListener("keydown", function(event) {
  var code = event.code;
  $("#dbg").append("["+event.isComposing+"]");

}, true);
*/
/**/
document.getElementById("answer").addEventListener("keydown", function(event) {
  var code = event.code;
  var unpreventedKeys = ["←","↹","⇪ Lock","↵","\b","Ctrl","Alt Gr","Alt","Meta","Menu"];
  var chr= "";
  var key_pos = 0;
  
  
  if(event.shiftKey)
    key_pos = 1;
  if(event.getModifierState("AltGraph"))
    key_pos = 2;
  for(var row in KB_layout){
    if(code in KB_layout[row]){
      chr = KB_layout[row][code][key_pos];
      break;
    }
  }
  $("#dbg").append("["+code+" "+chr+"]");
  //$("#dbg").append("<"+document.getSelection()+">");
  
  
  if(unpreventedKeys.includes(chr)||chr=="AltGr")
    return;
  
  if(chr!="⇧"){
    var txt = $("#answer").val();
    if(chr=="←"){
      $( "#answer" ).val(txt.substring(0,txt.length-1));
    }else
      $( "#answer" ).val(txt+chr);
    
  }
  $("#dbg").append("[<"+event.isComposing+"]");
  event.preventDefault();
}, true);
/*
document.getElementById("answer").addEventListener("click", function(event) {
  $("#dbg").append("<"+document.getSelection()+">");
  
}, true);*/
