# Conversor de Moedas - Desafio Técnico Grupo SBF

## Descrição

Este projeto é uma aplicação Node.js que permite a conversão de moedas em tempo real, com descontos aplicados em horários específicos, documentação Swagger, monitoramento com Pino e banco de dados em cache.

## Funcionalidades

- Conversão de moedas em tempo real
- Regras de negócio para aplicar descontos em horários específicos
- Documentação Swagger para fácil teste e entendimento
- Monitoramento de métricas com Pino
- Uso de um banco de dados em cache para otimizar a latência de resposta

## API Externa

Para buscar os valores de conversão, foi utilizada a API externa Awesome API, [aqui](https://docs.awesomeapi.com.br/api-de-moedas#legendas).

Caso seja necessário alterar as moedas a serem utilizadas para a conversão, é necessário alterar a rota presente no arquivo `request.js`, bem como o objeto `currencyMap` em `currencyConverterServices`.


## Banco de Dados em Cache

A fim de otimizar a latência de resposta da API, este projeto utiliza um banco de dados em cache. A utilização de um banco de dados em cache é fundamental para armazenar as cotações de moedas previamente buscadas na API Awesome e retorná-las de forma rápida, economizando tempo e recursos. O banco utilizado foi o Node Cache, cuja documentação está [aqui](https://www.npmjs.com/package/node-cache).

### Atualização dos Dados

O banco de dados em cache é atualizado a cada 30 minutos, mediante requisição, para garantir que as cotações estejam sempre atualizadas. Esse intervalo de atualização mantém as informações relevantes e precisas para as conversões de moedas em tempo real.

## Como Usar

### Conversão de Moedas

Para converter um valor em real para outras moedas, acesse a seguinte URL:

```bash
  http://localhost:3001/converter/BRL/:amount
```

Substitua `:amount` pelo valor em real que deseja converter, observando que as casas decimais devem ser demarcadas através de ponto (`.` - exemplo: `562.56`).

### Regras de Negócio

O projeto respeita as seguintes regras de negócio:

- **Sábados, das 22 horas até 05 horas de domingo:** Todos os preços têm 10% de desconto. Se o valor for maior que R$2000, o desconto é de 15%.
- **Segunda a sexta, das 19 horas até meia-noite:** Os valores acima de R$3000 têm desconto de 5%.

### Documentação Swagger

O projeto inclui documentação Swagger para facilitar o teste e o entendimento do endpoint da API. É possível acessar a documentação [aqui](http://localhost:3001/api-docs/).

### Monitoramento com Pino

O Pino é uma ferramenta de monitoramento que registra métricas importantes da aplicação. As métricas podem ser visualizadas no console do Docker. Um exemplo de saída da mensagem de monitoramento, ao fazer a requisição pelo ThunderClient, é:

```bash
{"level":30,"time":1697586398298,"pid":4746,"hostname":"97a15553edca","req":{"id":2,"method":"GET","url":"/converter/BRL/100","query":{},"params":{},"headers":{"accept-encoding":"gzip, deflate, br","accept":"*/*","user-agent":"Thunder Client (https://www.thunderclient.com)","host":"localhost:3001","connection":"close"},"remoteAddress":"::ffff:172.21.0.1","remotePort":55458},"res":{"statusCode":200,"headers":{"x-powered-by":"Express","content-type":"application/json; charset=utf-8","content-length":"45","etag":"W/\"2d-AAEKpyHh563DX2vNDBsalAD6EOk\""}},"responseTime":1,"msg":"request completed"}
```

Já a requisição feita pelo Swagger, traz como resposta:

```bash
{"level":30,"time":1697653409179,"pid":31,"hostname":"ffe6de842e6a","req":{"id":9,"method":"GET","url":"/converter/BRL/1000","query":{},"params":{},"headers":{"host":"localhost:3001","connection":"keep-alive","sec-ch-ua":"\"Chromium\";v=\"118\", \"Google Chrome\";v=\"118\", \"Not=A?Brand\";v=\"99\"","accept":"*/*","dnt":"1","sec-ch-ua-mobile":"?0","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36","sec-ch-ua-platform":"\"macOS\"","sec-fetch-site":"same-origin","sec-fetch-mode":"cors","sec-fetch-dest":"empty","referer":"http://localhost:3001/api-docs/","accept-encoding":"gzip, deflate, br","accept-language":"pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7"},"remoteAddress":"::ffff:172.22.0.1","remotePort":60164},"res":{"statusCode":200,"headers":{"x-powered-by":"Express","content-type":"application/json; charset=utf-8","content-length":"48","etag":"W/\"30-J62VND0xEQ9EWFM+MsOaBX3zIww\""}},"responseTime":8,"msg":"request completed"}
```

Uma importante informação que observamos na mensagem é o tempo de resposta (responseTime), que traz o tempo total entre a requisição e o retorno. Assim, é possível verificar e monitorar esse tempo.

A documentação do Pino está [aqui](https://getpino.io/#/);


## Iniciando a Aplicação

Para iniciar a aplicação, siga estas etapas:

1. Clone este repositório.

2. Certifique-se de ter o Docker instalado.

3. Rode o comando npm install

4. Renomeie o arquivo `env.example` para `.env`, e informe a porta em que a aplicação rodará (3001, por padrão).

5. Execute o seguinte comando para subir a aplicação:

```bash
npm run compose:up
```
É necessário renomear o arquivo `env.example` para `.env`, e informar a porta a ser utilizada (3001, por padrão).

A aplicação será iniciada assim que o Docker Compose concluir. Para ver os logs, execute o seguinte comando no terminal:

```bash
docker logs --tail 1000 -f convertion_api
```
 

## Testando a Aplicação

Você pode testar a aplicação usando a documentação Swagger mencionada anteriormente. Basta acessar a URL http://localhost:3001/api-docs/.

## Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

```javascript
Axios
Express
Express-Pino-Logger
Luxon
Node-Cache
Nodemon
Pino
Pino-Pretty
Swagger-JSDoc
Swagger-UI-Express
```

## Testes
O projeto inclui testes unitários feito com Jest, e teste de integração feito com o Supertest. Para tanto, foram instaladas, em ambiente de desenvolvimento, as bibliotecas:

```javascript
Jest
Jest-Date-Mock
Supertest
```

Para executar os testes, execute na raiz do projeto e fora do container, o seguinte comando:

```bash
npm test
```
