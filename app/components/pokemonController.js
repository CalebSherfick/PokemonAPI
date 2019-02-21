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

  document.getElementById('buttons').innerHTML = `
    <button ${_pokemonService.Previous ? '' : 'disabled'} onclick="app.controllers.pokemonController.getPokemon('${_pokemonService.Previous}')">Previous</button>
    <button ${_pokemonService.Next ? '' : 'disabled'} onclick="app.controllers.pokemonController.getPokemon('${_pokemonService.Next}')">Next</button>
    `










}


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

  getPokemon(url) {
    _pokemonService.getPokemonData(url)
  }

  // getNextPokemon() {
  //   _pokemonService.getNextPokemon()
  // }



}







































// _pokemonService.addSubscriber('myTeam', drawMyTeam)
// _pokemonService.getMyTeamData()

// function drawMyTeam() {
//   let template = ''
//   let pokemons = _pokemonService.MyTeam
//   pokemons.forEach(p => {
//     let button = `<button class="btn btn-danger" onclick="app.controllers.pokemonController.removeFromTeam('${p.id}')">Remove From Team</button>
//         
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




  // }
