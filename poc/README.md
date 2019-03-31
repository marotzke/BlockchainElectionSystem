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


## Contrato

O contrato de Election tem uma lista de candidatos. Cada candidato tem um id, um nome e um número de votos. Cada pessoa consegue votar em um candidato com uma transação. É possível olhar o número de votos em um candidato a partir de uma call. Para mais detalhes do funcionamento de transações e calls, olhar as referências.

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

## Referências

[Doc Truffle](https://truffleframework.com/docs/truffle/overview)
[Election Dapp Guide](http://www.dappuniversity.com/articles/the-ultimate-ethereum-dapp-tutorial)
[Pet Shop Truffle Guide](https://truffleframework.com/tutorials/pet-shop)
[Diferença entre Transações e Chamadas](https://truffleframework.com/docs/truffle/getting-started/interacting-with-your-contracts)