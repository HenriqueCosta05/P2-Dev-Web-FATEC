export const modalLayout = () => {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="modal hide" tabindex="-1" role="dialog" id="pokemon-modal">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Não Autorizado</h5>
          </div>
          <div class="modal-body">
            <p>Faça o login ou cadastre para acessar os pokemons.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" id="handleCloseButton">Fechar</button>
          </div>
        </div>
      </div>
    </div>
  `;

  const myModal = new bootstrap.Modal(
    document.getElementById("pokemon-modal"),
    {}
  );
  document.onreadystatechange = function () {
    myModal.show();
  };
  document.getElementById("handleCloseButton").addEventListener("click", () => {
    myModal.hide();
    window.location.hash = "#login";
  });
};

modalLayout();
