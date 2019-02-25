export default class Pokemon {
  constructor(data) {
    this.id = data._id || data.id
    this.name = data.name
    this.img = data.sprites ? data.sprites.front_default : data.img || "//placehold.it/200x200"
    this.url = data.url
  }


  // getSelBtn() {
  //   return `
  //       <div class="col-12 d-flex justify-content-center align-items-center">
  //       <div class="card">
  //       <h4 class="card-title">Pokedex Number: ${this.id}</h4>
  // <img class="card-img-top" src=${this.img}>
  //   <div class="card-body">
  //     <h4 class="card-title">Name: ${this.name}</h4>
  //     <button class="btn btn-info" onclick="app.controllers.pokemonController.addPokemon()">Add to PC</button>
  //       </div>
  //       </div>
  //       </div>
  //       `
  // }

  getRemoveBtn() {
    return `
        <div class="col-12 d-flex justify-content-center align-items-center">
        <div class="card">
        <h4 class="card-title">Pokedex Number: ${this.id}</h4>
  <img class="card-img-top" src=${this.img}>
    <div class="card-body">
      <h4 class="card-title">Name: ${this.name}</h4>
      <button class="btn btn-danger" onclick="app.controllers.pokemonController.releasePokemon()">Release</button>
        </div>
        </div>
        </div>
        `
  }




}