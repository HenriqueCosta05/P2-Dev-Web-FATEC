# PokeCEP

## Descrição do Projeto

O projeto `PokeCEP` tem como objetivo demonstrar compreensão dos conceitos de consumo de APIs, estratégias de cache, autenticação com JWT e integração com MongoDB utilizando FastAPI.

## Funcionalidades

O projeto consiste em uma simples interface de usuário, utilizando JavaScript, HTML e CSS, onde é possível realizar as quatro operações mencionadas na descrição do projeto.

Além disso, o servidor da aplicação foi interamente construído utilizando-se Python e FastAPI, utilizando banco de dados não-relacional (MongoDB), além de ferramentas auxiliares de autenticação como JWT.

## Pré-requisitos

Para que seja possível executar eficientemente o projeto e comparar as diferenças de funcionalidade entre os diferentes tipos de bancos de dados, o usuário deve ter instalado as seguintes dependências em sua máquina:

⚠️ [Python](https://www.python.org/downloads/)

⚠️ [MongoDB](https://www.mongodb.com/try/download/community)

## Como rodar a aplicação ▶️

1. No terminal, clone o projeto:

   ```
   https://github.com/HenriqueCosta05/P2-Dev-Web-FATEC
   ```

2. Navegar no diretório backend e criar o ambientes virtual de desenvolvimento, aqui nomeado de backend:

   ```
   cd backend

   python -m venv backend
   ```

3. Ativar o ambiente de desenvolvimento python, dentro da pasta `backend`:

   ```python
    # Windows
   backend\Scripts\activate

   # Linux ou MacOS
   source backend/bin/activate
   ```

4. Instalar as dependências necessárias para o funcionamento do servidor, utilizando-se do seguinte comando:

```
    pip install -r requirements.txt
```

5. Executar a aplicação, executando-se os seguintes comandos:

```
    uvicorn main:app --reload --port 8001
```

6. Abrir outro terminal, navegar para a pasta `frontend` e ativar o live-server.

```javascript
cd frontend
npx live-server //Aqui, poderá ser requerido instalar o live-server, caso seja a primeira vez que o usuário o utilize.
```

## Como a aplicação foi construída?

### Backend

A aplicação no backend consiste em quatro tipos principais de componentes: models (`models.py` e `schemas.py`), database helpers (`crud.py` e `database.py`), controllers (dentro do diretório `routers`) e authentication helpers (`auth.py`).

#### 1. Database helpers

Utilizam-se de funções do MongoDB para manipular dados, com os quatro métodos mais conhecidos: POST, DELETE, PUT e GET.

#### 2. Models

Modelos definem a estrutura dos dados armazenados, incluindo os tipos de campo a serem preenchidos ou não.

#### 3. Controllers

São os endpoints do servidor, os quais o cliente (ou frontend) manipula para obter e atualizar informações no banco de dados.

#### 4. Helpers de Autenticação

São funções auxiliares que servem para verificar e criar tokens JWT, além de decodificá-los para obter o usuário correspondente à sessão.

> [!TIP]
> Os endpoints privados da aplicação possuem dependência com esses helpers de autenticação, de forma que o servidor apenas executa as ações correspondentes através da autenticação prévia do usuário.

### Frontend

O frontend da aplicação é construído principalmente com JavaScript e CSS, e consiste em vários componentes principais:

#### 1. Componentes

Os componentes são partes reutilizáveis da interface do usuário que são definidas em arquivos JavaScript separados na pasta `frontend/components/`. Alguns exemplos incluem:

- `LoginForm.js`: Este é o formulário de login que os usuários usam para entrar na aplicação.

- `RegisterForm.js`: Este é o formulário que os usuários usam para se registrar na aplicação.

- `PokemonForm.js`: Este é o formulário usado para adicionar novos Pokémons.
  PokemonList.js: Este componente exibe a lista de Pokémons.

#### 2. Serviços

Os serviços são funções auxiliares que lidam com a lógica de negócios e a comunicação com o backend. Eles estão localizados na pasta `frontend/services/`. Alguns exemplos incluem:

- `api.js`: Este arquivo contém funções para fazer chamadas API para o backend.

- `auth.js`: Este arquivo contém funções para lidar com a autenticação do usuário.

#### 3. Estilos

Os estilos são definidos em arquivos CSS separados na pasta `frontend/styles/`. Cada componente tem seu próprio arquivo CSS, como `login-form.css`, `register-form.css`, `pokemon-form.css`, etc.

#### 4. IndexedDB

O arquivo `indexedDBUtils.js` contém funções para interagir com o IndexedDB, um banco de dados no navegador, para armazenar dados localmente.

5. Service Worker
   O arquivo `cache.js` registra um service worker para permitir o armazenamento em cache de recursos para funcionamento offline.

6. App.js
   O arquivo `app.js` é o ponto de entrada da aplicação no frontend. Ele inicializa a aplicação e lida com a renderização dos componentes na página.

> [!TIP]
> A aplicação frontend é servida usando o live-server, que pode ser iniciado com o comando npx live-server no diretório frontend/.
