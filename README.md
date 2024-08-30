# Shopper - Back-End

API Rest desenvolvida em `Node.js` para gerenciar a leitura individualizada de consumo de água e gás, integrando uma API de LLM (Google Gemini) para realizar a leitura da fatura e extrair o número do consumo do mês informado.

## Linguagens, bibliotecas e ferramentas

![node.js](https://img.shields.io/badge/node.js-292b36?style=for-the-badge&logo=node.js)
![typescript](https://img.shields.io/badge/typescript-292b36?style=for-the-badge&logo=typescript)
![fastify](https://img.shields.io/badge/fastify-292b36?style=for-the-badge&logo=fastify)
![zod](https://img.shields.io/badge/zod-292b36?style=for-the-badge&logo=zod)
![postgresql](https://img.shields.io/badge/postgresql-292b36?style=for-the-badge&logo=postgresql)
![prisma](https://img.shields.io/badge/prisma-292b36?style=for-the-badge&logo=prisma)
![google](https://img.shields.io/badge/google_gemini-292b36?style=for-the-badge&logo=google)
![docker](https://img.shields.io/badge/docker-292b36?style=for-the-badge&logo=docker)

- `Fastify`: framework leve e rápido para gerenciamento de rotas da aplicação;
- `Zod`: biblioteca para validação dos dados das requisições;
- `PostgreSQL`: banco de dados para persistência das leituras;
- `Prisma`: ORM para integração da aplicação ao banco de dados;
- `Docker`: ferramenta para criar, subir e executar a imagem da aplicação e banco de dados em containers.

## Requisitos da aplicação

- Deve consumir um arquivo `.env`, que será criado na pasta raíz da aplicação, contendo uma única chave de API (`GEMINI_API_KEY`);
- Deve ser possível subir toda a aplicação e serviços necessários em containers executando apenas um comando;
- Retornar respostas de sucesso e falha com `Status Code`, `error_code` e `error_description` conforme a tabela de especificações da documentação deste teste;
- Disponiblizar uma `URL` de acesso à imagem da fatura enviada.

## Executando o projeto

*Para executar esta API, é necessário possuir o `Docker` instalado.*

1. Clone este repositório com o comando:

```shell
git clone https://github.com/julianosill/shopper-backend.git
```

2. Acesse a pasta do projeto, executando:

```shell
cd shopper-backend
```

3. Crie o arquivo `.env` contendo apenas a chave da API do Google Gemini, seguindo o padrão abaixo:

```
GEMINI_API_KEY=
```
> Ou renomeie o arquivo `.env_sample`, adicionando o valor na chave da API mencionada acima.

4. Com o `Docker` já inicializado e disponível para uso, execute o comando:

```shell
npm run app
```
5. O `Docker` irá gerar o *build* da imagem e irá subir os serviços necessários (aplicação e banco de dados). Aguarde a mensagem abaixo aparecer em seu terminal:
```
All migrations have been successfully applied.
```
6. A aplicação estará disponível no endereço [http://localhost:3000](http://localhost:3000)