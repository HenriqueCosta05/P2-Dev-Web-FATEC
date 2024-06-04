import { initLoginForm } from "./components/LoginForm.js";
import { initPokemonForm } from "./components/PokemonForm.js";
import { initPokemonList } from "./components/PokemonList.js";
import { initRegisterForm } from "./components/RegisterForm.js";
import { modalLayout } from "./components/Unauthorized.js";

const routes = {
  pokemons: initPokemonList,
  login: initLoginForm,
  cadastro: initRegisterForm,
  "novo-pokemon": initPokemonForm,
  unauthorized: modalLayout,
};

function router() {
  const path = window.location.hash.replace("#", "");

  if (path === "") {
    window.location.hash = "pokemons";
  }
  const pageFunction = routes[path];

  if (pageFunction) {
    pageFunction();
  } else {
    console.error("Página não encontrada!");
  }
}

window.addEventListener("hashchange", router);

document.addEventListener("DOMContentLoaded", () => {
  router();
});
