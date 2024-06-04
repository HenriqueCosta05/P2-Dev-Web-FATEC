import { saveToken, getToken, removeToken } from "../indexedDBUtils.js";

export const register = async (loginData) => {
  const response = await fetch("http://localhost:8001/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  const data = await response
    .json()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("Erro ao cadastrar usuário: ", error);
      alert("Erro ao cadastrar usuário: ", error);
      return error;
    });
  return data;
};

export const login = async (username, password) => {
  const response = await fetch("http://localhost:8001/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json();
  saveToken(data.access_token);
  return data;
};

export const logout = async () => {
  const token = await getToken().then((token) => {
    return token;
  });
  if (token) {
    removeToken();
  }
};
