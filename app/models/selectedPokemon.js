export default class SelectedPokemon {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.img = data.sprites.front_shiny || data.img
  }


  getSelBtn() {
    return `
        <div class="col-12 d-flex justify-content-center align-items-center">
        <div class="card">
        <h4 class="card-title">Pokedex Number: ${this.id}</h4>
  <img class="card-img-top" src=${this.img}>
    <div class="card-body">
      <h4 class="card-title">Name: ${this.name}</h4>
        </div>
        </div>
        </div>
        `
  }
}


