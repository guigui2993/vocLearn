/*
TODO:
- accent : âêîôû àèìòù áéíóúý äëïöüÿ ñõã
BUG:
- dead key: prevent backspace => can't delete selection.
- 1 px keyboard line 4 ru,fr
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
"Backslash": ["µ","£","`"]},
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
"Space": ["&nbsp;","","",{"width": "171","font-size":"10px"}],
"AltRight": ["Alt Gr","","",{"width": "44","font-size":"10px"}],
"MetaRight": ["Meta","","",{"width": "44","font-size":"10px"}],
"ContextMenu": ["Menu","","",{"width": "44","font-size":"10px"}],
"ControlRight": ["Ctrl","","",{"width": "44","font-size":"10px"}]
}};

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
"Space": ["&nbsp;","","",{"width": "171","font-size":"10px"}],
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
"Space": ["&nbsp;","","",{"width": "171","font-size":"10px"}],
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
      but = $(document.createElement('button')).addClass("KB_button").data('KB-Key',j).html(keyboardLayout[row][j][0]);
      if(keyboardLayout[row][j].length==4)
        but.css(keyboardLayout[row][j][3]);
        if(keyboardLayout[row][j][3]=="void")
          continue;
      but.click(KB_ButtonClickFct);
      $("#KB_row_"+row).append(but);
    }
  }
  //$("#keyboard").show();
}


generateKeyboard(KB_layout_mn);
generateKeyboard(KB_layout_mn);
generateKeyboard(KB_layout_be_fr);

//$("#dbg").append("<"+document.getSelection()+">");

document.getElementById("answer").addEventListener("keydown", function(event) {
  var unpreventedKeys = ["F1","F2","F3","F3","F4","F5","F6","F7","F8","F9","F10","F11","F12","Insert","Delete","PageUP","PageDown","Home","End","ScrollLock","Pause","NumLock","NumpadDivide","NumpadMultiply","NumpadAdd","NumpadSubtract","NumpadDecimal","Numpad1","Numpad2","Numpad3","Numpad4","Numpad5","Numpad6","Numpad7","Numpad8","Numpad9","Numpad0","ArrowUp","ArrowDown","ArrowLeft","ArrowRight","ShiftLeft","ShiftRight","ControlLeft","ControlRight","AltLeft","AltRight","MetaLeft","MetaRight","ContextMenu"];
  
  var code = event.code;
  
  if(unpreventedKeys.includes(code)){
    $("#dbg2").append("yy");
    return;
    
  }
  
  unpreventedKeys = ["←","↹","↵","&nbsp;"];
  var chr= "";
  var key_pos = 0;
  var txt = $("#answer").val();
  
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
  $("#dbg").append("["+code+" §"+chr+"§ "+event.which+" !"+event.key+"]");
  
  if(code=="Space" && event.key !=" "){
    chr = " ";
  }
  if(code=="Backspace" && event.key !="Backspace"){
    event.preventDefault();
    
    $( "#answer" ).val(txt.substring(0,txt.length-1));
    $("#dbg2").append("OK]");
    return;
  }
  if(code=="Tab" && event.key !="Tab"){
    event.preventDefault();
    $("#dbg2").append("OK]");
    return;
  }
  
  if(unpreventedKeys.includes(chr)||chr=="AltGr")
    return;

  var accent={'^': {'a':'â','e':'ê','i':'î','o':'ô','u':'û'},
              '`': {'a':'à','e':'è','i':'ì','o':'ò','u':'ù'},
              '´': {'a':'á','e':'é','i':'í','o':'ó','u':'ú','y':'ý'},
              '¨': {'a':'ä','e':'ë','i':'ï','o':'ö','u':'ü','y':'ÿ'},
              '~': {'n':'ñ','o':'õ','a':'ã'}}; 
  event.preventDefault();
  
  if(chr in accent && key_comb==''){
    key_comb = chr;
    return;
    
  }
  
  if(key_comb in accent){
    if(chr in accent[key_comb])
      chr = accent[key_comb][chr];
    else
      chr = key_comb + chr;
    key_comb = '';
  }
  
  $("#answer").val(txt+chr); 
  $("#dbg").append("["+event.isComposing+"]");
}, true);

var KB_ButtonClickFct = function() {
  $("#dbg").append("["+$( this).data("KB-Key")+"]");
};

$("#keyboard button").click(KB_ButtonClickFct);
