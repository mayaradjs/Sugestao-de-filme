const keyEnter = 13;
const urlApi = "api/";

$(document).ready(function() {
  $('#divPrincipal input,#divPrincipal select').keyup(function(event) {
    if (event.keyCode == keyEnter)
      buscar();
  });
});

function buscar() {
  var ano = $('#txtAno').val();
  var ator = $('#txtAtores').val();
  var categoria = $('#categorias').val();
  var outrasinf = $('#txtOutrasInformacoes').val();
  $("#modal-loading").show();
  trocarContexto("filme");
  $.ajax({
      url: urlApi + 'movies.html',
      type: 'GET',
      dataType: 'html'
    })
    .done(function(result) {
      console.log(result);
      var $html = new DOMParser().parseFromString(result, "text/html");
      var filme = RetornarFilme($html, ano, ator, categoria, outrasinf);

      ExibirFilme(filme);
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

function RetornarFilme(datasource, ano, ator, categoria, outrainfo) {
  var filme = {
    Titulo: "",
    Sinopse: "",
    Ano: "",
    Categorias: "",
    Atores: "",
    Imagem: urlApi,
  }
  var todosFilmes = datasource.getElementsByClassName('movie');
  var filmesSelecionados = [];
  for (var i = 0; i < todosFilmes.length; i++) {
    if (ano != "" && todosFilmes[i].children[2] != ano) {
      continue;
    }
    if (ator != "") {

      var ret = array_diff(ator.split(","), ulToVetor(todosFilmes[i].children[5]));
    }



    filmesSelecionados.push(todosFilmes[i]);
  }


  return filme;
}

function ulToVetor($ul) {
  var retorno = [];

  var $liArray = $ul.children;
  for (var i = 0; i < $liArray.length; i++) {
    retorno.push($liArray[i].textContent);
  }

  return retorno;
}

function array_diff(a1, a2) {
  var diff = [];
  for (var i = 0; i < a1.length; i++) {
    if (a2.indexOf(a1[i]) == -1)
      diff.push(a1[i]);
  }
  return diff;
};

function ExibirFilme(filme) {

}

function BuscaTrailer(nomeFilme) {
  //TODO Youtube

  return urlTrailer;
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