export default class Pokemon {
  constructor(data) {
    this.name = data.name
  }

  getBtn() {
    return `
        <div class="col-3">
        <button onclick='app.controllers.pokemonController.getSelectedPokemonData("${this.name}")'>${this.name}</button>
        </div>
        `
  }

}