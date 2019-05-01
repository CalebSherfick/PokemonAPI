//PRIVATE
import Pokemon from "../models/Pokemon.js";

// @ts-ignore
let _pokemonAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

// @ts-ignore
let _myApi = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/caleb/pokemon'
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

  get ActiveMyPokemon() {
    return _state.activeMyPokemon
  }

  get MyPokemon() {
    return _state.myPokemon.map(p => new Pokemon(p))
  }

  getPokemonData() {
    let endpoints = []
    for (let i = 1; i <= 10; i++) {
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

  getMyPokemon() {
    console.log("Getting My Pokemon List")
    _myApi.get()
      .then(res => {
        console.log(res)
        let data = res.data.data.map(d => new Pokemon(d))
        setState('myPokemon', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  addMyPokemon(id) {
    let newPokemon = new Pokemon(id)
    _myApi.post('', newPokemon)
      .then(res => {
        this.getMyPokemon()
      })
  }

  deletePokemon(id) {
    _myApi.delete(id)
      .then(res => {
        this.getMyPokemon()
      })
  }




  // showDetails(id) {
  //   let pokemon = _state.myPokemon.find(p => p.id == id)
  //   setState('activeMyPokemon', pokemon)
  // }

  // addPokemon(name) {
  //   let pokemon = _state.apiPokemons.find(p => p.name == name)
  //   let myPoke = _state.myPokemon.find(p => p.name == name)
  //   if (!myPoke) {
  //     _state.myPokemon.push(pokemon)
  //     _subscribers.myPokemon.forEach(fn => fn())
  //   } else {
  //     window.alert("You have already logged this pokemon")
  //   }
  //   console.log(_state.myPokemon)
  // }

  // releasePokemon() {
  //   let index = _state.myPokemon.findIndex(p => p.name == _state.activeMyPokemon.name)
  //   if (index != -1) {
  //     _state.myPokemon.splice(index, 1)
  //     _subscribers.myPokemon.forEach(fn => fn())
  //   }
  // }

}