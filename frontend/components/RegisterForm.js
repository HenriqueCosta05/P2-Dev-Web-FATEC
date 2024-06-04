import { register } from "../services/auth.js";

export function initRegisterForm() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <form id="register-form" class="form login-form">
        <h2 class="form_heading">Cadastro de Usuário</h2>
            <input type="text" id="username" placeholder="Escolha um nome de usuário:" required class="input_field" />

            <input type="password" id="password" placeholder="Senha:" required class="input_field" />
            <button type="submit" class="form_button">Cadastrar</button>
            <p class="form_text">Já tem uma conta? <a href="/#login" class="form_link">Login</a></p>
        </form>
    `;

  const form = document.getElementById("register-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const userData = {
      username,
      password,
    };

    const data = await register(userData)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Erro ao cadastrar usuário: ", error);
        alert("Erro ao cadastrar usuário: ", error);
        return error;
      });
    if (data.error) {
      console.error(data.detail);
      alert("Erro ao cadastrar usuário: " + data.message);
    } else {
      alert(data.detail);
      window.location.href = "/#login";
    }
  });
}
