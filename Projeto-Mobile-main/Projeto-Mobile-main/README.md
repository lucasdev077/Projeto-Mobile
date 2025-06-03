<div align="center">

![Status do Projeto](https://img.shields.io/badge/Status-Em%20Desenvolvimento-green)
![Versão](https://img.shields.io/badge/Versão-1.0.0-blue)
![Licença](https://img.shields.io/badge/Licença-Privada-red)

</div>

Aplicação CRUD em React com API CarImageAPI Esta é uma aplicação CRUD (Criar, Ler, Atualizar, Deletar) construída com React Native, utilizando a API CarImage para gerenciar imagens de carro.

Funcionalidades ✨ 
```
Listar carros: Busca e exibe uma lista de carros da API CarImage.
 📜 Criar carro: Adiciona novos carros (simulado, pois a API CarImage é somente leitura para uso público).
 ➕ Atualizar Jogo: Edita detalhes de jogos (simulado localmente).
 ✏️ Deletar Jogo: Remove jogos do estado local.
 🗑️ Interface Responsiva: dispositivos móveis.
 📱
```

Tecnologias Utilizadas 🛠️
```
ReactNative: Biblioteca para construção da interface de usuário. 
CarImage API: API externa para obtenção de img de carros. 
Axios: Para realizar requisições HTTP à API.
react-navigation (para navegação)
Expo

```

Pré-requisitos ✅ Node.js (versão 16 ou superior) 🟢 Uma chave de API CarImage 🔑

Instalação 🧑‍💻 Clone o repositório: git clone (https://github.com/lucasdev077/Projeto-Mobile) cd Projeto-Mobile

Instale as dependências: npm install

Inicie o servidor de desenvolvimento: npm run dev

Estrutura de pastas:
```
FRONT-MOBILE-FEITO-EM-REACTNATIVE
├── .expo
├── assets
├── components
│   ├── CarCard.jsx
│   └── Header.jsx
├── contexts
│   ├── FavoritesContext.jsx
│   └── ThemeContext.jsx
├── node_modules
├── screens
│   ├── FavoritosScreens.jsx
│   └── HomeScreen.jsx
├── services
│   └── api.js
├── .gitignore
├── App.js
├── App.json
├── index.js
├── package-lock.json
├── package.json
```

Uso 🎯 Pesquisa: Use a barra de pesquisa para filtrar carros por nome (filtro no lado do cliente). 🔍 Adicionar carro: Basta ir até o carro que pesquisou na barra de pesquisa. Editar carro: Clique no botão "Editar" em um card de carro para atualizar seus detalhes(avaliação e descrição). Deletar carro: Clique no botão "Deletar" para remover um carro da lista. Pesquisa: Use a barra de pesquisa para filtrar carros por nome (filtro no lado do cliente). 🔍

Integração com a API 🌐 A aplicação utiliza a API CarImage para buscar imagens de carros. Endpoints principais:

GET /car/listar: Obtém uma lista de carros. 📋

Nota: A API CarImage é somente leitura para usuários públicos, então as operações de Criar/Atualizar/Deletar são simuladas no estado local da aplicação.

Scripts 📜 npm run dev: Inicia o servidor de desenvolvimento. npm run build: Gera a build para produção.

Dependências 📦:

->react-native

->expo

->axios

->@react-navigation/native (para navegação)

->react-native-paper ou react-native-elements (para UI, opcional)

Feito por lucas, Gabriel e matheus

![image](https://github.com/user-attachments/assets/e4c33ae8-4fd7-4111-814a-3a43e093bd0e) ![image](https://github.com/user-attachments/assets/9014a7c4-a3af-432a-b0b1-2c3a5411c2f3)


