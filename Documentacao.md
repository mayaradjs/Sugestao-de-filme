## Equipe: Mayara Silva e Monira Silva

# Documentação do sistema Sugestão de filme

Para melhor organizar o código, separamos os arquivos em pastas. Uma para cada tipo de arquivo.

## Pasta: style
Há apenas o arquivo CSS do trabalho, o qual faz as formatações de algumas classes, tags e elementos do HTML. As classes foram criadas de modo a serem utilizadas em mais de um elemento ou apenas para uma melhor organização mesmo.

## Pasta: images
Nessa pasta, temos as imagens usadas no trabalho (a imagem de background, a que é usada quando o filme não possui imagem e o gif de aguarde).

## Pasta: script
Nela encontra-se o JavaScript do nosso site o qual iremos explicar um pouco mais sobre a lógica usada na implementação.
A visualização inicial do site é um formulário onde o usuário pode inserir as informações do filme desejado.
Uma requisição ajax é feita ao HTML disponibilizado e o resultado dessa requisição é transformado em uma variável do tipo DOM utilizando o ParseDOM, disponivel no Javascript. A partir daí percorremos todos elementos da classe "movie" a fim de achar os que atendam aos filtros passados. Para verificar o conteúdo dentro de cada DIV da classe "movie", acessamos os filhos dessa DIV de acordo com a posição dele já que o HTML em questão seguia um padrão. Foi usado métodos auxiliares para "manusear" os dados da melhor forma possível (Ex: array_diff e ulToVector)
Segundo a especificação, o usuário pode não digitar todos os campos, portanto, consideramos que o usuário pode não preencher campo algum e ainda sim ter um resultado. Por isso, ao filtrar os filmes verificamos primeiro se um determinado filtro está vazio para depois comparar com o dado do html. Há uma ressalva para o filtro Ano, pois o html não retorna apenas o ano, mas a string "Ano: " antes do dado (Ex.: "Ano: 2010"), por isso concatenamos "Ano: " com o valor informado pelo usuário e só depois fazemos as comparações.
Como foi pedido aleatoriedade nas respostas, após preencher um vetor com os filmes que atendem aos filtros, é feito um sorteio e um filme é selecionado para ser exibido. Isso é feito sempe que o usuário clicar no botão referente a exibir outro filme com os mesmos filtros.
Outra exigência da especificação, era relacionado à exibição do trailer do filme usando a API do youtube. Usando dois métodos, um para fazer a requisição e o outro tratar a resposta dessa requisição, mostramos o primeiro resultado da busca feita. Essa busca é feita usando a palavra-chave composta pelo título do filme e a palavra "trailer".

## O HTML
Apesar de todo o HTML não ser exibido simultaneamente para o usuário, fizemos tudo como uma página só. Este está dividido em DIVs e uma tabela, pois foi a forma que achamos melhor para organizar. A tabela, inicialmente vazia, é preenchida com os dados do filme que será exibido para  usuário.
