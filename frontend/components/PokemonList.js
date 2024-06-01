export function initPokemonList() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <h1 class="page_heading">Lista de Pokémons</h1>
        <div class="pokemon_list" id="pokemon-list">
            /* Aqui será exibida a lista de pokémons */
        </div>
    `;

  const pokemonList = document.getElementById("pokemon-list");
}
