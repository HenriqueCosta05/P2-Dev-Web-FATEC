import { getAllPokemons } from "../services/api.js";
export function initPokemonList() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1 class="page_heading">Lista de Pokémons</h1>
        <div class="pokemon_list" id="pokemon-list">
           
        </div>
    `;
  getAllPokemons()
    .then((data) => {
      const pokemonList = document.getElementById("pokemon-list");
      data.forEach((pokemon) => {
        const pokemonCard = document.createElement("div");
        pokemonCard.innerHTML = `
                  <div class="pokemon_card">
                      <h2 class="pokemon_name">${pokemon.name}</h2>
                      <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon_image"/>
                  </div>
              `;
        pokemonList.appendChild(pokemonCard);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation: ", error);
      if (error.message.startsWith("HTTP error! status: 401")) {
        window.location.hash = "#unauthorized";
      }
    });
}
