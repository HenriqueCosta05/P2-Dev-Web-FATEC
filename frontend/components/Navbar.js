import { getToken } from "../indexedDBUtils.js";
import { logout } from "../services/auth.js";

export const navbarLayout = async () => {
  const loginState = await getToken()
    .then((token) => {
      if (token) {
        return "Logout";
      } else {
        return "Login";
      }
    })
    .catch((error) => {
      console.error("Não há token disponível: ", error);
      return "Login";
    });

  const navbar = document.getElementById("navbar");
  navbar.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-secondary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">PokeCEP</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link" href="#pokemons">Pokemóns cadastrados</a>
        <a class="nav-link" href="#novo-pokemon">Novo Pokemón</a>
        <a class="nav-link" href="#cadastro">Novo Usuário</a>
      </div>
      <button class="btn btn-danger" id="login-button">${loginState}</button>
    </div>
  </div>
</nav>
    `;

  async function updateLoginButton() {
    const loginButton = document.getElementById("login-button");
    try {
      const token = await getToken();
      if (token) {
        loginButton.textContent = "Logout";
      } else {
        loginButton.textContent = "Login";
      }
    } catch (error) {
      console.error("Error getting token: ", error);
      loginButton.textContent = "Login";
    }
  }

  document
    .getElementById("login-button")
    .addEventListener("click", async () => {
      try {
        const token = await getToken();
        if (token) {
          await logout();
          updateLoginButton();
          window.location.hash = "login";
        } else {
          window.location.hash = "login";
        }
        window.location.reload();
        updateLoginButton();
      } catch (error) {
        console.error("Error during login/logout: ", error);
        window.location.hash = "login";
        window.location.reload();
        updateLoginButton();
      }
    });
};
