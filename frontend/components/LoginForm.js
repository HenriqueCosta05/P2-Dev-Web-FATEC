import { login } from "../services/auth.js";

export function initLoginForm() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <form id="login-form" class="form login-form">
        <h2 class="form_heading">Login</h2>
            <input type="text" id="username" placeholder="Digite seu nome de usuário:" required class="input_field" />
            <input type="password" id="password" placeholder="Senha:" required class="input_field" autocomplete="on"/>
            <button type="submit" class="form_button">Login</button>
            <p class="form_text">Não tem uma conta? <a href="/#cadastro" class="form_link">Cadastre-se</a></p>
        </form>
    `;

  const form = document.getElementById("login-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    await login(username, password).then((data) => {
      if (data.error) {
        alert(data.detail);
      } else {
        alert(data.detail);
        window.location.href = "/#pokemons";
      }
    });
  });
}
