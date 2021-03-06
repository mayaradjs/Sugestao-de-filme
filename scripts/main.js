const keyEnter = 13;
const urlApi = "https://leandrojsa.github.io/";
//const urlApi = "api/";

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

  $.ajax({
      url: urlApi + 'movies.html',
      type: 'GET',
      dataType: 'html'
    })
    .done(function(result) {
      console.log(result);
      var $html = new DOMParser().parseFromString(result, "text/html");
      var filme = RetornarFilme($html, ano, ator, categoria, outrasinf);
      if (filme) {
        trocarContexto("filme");
        ExibirFilme(filme);
      } else {
        $("#modal-loading").hide();
        alert("Nenhum filme foi encontrado");
      }
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
  ano = "Ano: " + ano;
  for (var i = 0; i < todosFilmes.length; i++) {
    if (ano != "Ano: " && todosFilmes[i].children[2].textContent != ano) {
      continue;
    }
    if (ator != "") {
      var ret = array_diff(ator.split(","), ulToVector(todosFilmes[i].children[7]));
      if (ret.length != 0)
        continue;
    }
    if (categoria != "") {
      if (ulToVector(todosFilmes[i].children[5]).indexOf(categoria) == -1)
        continue;
    }
    if (outrainfo != "" && todosFilmes[i].children[3].textContent.indexOf(outrainfo) == -1) {
      continue;
    }

    filmesSelecionados.push(todosFilmes[i]);
  }
  if (filmesSelecionados.length > 0) {
    var i = sorteia(0, filmesSelecionados.length);
    filme.Titulo = filmesSelecionados[i].children[1].textContent;
    filme.Sinopse = filmesSelecionados[i].children[3].textContent;
    filme.Ano = filmesSelecionados[i].children[2].textContent;
    filme.Atores = filmesSelecionados[i].children[7];
    filme.Imagem = filmesSelecionados[i].children[0].attributes['src'].value;
    return filme;
  } else {
    return undefined;
  }
}

function ulToVector($ul) {
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
  if (filme.Imagem != "")
    $("#imgFilme").attr("src", urlApi + filme.Imagem);
  else
    $("#imgFilme").attr("src", 'images/indisponivel.png');

  document.getElementById("TituloAno").innerHTML = "<h3>" + filme.Titulo + " (" + filme.Ano + ")</h3>"
  document.getElementById("infoFilme").innerHTML = filme.Sinopse;
  document.getElementById("listaAtores").innerHTML = "<b>Atores: </b> <br/>" + filme.Atores.innerHTML;

  BuscaTrailer(filme.Titulo);
}

function BuscaTrailer(nomeFilme) {
  var url = 'https://www.googleapis.com/youtube/v3/search';
  var params = {
    part: 'snippet',
    key: 'AIzaSyAa_ocGjUA_rW2de7r6GAA4sj4aAevUQ6I',
    q: nomeFilme + 'trailer',
    maxResults: 1,
    order: "relevance"
  };

  $.getJSON(url, params, insereLinkTrailer);
}

function insereLinkTrailer(response) {
  var urlResult = "https://www.youtube.com/embed/";

  urlResult += response.items[0].id.videoId;
  $("#urlTrailer").attr('src', urlResult);
}

function sorteia(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
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