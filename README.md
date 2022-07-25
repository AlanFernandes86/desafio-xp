# Desafio-XP - Turma XP - Trybe
Repositório destinado ao versionamento do código para aplicação do desafio de back-end da turma XP.



## Tomadas de decisão

#### 1 - Pesquisas e escolha das tecologias utilizadas

Fiz uma pesquisa e estudo rápido sobre as tecnologias que já tinha tido algum contato ou ouvido falar para decidir quais as que mais faziam sentido para usar no projeto, levando em considerção meu nível de conhecimento atual, o tempo disponível e uma dose de desafio.

Escolhi começar pelas etapas de deploy e docker, são temas que ainda enfrento muito problemas e preferi resolver o quanto antes para evitar maiores contratempos perto do limite da entrega.

Pensei em como iria popular a base de dados e após muita pesquisa na internet encontrei uma API gratuita que escolhi para usar como fonte de dados. https://brapi.dev/docs

#### 2 - Tecnologias utilizadas e justificativas para a escolha

#### Azure

Utilizei o Azure Container Registry para registrar minha imagem docker da aplicação.

O Azure Web App for Containers para implantar a aplicação com continuous deployment habilitado para que toda vez que o registro fosse atualizado, automaticamente fosse realizado o deploy.

Para automatização criei uma action no github para que toda vez que minha branch main é atualizada a aplicação automaticamente é dockenizada e atualizada no registro do azure.

#### Banco de dados relacional - MySQL 

Fiz o diagrama de entidade e relacionamento, me facilita muito na hora de ir desenvolvendo as entidades e  relacionamentos e até mesmo o código da aplicação.

![der](./images/der.jpg)



#### Docker

Para garantir que a aplicação funcione em qualquer máquina e facilita na hora do desenvolvimento e testar o app localmente.

#### Node.js com Express

Ambiente e framework que já estou familiarizado por utilizar no curso da Trybe.

#### Typescript

Preferi o typescript e relação ao javascript por possuir as tipagem, ser uma linguaguem que ajuda a minimizar erros e melhor suporte com a utilização de classes, interfaces e enums.

#### JSON Web Tokens

Bliblioteca que tenho conhecimento no momento sobre como utilizar e indicada no desfio para ser utilizada.

#### Jest 

Ainda não tinha testado back end com o jest, é uma excelente opção para testes, com uma documentação super detalhada que me ajuda muito.

#### TypeORM

Nunca tinha utilizado, no curso utilizamos o Sequelize que confesso que não gostei muito.

Então decidi testar uma opção diferente após dar uma olhada na documentação que é bem simples e fácil de entender. E tem bastante conteúdo na internet com tutorias e video aulas no youtube o que me ajudou bastante na escolha.

#### Swagger

Foi API de documentação indicada para o desafio, porém não consegui infelizmente utilizar a tempo.


## Instalação

O aplicativo pode ser executado diretamenta na máquina do usuário** ou através de um container docker.

Para ambos os casos será necessário criar um arquivo .env na pasta raiz do projeto com as variáves de ambiente, como exemplo abaixo:

DB_HOSTNAME=localhost
DB_NAME=desafioxp
DB_USER=admin
DB_PASSWORD=123456
DB_PORT=3306
PORT=3001
JWT_SECRET=desafioxp
UUID_SECRET=2b4c94c9-f377-4893-8bee-f77bcb50e77f

pode ser gerado um novo UUID_SECRET em: 
https://www.uuidgenerator.net/



#### Após criar o arquivo .env:

#### Para rodar a aplicação diretamente na máquina:

- npm install

Instale as dependências do projeto.

- npm run dev

Executa o projeto em modo de desenvolvimento.

Obs**. será necessário indicar um banco de dados MySql com a database já criada e seu nome indicado no DB_NAME no arquivo .env somente para o caso de rodar localmente.



#### Para rodar a aplicação com docker:

- docker-compose up --build -d

Para criar as imagens docker e inicializar o container.

A aplicação irá rodar nas portas indicadas no .env.



#### Para rodar os testes:

- npm run test



## Endpoints da aplicação

### POST /auth/new-client

###### JSON:

{
  "name": "Alan Fernandes",
  "username": "usuario",
  "password": "senha123"
}

###### SAÍDA ESPERADA:

{
	"clientId": 2,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFsYW4gRmVybmFuZGVzIiwidXNlcm5hbWUiOiJ1c3VhcmlvIiwiY3JlYXRlZEF0IjoiMjAyMi0wNy0yNFQyMzo0NDowMy4zMThaIiwidXBkYXRlZEF0IjoiMjAyMi0wNy0yNFQyMzo0NDowMy4zMThaIiwiaWF0IjoxNjU4NzA2MjQzLCJleHAiOjE2NTg3OTI2NDN9.-Tu54F6DUfD158IzgpDIwZ-lKlyHyFzumazP5PbG2fA"
}



