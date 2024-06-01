export const navbarLayout = () => {
  const navbar = document.getElementById("navbar");
  navbar.innerHTML = `
        <nav class="navbar navbar-expand-lg bg-secondary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">PokeCEP</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div class="navbar-nav">
        <a class="nav-link active" aria-current="page" href="#novo-pokemon">Novo Pokemón</a>
        <a class="nav-link" href="#cadastro">Cadastro</a>
        <a class="nav-link" href="#login">Login</a>
      </div>
    </div>
  </div>
</nav>
    `;
};

navbarLayout();
