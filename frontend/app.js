import { initLoginForm } from "./components/LoginForm.js";
import { initPokemonForm } from "./components/PokemonForm.js";
import { initPokemonList } from "./components/PokemonList.js";
import { initRegisterForm } from "./components/RegisterForm.js";
import { modalLayout } from "./components/Unauthorized.js";
import { initPokemonEditForm } from "./components/PokemonForm.js";
import { navbarLayout } from "./components/Navbar.js";

import { getToken } from "./indexedDBUtils.js";

const routes = {
  pokemons: initPokemonList,
  login: initLoginForm,
  cadastro: initRegisterForm,
  "novo-pokemon": initPokemonForm,
  "editar-pokemon": initPokemonEditForm,
  unauthorized: modalLayout,
};

async function router() {
  let path = window.location.hash.replace("#", "");

  if (path === "") {
    window.location.hash = "pokemons";
  }

  let pageFunction;
  if (path.startsWith("editar-pokemon")) {
    const pokemonName = path.split("/")[1];
    pageFunction = () => routes["editar-pokemon"](pokemonName);
  } else {
    pageFunction = routes[path];
  }

  //Verifica se há token
  try {
    const token = await getToken();
  } catch (error) {
    console.error("Error ao obter o token: ", error);
    if (path !== "login" && path !== "cadastro") {
      pageFunction = routes["unauthorized"];
    }
  }

  if (pageFunction) {
    pageFunction();
  } else {
    console.error("Página não encontrada!");
  }
}

window.addEventListener("hashchange", router);

document.addEventListener("DOMContentLoaded", () => {
  router();
  navbarLayout();
});
