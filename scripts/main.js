const keyEnter = 13;

$(document).ready(function() {
  $('#divPrincipal input,#divPrincipal select').keyup(function(event) {
    if (event.keyCode == keyEnter)
      buscar();
  });
});

function buscar() {
  $("#modal-loading").show();
  trocarContexto("filme");
  $.ajax({
      url: 'api/movies.html',
      type: 'GET',
      dataType: 'html'
    })
    .done(function(result) {
      console.log(result);
      var $html = $(result);
      //TODO Selecionar o filme baseado nos filtros
    })
    .fail(function(result) {
      trocarContexto("principal");
      alert("Algo não ocorreu como deveria.");
    })
    .always(function() {
      $("#modal-loading").hide();
      console.debug("Request Complete");
    });

}

function trocarContexto(contexto) {
  switch (contexto) {
    case "principal":
      limpaFiltros();
      divHide($("#divFilme"));
      divShow($("#divPrincipal"));
      break;
    case "filme":
      divHide($("#divPrincipal"));
      divShow($("#divFilme"));
      break;
  }
}

function divShow($element) {
  $element.show(400, function() {});
  //$element.removeClass('div-hide');
  //$element.addClass('div-show');
}

function divHide($element) {
  $element.hide(400, function() {});
  //$element.removeClass('div-show');
  //$element.addClass('div-hide');
}

function limpaFiltros() {
  $('#divPrincipal input,#divPrincipal select').val("");
}