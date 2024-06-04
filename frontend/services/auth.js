import { saveToken, getToken } from "../indexedDBUtils.js";

export const register = async (loginData) => {
  const response = await fetch("http://localhost:8001/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  });
  const data = await response.json();
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
