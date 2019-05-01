//private
import PokemonService from "./pokemonService.js";

let _pokemonService = new PokemonService()

function drawApiPokemons() {
  let template = ''
  let pokemons = _pokemonService.ApiPokemons
  pokemons.forEach(p => {
    template += `
      <li class="col-xs-12 col-sm-4 col-md-3 col-lg-1 card d-flex justify-content-center">
            <img class="card-img-top" src="${p.img}">
          <div class="">
            <p class="text-center">
              #${p.id}
            </p>
            <h6 class="text-center">${p.name.toString().toUpperCase()}</h6>
            <div class="card-footer bg-transparent">
            <button class="btn btn-info" onclick="app.controllers.pokemonController.addMyPokemon('${p.id}')">Add to PC</button>
          </div>
          </div>
          </li>
`
  })
  document.querySelector('.pokemon-characters').innerHTML = template
}

function drawMyPokemon() {
  let template = ''
  let pokemons = _pokemonService.MyPokemon
  pokemons.forEach(p => {
    template += `
    <button onclick="app.controllers.pokemonController.showDetails('${p.id}')">${p.name}</button>
    `
  })
  document.querySelector('.my-pokemon').innerHTML = template
}


// function drawActiveMyPokemon() {
//   document.querySelector('.active-pokemon').innerHTML = _pokemonService.ActiveMyPokemon.getRemoveBtn()
// }

// function drawMyPokemon() {
//   let template = ''
//   _pokemonService.MyPokemon.forEach(p => {
//     template += `
//     <button onclick="app.controllers.pokemonController.showDetails('${p.id}')">${p.name}</button>
//     `
//   })
//   document.querySelector('.my-pokemon').innerHTML = template
// }

//PUBLIC
export default class PokemonController {
  constructor() {
    _pokemonService.addSubscriber('apiPokemons', drawApiPokemons)
    //_pokemonService.addSubscriber('activePokemon', drawActivePokemon)
    //_pokemonService.addSubscriber('activeMyPokemon', drawActiveMyPokemon)
    _pokemonService.addSubscriber('myPokemon', drawMyPokemon)

    _pokemonService.getPokemonData()
    _pokemonService.getMyPokemon()
  }


  addMyPokemon(id) {
    _pokemonService.addMyPokemon(id)
  }

  deletePokemon(id) {
    _pokemonService.deletePokemon(id)
  }




  // showDetails(id) {
  //   _pokemonService.showDetails(id)
  // }

  getPokemon() {
    _pokemonService.getPokemonData()
  }

  // addPokemon(p) {
  //   console.log(p)
  //   _pokemonService.addPokemon(p)
  // }

  // releasePokemon() {
  //   _pokemonService.releasePokemon()
  // }
}