import { getAddressInfo, createCustomPokemon } from "../services/api.js";

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
