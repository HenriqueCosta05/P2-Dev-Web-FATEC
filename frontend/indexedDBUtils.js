// Funções para salvar e recuperar o token de autenticação no IndexedDB
export const saveToken = (token) => {
  const openRequest = indexedDB.open("auth", 1); // Nome do banco de dados e versão

  // Se o banco de dados não existir, cria um novo
  openRequest.onupgradeneeded = function () {
    const db = openRequest.result;
    if (!db.objectStoreNames.contains("tokens")) {
      db.createObjectStore("tokens");
    }
  };
  // Se o banco de dados já existir, apenas abre a conexão
  openRequest.onsuccess = function () {
    const db = openRequest.result;
    const transaction = db.transaction("tokens", "readwrite");
    const tokens = transaction.objectStore("tokens");

    const tokenRequest = tokens.put(token, "token");

    tokenRequest.onsuccess = function () {
      console.log("Token salvo no IndexedDB!");
    };

    tokenRequest.onerror = function () {
      console.log("Error", tokenRequest.error);
    };
  };

  openRequest.onerror = function () {
    console.log("Error", openRequest.error);
  };
};

// Função para remover o token de autenticação do IndexedDB
export const removeToken = () => {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open("auth", 1); // Nome do banco de dados e versão

    // Se o banco de dados não existir, cria um novo
    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("tokens")) {
        db.createObjectStore("tokens");
      }
    };
    // Se o banco de dados já existir, apenas abre a conexão
    openRequest.onsuccess = function () {
      const db = openRequest.result;
      const transaction = db.transaction("tokens", "readwrite");
      const tokens = transaction.objectStore("tokens");

      const clearRequest = tokens.clear();

      clearRequest.onsuccess = function () {
        resolve();
      };

      clearRequest.onerror = function () {
        console.log("Error", clearRequest.error);
        reject(clearRequest.error);
      };
    };

    openRequest.onerror = function () {
      console.log("Error", openRequest.error);
    };
  });
};

// Função para recuperar o token de autenticação do IndexedDB
export const getToken = async () => {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open("auth", 1);

    openRequest.onupgradeneeded = function (event) {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("tokens")) {
        db.createObjectStore("tokens");
      }
    };

    openRequest.onsuccess = function () {
      const db = openRequest.result;
      const transaction = db.transaction("tokens", "readonly");
      const tokens = transaction.objectStore("tokens");
      const tokenRequest = tokens.get("token");

      tokenRequest.onsuccess = function () {
        const adminToken = tokenRequest.result;
        if (adminToken) {
          resolve(adminToken);
        } else {
          reject("Token não encontrado no IndexedDB!");
        }
      };

      tokenRequest.onerror = function () {
        console.log("Error", tokenRequest.error);
        reject(tokenRequest.error);
      };
    };

    openRequest.onerror = function () {
      console.log("Error", openRequest.error);
      reject(openRequest.error);
    };
  });
};
