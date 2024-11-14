<h1 align="center">Ebac_M24_APIs_Cypress</h1>

## Configurando o Ambiente

- [Cypress.io](http://www.cypress.io)

- [Documentação Cypress](https://docs.cypress.io/guides/overview/why-cypress.html)

### Requisitos para instalação

- [Node.js](https://nodejs.org/en/)
- [Java 8 ou superrior caso use o Allure Report](https://javadl.oracle.com/webapps/download/AutoDL?BundleId=244036_89d678f2be164786b292527658ca1605)

### Instalação do NPM e instalação do Cypress

Na pasta do projeto abra o terminal ou no VSCode use o Ctrl + ' (aspas simples), e digite os comandos abaixo:

```shell
npm init -y
npm install --yes
npm install cypress@13.15.2 -D
npm i faker-br --dev
```

### Comandos para iniciar o Cypress

#### Iniciar o Cypress no navegador

```shell
   npx cypress open
```

#### Para executar em modo headless

```shell
   npx cypress run
```
