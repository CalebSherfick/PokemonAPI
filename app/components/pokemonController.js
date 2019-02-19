//private
import PokemonService from "./pokemonService.js";

let _pokemonService = new PokemonService()

function drawApiPokemons() {
  let template = ''
  let pokemons = _pokemonService.ApiPokemons
  pokemons.forEach(p => {
    let button = `<button class="btn btn-primary" onclick="app.controllers.pokemonController.addToTeam('${p.id}')">ADD TO TEAM</button>`
    template += p.getCard(button)
  })
  document.querySelector('.pokemon-characters').innerHTML = template
}
function drawMyTeam() {
  let template = ''
  let pokemons = _pokemonService.MyTeam
  pokemons.forEach(p => {
    let button = `<button class="btn btn-danger" onclick="app.controllers.pokemonController.removeFromTeam('${p.id}')">Remove From Team</button>
        <i onclick="app.controllers.pokemonController.showEditForm('${p.id}')" class="fas fa-pencil-alt"></i>
        `
    template += p.getCard(button)
  })
  document.querySelector('.myteam').innerHTML = template
}

//public
export default class PokemonController {
  constructor() {
    _pokemonService.addSubscriber('apiPokemons', drawApiPokemons)
    _pokemonService.addSubscriber('myTeam', drawMyTeam)

    //Initialize Data
    _pokemonService.getPokemonData()
    _pokemonService.getMyTeamData()
  }
  addToTeam(id) {
    _pokemonService.addToTeam(id)
  }
  removeFromTeam(id) {
    _pokemonService.removeFromTeam(id)
  }
  showEditForm(id) {
    document.getElementById(id).hidden = false;
  }

  editPokemon(event) {
    event.preventDefault();
    let data = {
      id: event.target.id,
      description: event.target.description.value
    }
    _pokemonService.editPokemon(data)


  }
}