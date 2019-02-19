import PokemonController from "./components/pokemonController.js";


class App {
  constructor() {
    this.controllers = {
      pokemonController: new PokemonController()
    }
  }
}

window['app'] = new App()