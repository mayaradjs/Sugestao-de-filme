const keyEnter = 13;


$(document).ready(function() {
  $('#divPrincipal input,#divPrincipal select').keyup(function(event) {
    if (event.keyCode == keyEnter)
      buscar();
  });
});

function buscar() {
  alert("//TODO buscar filme")
}