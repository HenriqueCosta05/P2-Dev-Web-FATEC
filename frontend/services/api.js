import { getToken } from "../indexedDBUtils.js";

// CRUD de Pokemons
export const getPokemon = async (name) => {
  const tokenData = await getToken();
  const response = await fetch(`http://localhost:8001/pokemon/${name}`, {
    headers: {
      Authorization: `Bearer ${tokenData}`,
    },
  });
  const data = await response.json();
  return data;
};

export const getAllPokemons = async () => {
  const tokenData = await getToken();
  const response = await fetch(`http://localhost:8001/pokemons`, {
    headers: {
      Authorization: `Bearer ${tokenData}`,
    },
  });
  if (response.status === 401) {
    return "Unauthorized";
  }
  const fetchedData = await response.json().then((data) => {
    console.log(data);
    return data;
  });
  return fetchedData;
};

export const createCustomPokemon = async (pokemon) => {
  const tokenData = await getToken();
  const response = await fetch(`http://localhost:8001/pokemons`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${tokenData}`,
    },
    body: JSON.stringify(pokemon),
  });
  const data = await response.json();
  return data;
};

export const updateCustomPokemon = async (pokemonName, newPokemon) => {
  const tokenData = await getToken();
  const response = await fetch(
    `http://localhost:8001/pokemons/${pokemonName}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenData}`,
      },
      body: JSON.stringify(newPokemon),
    }
  );
  const data = await response.json();
  return data;
};

export const deleteCustomPokemon = async (name) => {
  const tokenData = await getToken();
  const response = await fetch(`http://localhost:8001/pokemons/${name}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${tokenData}`,
    },
  });
  const data = await response.json();
  return data;
};

// Recupera dados do CEP e retorna um objeto com as informações do endereço.
export const getAddressInfo = async (cep) => {
  const tokenData = await getToken();
  const response = await fetch(`http://localhost:8001/cep/${cep}`, {
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  });
  const data = await response.json();
  return data;
};