### POST /auth/login

###### JSON:

{
   "username": "usuario",
  "password": "senha123"
}

###### SAÍDA ESPERADA:

{
	"client": {
		"id": 2,
		"name": "Alan Fernandes",
		"username": "usuario",
		"password": "7f1ddfc7-7043-5aea-9161-5468a2254751",
		"account": {
			"id": 2,
			"balance": 0,
			"createdAt": "2022-07-24T23:44:03.333Z",
			"updatedAt": "2022-07-24T23:44:03.333Z"
		},
		"wallet": {
			"id": 2,
			"createdAt": "2022-07-24T23:44:03.329Z",
			"updatedAt": "2022-07-24T23:44:03.329Z"
		},
		"createdAt": "2022-07-24T23:44:03.318Z",
		"updatedAt": "2022-07-24T23:44:03.318Z"
	},
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkFsYW4gRmVybmFuZGVzIiwidXNlcm5hbWUiOiJ1c3VhcmlvIiwiY3JlYXRlZEF0IjoiMjAyMi0wNy0yNFQyMzo0NDowMy4zMThaIiwidXBkYXRlZEF0IjoiMjAyMi0wNy0yNFQyMzo0NDowMy4zMThaIiwiaWF0IjoxNjU4NzA2MzI5LCJleHAiOjE2NTg3OTI3Mjl9.uIaplVQrLSjJxsPMFYp9vq5BHlpjXbP318lj9LSKS4U"
}

### ***Os próximos endpois precisam do token que deve ser enviado no campo "Authorization" no header da requisição.***

### POST /conta/deposito

###### JSON:

{
  "codCliente": 1,
  "valor": 1500
}

###### SAÍDA ESPERADA:

{
	"clientId": 1,
	"accountId": 1,
	"oldBalance": 0,
	"newBalance": 1500
}

### POST /conta/saque

###### JSON:

{
  "codCliente": 1,
  "valor": 1000
}

###### SAÍDA ESPERADA:

{
	"clientId": 1,
	"accountId": 1,
	"oldBalance": 1500,
	"newBalance": 500
}

### GET /conta/{codCliente}

###### SAÍDA ESPERADA:

{
	"id": 1,
	"balance": 500,
	"createdAt": "2022-07-24T22:35:47.152Z",
	"updatedAt": "2022-07-24T23:48:47.000Z"
}

### GET /investimentos/ativos/{codAtivo}

###### SAÍDA ESPERADA:

{
	"id": 5,
	"codAcao": "AZUL4",
	"shortName": "AZUL        PN      N2",
	"longName": "Azul S.A.",
	"marketPrice": 11.58,
	"marketDayLow": 0,
	"marketDayHigh": 0,
	"marketChange": -0.53,
	"marketChangePercent": -4.3765464,
	"marketTime": "2022-07-22T17:07:30.000Z",
	"totalQuantity": 100000,
	"availableQuantity": 100000,
	"companyLogoUrl": "https://s3-symbol-logo.tradingview.com/azul--big.svg",
	"createdAt": "2022-07-24T22:33:31.385Z",
	"updatedAt": "2022-07-24T22:33:31.385Z"
}

### POST /investimentos/comprar

###### JSON:

{
	"codCliente": 1,
 	"codAtivo": 5,
	"qtdeAtivo": 1
}

###### SAÍDA ESPERADA:

{
	"codCliente": 1,
	"codAtivo": 5,
	"quantityTransacted": 2,
	"oldBalance": 500,
	"newBalance": 476.84,
	"transactionValue": 23.16,
	"transactionType": "buy"
}

### POST /investimentos/vender

###### JSON:

{
	"codCliente": 1,
 	"codAtivo": 5,
	"qtdeAtivo": 1
}

###### SAÍDA ESPERADA:

{
	"codCliente": 1,
	"codAtivo": 5,
	"quantityTransacted": 1,
	"oldBalance": 476.84,
	"newBalance": 488.41999,
	"transactionValue": 11.58,
	"transactionType": "sell"
}

### GET /conta/ativos/{codCliente}

###### SAÍDA ESPERADA:

[
	{
		"codCliente": 1,
		"codAtivo": 5,
		"ativo": {
			"id": 5,
			"codAcao": "AZUL4",
			"shortName": "AZUL        PN      N2",
			"longName": "Azul S.A.",
			"marketPrice": 11.58,
			"marketDayLow": 0,
			"marketDayHigh": 0,
			"marketChange": -0.53,
			"marketChangePercent": -4.3765464,
			"marketTime": "2022-07-22T17:07:30.000Z",
			"totalQuantity": 100000,
			"availableQuantity": 99999,
			"companyLogoUrl": "https://s3-symbol-logo.tradingview.com/azul--big.svg",
			"createdAt": "2022-07-24T22:33:31.385Z",
			"updatedAt": "2022-07-24T23:53:53.000Z"
		},
		"qtdeAtivo": 1,
		"valor": 11.58
	}
]

