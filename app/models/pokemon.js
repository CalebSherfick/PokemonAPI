export default class Pokemon {
  constructor(data) {
    this.name = data.name
    this.base_experience = data.base_experience
  }

  getBtn() {
    return `
        <div class="col-3">
        <button onclick='app.controllers.pokemonController.getSelectedPokemonData("${this.name}")'>${this.name}</button>
        </div>
        `
  }




}





















































    // this.url = data.url
        // this.img = data.sprites.front_default || data.img || ""
      // this.id = data.id || data._id
      // this.img = data.img || data.thumbnail.path + "." + data.thumbnail.extension
      // this.description = data.description || 'CLASSIFIED'

// <form hidden id="${this.id}" onsubmit="app.controllers.pokemonController.editPokemon(event)">
//   <input type="text" name="description">
//     <button class="btn btn-info" type="submit">Submit</button>
//                 </form>