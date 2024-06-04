import {
  getAddressInfo,
  createCustomPokemon,
  getPokemon,
  updateCustomPokemon,
} from "../services/api.js";

export function initPokemonForm() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <form id="pokemon-form" class="form pokemon-form">
            <h2 class="form_heading">Cadastro de Pokémon</h2>
            <input type="text" id="name" placeholder="Nome:" required class="input_field">
            <input type="text" id="cep" placeholder="CEP:" required class="input_field" required />
            <input type="text" id="endereco" placeholder="Endereço:" required class="input_field" />
            <input type="text" id="numero" placeholder="Número:" required class="input_field" />
            <input type="text" id="complemento" placeholder="Complemento:"  class="input_field" />
            <input type="text" id="bairro" placeholder="Bairro:" required class="input_field" />
            <input type="text" id="cidade" placeholder="Cidade:" required class="input_field" />
            <input type="text" id="estado" placeholder="Estado:" required class="input_field" />
            <button type="submit" class="form_button">Cadastrar!</button>
    `;

  const cepInput = document.getElementById("cep");
  cepInput.addEventListener("blur", async (event) => {
    const cep = event.target.value;
    if (cep.length === 8) {
      const data = await getAddressInfo(cep);
      document.getElementById("endereco").value = data.logradouro;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("estado").value = data.uf;
    }
  });

  const form = document.getElementById("pokemon-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const cep = document.getElementById("cep").value;
    const endereco = document.getElementById("endereco").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;

    const pokemon = {
      name,
      cep,
      endereco,
      bairro,
      cidade,
      estado,
      numero,
      complemento,
    };

    const data = await createCustomPokemon(pokemon);
    if (data.error) {
      alert(data.message);
    } else {
      alert("Pokemon cadastrado com sucesso!");
      window.location.href = "/#pokemons";
    }
  });
}

export async function initPokemonEditForm(pokemonName) {
  const pokemon = await getPokemon(pokemonName);
  const app = document.getElementById("app");
  app.innerHTML = `
        <form id="pokemon-form" class="form pokemon-form">
            <h2 class="form_heading">Editar Pokémon</h2>
            <input type="text" id="name" value="${pokemon.name}" required class="input_field">
            <input type="text" id="cep" value="${pokemon.cep}" required class="input_field" required />
            <input type="text" id="endereco" value="${pokemon.endereco}" required class="input_field" />
            <input type="text" id="numero" value="${pokemon.numero}" required class="input_field" />
            <input type="text" id="complemento" value="${pokemon.complemento}"  class="input_field" />
            <input type="text" id="bairro" value="${pokemon.bairro}" required class="input_field" />
            <input type="text" id="cidade" value="${pokemon.cidade}" required class="input_field" />
            <input type="text" id="estado" value="${pokemon.estado}" required class="input_field" />
            <button type="submit" class="form_button">Salvar!</button>
    `;
  const cepInput = document.getElementById("cep");
  cepInput.addEventListener("blur", async (event) => {
    const cep = event.target.value;
    if (cep.length === 8) {
      const data = await getAddressInfo(cep);
      document.getElementById("endereco").value = data.logradouro;
      document.getElementById("bairro").value = data.bairro;
      document.getElementById("cidade").value = data.localidade;
      document.getElementById("estado").value = data.uf;
    }
  });
  const form = document.getElementById("pokemon-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const cep = document.getElementById("cep").value;
    const endereco = document.getElementById("endereco").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;
    const updatedPokemon = {
      name,
      cep,
      endereco,
      bairro,
      cidade,
      estado,
      numero,
      complemento,
    };
    console.log(updatedPokemon);
    const oldPokemonName =
      window.location.hash.length > 0 ? window.location.hash.split("/")[1] : "";
    const data = await updateCustomPokemon(oldPokemonName, updatedPokemon);
    if (data.error) {
      alert(data.message);
    } else {
      alert("Pokemon atualizado com sucesso!");
      window.location.href = "/#pokemons";
    }
  });
}
