# Shopper - Back-End

API Rest desenvolvida em `Node.js` para gerenciar a leitura individualizada de consumo de água e gás, integrando uma API de LLM (Google Gemini) para realizar a leitura da fatura e extrair o número do consumo do mês informado.

### Linguagens, bibliotecas e ferramentas

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

*Para executar esta API, é necessário possuir o `Docker` instalado em sua máquina.*

1. Clone este repositório e acesse a pasta do projeto com os comandos abaixo:

```shell
git clone https://github.com/julianosill/shopper-backend.git
cd shopper-backend
```

2. Crie o arquivo `.env` contendo apenas a chave da API do Google Gemini, seguindo o padrão abaixo:

```
GEMINI_API_KEY=
```
> Ou renomeie o arquivo `.env_sample` para `.env` e adicione o valor na chave da API mencionada acima.

3. Com o `Docker` inicializado e disponível para uso, execute o comando:

```shell
npm run app
```
> Este comando irá executar o `docker compose` para gerar a imagem da aplicação, subir os serviços necessários e, em seguida, executar as `migrations`.

4. Aguarde a mensagem abaixo aparecer em seu terminal:
```
All migrations have been successfully applied.
```
5. A aplicação estará disponível no endereço [http://localhost:3000](http://localhost:3000)

### Encerrando a execução do projeto

Execute o comando abaixo para encerrar a execução da aplicação e excluir os containers:
```shell
docker compose down
```

## Endpoints

- POST `/upload`: rota para envio da fatura a ser lida
- PATCH `/confirm`: rota para confirmação do valor lido
- GET `/:customer_code/list`: rota para listagem de leituras realizadas
- GET `/:customer_code/list?measure_type=`: parâmetro disponível para filtragem por tipo de leitura
- GET `/images/:filename`: rota de acesso à imagem da fatura

## Observações

- A inserção da chave `DATABASE_URL` em ambos os scripts (`package.json` e `docker-compose.yml`) não segue as boas práticas. Desenvolvi desta forma devido à restrição do arquivo `.env`, o qual deve conter apenas a chave da API do Google Gemini. 
  - Em outro cenário, eu criaria arquivos `.env.development` e `.env.prodution` contendo as chaves necessárias em cada ambiente.
- Para disponibilização da imagem da fatura, poderia ter utilizado um `bucket` da AWS. Tenho conhecimento para aplicar, porém devido à restrição citada acima, optei por armazenar na pasta da própria aplicação.