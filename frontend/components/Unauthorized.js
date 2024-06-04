import { getToken } from "../indexedDBUtils.js";
export const modalLayout = async () => {
  try {
    const token = await getToken();
  } catch (error) {
    console.error("Error getting token: ", error);
    alert("Não Autorizado: Faça o login ou cadastre para acessar os pokemons.");
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
      } catch (error) {
        console.error("Error during login/logout: ", error);
        window.location.hash = "login";
        window.location.reload();
      }
    });
};
