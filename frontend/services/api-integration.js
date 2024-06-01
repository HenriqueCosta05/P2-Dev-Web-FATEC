// Recupera dados da API do Pokemón e retorna um objeto com as informações do Pokemón.
export const getPokemon = async (name) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const data = await response.json();
  return data;
};

// Recupera dados do CEP e retorna um objeto com as informações do endereço.
export const getAddressInfo = async (cep) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const data = await response.json();
  return data;
};