### GET /investimentos/ativos

###### SAÍDA ESPERADA:

{
	"purchased": [
		{
			"id": 5,
			"codAcao": "AZUL4",
			"shortName": "AZUL        PN      N2",
			"longName": "Azul S.A.",
			"marketPrice": 11.58,
			"marketDayLow": 0,
			"marketDayHigh": 0,
			"marketChange": -0.53,
			"marketChangePercent": -4.3765464,
			"marketTime": "2022-07-22T17:07:30.000Z",
			"totalQuantity": 100000,
			"availableQuantity": 99999,
			"companyLogoUrl": "https://s3-symbol-logo.tradingview.com/azul--big.svg",
			"createdAt": "2022-07-24T22:33:31.385Z",
			"updatedAt": "2022-07-24T23:53:53.000Z",
			"purchasedQuantity": 1
		}
	],
	"available": [
		{
			"id": 1,
			"codAcao": "ABEV3",
			"shortName": "AMBEV S/A   ON",
			"longName": "Ambev S.A.",
			"marketPrice": 14.51,
			"marketDayLow": 0,
			"marketDayHigh": 0,
			"marketChange": -0.05,
			"marketChangePercent": -0.3434079,
			"marketTime": "2022-07-22T17:07:00.000Z",
			"totalQuantity": 100000,
			"availableQuantity": 100000,
			"companyLogoUrl": "https://s3-symbol-logo.tradingview.com/ambev--big.svg",
			"createdAt": "2022-07-24T22:33:31.385Z",
			"updatedAt": "2022-07-24T22:33:31.385Z"
		},
		{
			"id": 2,
			"codAcao": "ALPA4",
			"shortName": "ALPARGATAS  PN      N1",
			"longName": "Alpargatas S.A.",
			"marketPrice": 20.63,
			"marketDayLow": 0,
			"marketDayHigh": 0,
			"marketChange": -0.08,
			"marketChangePercent": -0.3862865,
			"marketTime": "2022-07-22T17:07:56.000Z",
			"totalQuantity": 100000,
			"availableQuantity": 100000,
			"companyLogoUrl": "https://s3-symbol-logo.tradingview.com/alpargatas--big.svg",
			"createdAt": "2022-07-24T22:33:31.385Z",
			"updatedAt": "2022-07-24T22:33:31.385Z"
		},
		{
			"id": 3,
			"codAcao": "AMER3",
			"shortName": "AMERICANAS  ON      NM",
			"longName": "Americanas S.A.",
			"marketPrice": 15.93,
			"marketDayLow": 0,
			"marketDayHigh": 0,
			"marketChange": -1,
			"marketChangePercent": -5.9066744,
			"marketTime": "2022-07-22T17:07:52.000Z",
			"totalQuantity": 100000,
			"availableQuantity": 100000,
			"companyLogoUrl": "https://s3-symbol-logo.tradingview.com/americanas--big.svg",
			"createdAt": "2022-07-24T22:33:31.385Z",
			"updatedAt": "2022-07-24T22:33:31.385Z"
		},
		{
			"id": 4,
			"codAcao": "ASAI3",
			"shortName": "ASSAI       ON      NM",
			"longName": "Sendas Distribuidora S.A.",
			"marketPrice": 15.65,
			"marketDayLow": 0,
			"marketDayHigh": 0,
			"marketChange": 0.24,
			"marketChangePercent": 1.5574287,
			"marketTime": "2022-07-22T17:07:32.000Z",
			"totalQuantity": 100000,
			"availableQuantity": 100000,
			"companyLogoUrl": "https://s3-symbol-logo.tradingview.com/assai-on-nm--big.svg",
			"createdAt": "2022-07-24T22:33:31.385Z",
			"updatedAt": "2022-07-24T22:33:31.385Z"
		},
		{
			"id": 6,
			"codAcao": "B3SA3",
			"shortName": "B3          ON      NM",
			"longName": "B3 S.A. - Brasil, Bolsa, Balcão",
			"marketPrice": 10.72,
			"marketDayLow": 0,
			"marketDayHigh": 0,
			"marketChange": -0.29,
			"marketChangePercent": -2.6339688,
			"marketTime": "2022-07-22T17:07:56.000Z",
			"totalQuantity": 100000,
			"availableQuantity": 100000,
			"companyLogoUrl": "https://s3-symbol-logo.tradingview.com/b3-on-nm--big.svg",
			"createdAt": "2022-07-24T22:33:31.385Z",
			"updatedAt": "2022-07-24T22:33:31.385Z"
		},

​		{

​			TODOS OS ATIVOS DISPONÍVEIS,

​		},

​	]

​	

Muito obrigado pelo seu tempo em ler este documento.  (=
josefernandes.alan@gmail.com