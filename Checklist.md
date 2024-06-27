# Checklist para os requisitos do Trabalho Final


## 2 - Tela de Login e Cadastro de Usuário(a)

* [ ] A Tela de Login deverá ter campo Usuário/Senha
* [ ] Cadastro deverá ter Usuário/Senha/Confirmação Senha/Email


**Tela de Login/Cadastro deverá ter as seguintes validações:**

* [ ] Campo vazio => Todos os campos
* [ ] Checar email válido => Campo e-mail

* [ ] Chegar Senha/Confirmação Senha com no mínimo 4 dígitos = Campo Senha
* [ ] Idealmente utilizar alguma biblioteca para auxiliar o processo (yup como exemplo)



## 3 - Rotas Privadas

* [ ] A aplicação não poderá ser acessada caso o login não tenha sucesso, de forma que
  se o(a) usuário(a) tentar acessar diretamente “forçando” a rota, haverá um erro.
* [ ] Para isso é necessário utilizar algum sistema de Autenticação/Autorização com
  Tokens de validação (Exemplo JSON Web Tokens)

## 4 - Utilizar framework frontend da escolha do grupo

* [ ] Em sala de aula é apresentado uma introdução ao React, mas os grupos estão livres
  para utilizar/estudar/aprender qualquer outro e precisam aprofundar. Exemplos: Vue, Angular, NextJS.

## 5 - Utilizar framework backend da escolha do grupo

* [ ] Em sala de aula vimos o NodeJS com Express, mas os grupos estão livres para
  utilizar/estudar/aprender qualquer outro em qualquer linguagem. Exemplos: SpringBoot, ASP.NET, Flask, outros.

## 6 - Comunicação front-back através de verbos HTTP

Em sala de aula fizemos a comunicação com HTTP utilizando verbos GET e POST. No trabalho será necessário utilizar PUT e DELETE também.

## 7 - Utilizar arquivo ou banco de dados para implementar um CRUD completo, isto é:

* [ ] Criar, Ler, Atualizar, e Deletar => Create Read Update Delete
* [ ] Em sala de aula fizemos leitura/escrita em arquivos utilizando NodeJS, mas os
  grupos devem seguir de acordo com a ferramenta de backend escolhida

* [ ] Reafirmando que não é necessário utilizar banco de dados, sendo o uso de arquivos
  suficiente (como visto em aula).

## 8 - A aplicação deverá certificar que o e-mail cadastrado é único, e não existe outro usuário na base com o mesmo e-mail.

## 9 - A aplicação deverá conter as seguintes funcionalidades mínimas:

* [ ] Cadastrar algum recurso: Exemplo 1: Cadastrar avaliação de um jogo. Exemplo 2: Cadastrar raça de um cachorro com a sua descrição e uma imagem. Exemplo 3: Cadastrar benchmarks de placa de vídeo

* [ ] Atualizar algum recurso (como os dos exemplos acima)
* [ ] Remover Algum Recurso (como os do exemplo acima)

* [ ] Ler algum recurso (como os do exemplo acima)



## 10 - Versionamento com git e documentação

* [ ] O projeto deverá ficar disponível em algum repositório público git. Exemplos de hospedagem: GitHub, BitBucket, GitLab.
* [ ] Documentação com README: Descrição do projeto, apresentando o negócio e as tecnologias utilizadas. Descrever o problema que o projeto tenta resolver. Descrever por que é um problema importante.



## 11 - O projeto deverá fazer um uso de alguma API externa.
