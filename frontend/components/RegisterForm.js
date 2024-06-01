import { register } from "../services/auth.js";
import { getAddressInfo } from "../services/api-integration.js";

export function initRegisterForm() {
  const app = document.getElementById("app");
  app.innerHTML = `
        <form id="register-form" class="form login-form">
        <h2 class="form_heading">Cadastro de Usuário</h2>
            <input type="text" id="username" placeholder="Usuário (ou e-mail):" required class="input_field" />
            <input type="text" id="cep" placeholder="CEP:" required class="input_field" required />
            <input type="text" id="endereco" placeholder="Endereço:" required class="input_field" />
            <input type="text" id="numero" placeholder="Número:" required class="input_field" />
            <input type="text" id="complemento" placeholder="Complemento:"  class="input_field" />
            <input type="text" id="bairro" placeholder="Bairro:" required class="input_field" />
            <input type="text" id="cidade" placeholder="Cidade:" required class="input_field" />
            <input type="text" id="estado" placeholder="Estado:" required class="input_field" />

            <input type="password" id="password" placeholder="Senha:" required class="input_field" />
            <button type="submit" class="form_button">Cadastrar</button>
            <p class="form_text">Já tem uma conta? <a href="/#login" class="form_link">Login</a></p>
        </form>
    `;
  //Auto preencher endereço
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

  const form = document.getElementById("register-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const cep = document.getElementById("cep").value;
    const endereco = document.getElementById("endereco").value;
    const numero = document.getElementById("numero").value;
    const complemento = document.getElementById("complemento").value;
    const bairro = document.getElementById("bairro").value;
    const cidade = document.getElementById("cidade").value;
    const estado = document.getElementById("estado").value;

    const userData = {
      username,
      password,
      address: {
        cep,
        endereco,
        numero,
        complemento,
        bairro,
        cidade,
        estado,
      },
    };

    const data = await register(userData);
    if (data.error) {
      alert(data.message);
    } else {
      alert("Usuário cadastrado com sucesso!");

      window.location.href = "/#login";
    }
    console.log(userData);
  });
}
