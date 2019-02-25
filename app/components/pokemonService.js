//PRIVATE
import Pokemon from "../models/Pokemon.js";

// @ts-ignore
let _pokemonAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _state = {
  apiPokemons: [],
  activeMyPokemon: {},
  // nextPrevPokemon: {
  //   nextUrl: '',
  //   previousUrl: ''
  // },
  myPokemon: []
}

let _subscribers = {
  apiPokemons: [],
  activeMyPokemon: [],
  // nextPrevPokemon: [],
  myPokemon: []
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn())
}


//PUBLIC
export default class PokemonService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get ApiPokemons() {
    return _state.apiPokemons
  }

  // get Next() {
  //   return _state.nextPrevPokemon.nextUrl
  // }

  // get Previous() {
  //   return _state.nextPrevPokemon.previousUrl
  // }

  // get ActiveApiPokemon() {
  //   return _state.activePokemon
  // }
  get ActiveMyPokemon() {
    return _state.activeMyPokemon
  }

  get MyPokemon() {
    return _state.myPokemon.map(p => new Pokemon(p))
  }


  getPokemonData() {
    let endpoints = []
    for (let i = 1; i <= 151; i++) {
      endpoints.push("" + i)
    }
    let promises = endpoints.map(endPoint => {
      return _pokemonAPI.get(endPoint)
        .then(res => {
          return res.data
        })
    })
    Promise.all(promises)
      .then(res => {
        console.log(res)
        let pokemon = res.map(p => new Pokemon(p))
        console.log(pokemon)
        setState('apiPokemons', pokemon)
      })
  }

  // getActivePokemonData(url) {
  //   _pokemonAPI.get(url) 
  //     .then(res => {
  //       let data = new Pokemon(res.data)
  //       setState('activePokemon', data)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }

  // showDetails(id) {
  //   let pokemon = _state.myPokemon.find(p => p.id == id)
  //   setState('activeMyPokemon', pokemon)
  // }

  addPokemon() {
    let pokemon = _state.myPokemon.find(p => p.name == _state.activePokemon.name)
    if (!pokemon) {
      _state.myPokemon.push(_state.activePokemon)
      _subscribers.myPokemon.forEach(fn => fn())
    } else {
      window.alert("You have already logged this pokemon")
    }
  }

  releasePokemon() {
    let index = _state.myPokemon.findIndex(p => p.name == _state.activeMyPokemon.name)
    if (index != -1) {
      _state.myPokemon.splice(index, 1)
      _subscribers.myPokemon.forEach(fn => fn())
    }
  }

}