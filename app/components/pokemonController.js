//private
import PokemonService from "./pokemonService.js";

let _pokemonService = new PokemonService()

function drawApiPokemons() {
  let template = ''
  let pokemons = _pokemonService.ApiPokemons
  pokemons.forEach(p => {
    template += p.getBtn()
  })
  document.querySelector('.pokemon-characters').innerHTML = template
}


//HOW TO WRITE THIS FUNCTION???
function drawSelectedPokemon() {
  let template = ''
  let selPokemon = _pokemonService.SelectedApiPokemon

  template = selPokemon.getSelBtn() //make a new model 
  document.querySelector('.selected-pokemon').innerHTML = template
}

//PUBLIC
export default class PokemonController {
  constructor() {
    _pokemonService.addSubscriber('apiPokemons', drawApiPokemons)
    _pokemonService.addSubscriber('selectedPokemon', drawSelectedPokemon)

    _pokemonService.getPokemonData()
  }

  getSelectedPokemonData(name) {
    _pokemonService.getSelectedPokemonData(name)
  }

}







































  // _pokemonService.addSubscriber('myTeam', drawMyTeam)
  // _pokemonService.getMyTeamData()

  // function drawMyTeam() {
  //   let template = ''
  //   let pokemons = _pokemonService.MyTeam
  //   pokemons.forEach(p => {
  //     let button = `<button class="btn btn-danger" onclick="app.controllers.pokemonController.removeFromTeam('${p.id}')">Remove From Team</button>
  //         <i onclick="app.controllers.pokemonController.showEditForm('${p.id}')" class="fas fa-pencil-alt"></i>
  //         `
  //     template += p.getCard(button)
  //   })
  //   document.querySelector('.myteam').innerHTML = template
  // }
  // addToTeam(id) {
  //   _pokemonService.addToTeam(id)
  // }
  // removeFromTeam(id) {
  //   _pokemonService.removeFromTeam(id)
  // }
  // showEditForm(id) {
  //   document.getElementById(id).hidden = false;
  // }

  // editPokemon(event) {
  //   event.preventDefault();
  //   let data = {
  //     id: event.target.id,
  //     description: event.target.description.value
  //   }
  //   _pokemonService.editPokemon(data)


  // }
