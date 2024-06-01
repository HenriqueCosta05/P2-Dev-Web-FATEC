export function initPokemonForm() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <form id="pokemon-form" class="form pokemon-form">
            <h2 class="form_heading">Cadastro de Pokémon</h2>
            <input type="text" id="name" placeholder="Nome:" required class="input_field">
            <button type="submit" class="form_button">Cadastrar!</button>
    `;

  const form = document.getElementById("pokemon-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const requestURL = `https://pokeapi.co/api/v2/pokemon/${name}`;
    //await registerPokemon(requestURL);
  });
}
