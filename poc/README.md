Esse POC busca implementar uma simples versão de um sistema eleitoral com smart contracts em um blockchain Ethereum.

## Requisitos

- Truffle
- Ganache CLI

Caso tenha npm, pode instalar as duas dependências com o seguinte comando:

`npm install -g ganache-cli truffle`


## Utilização

Rode o Ganache CLI para clicar um blockchain ethereum de desenvolvimento.

`ganache-cli`

Compile e rode os migrations do Truffle para criar os contratos iniciais (Criar os candidatos iniciais)


## Votando

Para testar os votos, use o Console do Truffle:

`truffle console`

No console, crie uma instância do app com o contrato de Eleição

`let instance = await Election.deployed()`

E para votar em um candidato, vote no id do mesmo pelo console

`instance.vote(1)`

Isso irá criar uma transação no blockchain e armazenar o voto para o candidado de ID 1.

Para visualizar o número de votos do cadidato:

```
let voteCount = await instance.getCandidateVoteCount(1)
voteCount.toNumber()
```