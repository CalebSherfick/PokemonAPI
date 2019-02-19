
//private
import Pokemon from "../models/pokemon.js";

//provide controlls to GET/POST/PUT/DELETE
let _pokemonAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})

let _sandbox = axios.create({
  baseURL: 'https://bcw-sandbox.herokuapp.com/api/Caleb/Pokemon'
})

//variable controlls for Pokemon
// let _characters = 'pokemon'
// let _offset = 200
// let _apiKey = '53496df3cd682930aa9108759e347171'


let _state = {
  apiPokemons: [],
  myTeam: []
}

let _subscribers = {
  apiPokemons: [],
  myTeam: []
}

function setState(prop, data) {
  _state[prop] = data
  _subscribers[prop].forEach(fn => fn())
}

//public
export default class PokemonService {

  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get ApiPokemons() {
    return _state.apiPokemons.map(h => new Pokemon(h))
  }

  get MyTeam() {
    return _state.myTeam.map(h => new Pokemon(h))
  }


  //POST DATA
  addToTeam(id) {
    //find pokemon
    let pokemon = _state.apiPokemons.find(pokemon => pokemon.id == id)
    //find if pokemon is already in list
    let myPokemon = _state.myTeam.find(h => h.name == pokemon.name)
    //prevent adding duplicates
    if (myPokemon) {
      alert('DUPLICATE POKEMON')
      return
    }
    ///SEND DATA TO SERVER
    //first parameter is appended on baseURL, second parameter is data to send
    _sandbox.post('', pokemon)
      .then(res => {
        this.getMyTeamData()
      })
      .catch(err => {
        console.log(err)
      })
  }

  //GET DATA
  getMyTeamData() {
    _sandbox.get()
      .then(res => {
        let data = res.data.data.map(d => new Pokemon(d))
        setState('myTeam', data)
      })
      .catch(err => {
        console.error(err)
      })
  }
  //GET DATA
  getPokemonData() {
    _pokemonAPI.get()
      .then(res => {
        let data = res.data.data.results.map(d => new Pokemon(d))
        setState('apiPokemons', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  //DELETE DATA
  removeFromTeam(id) {
    _sandbox.delete(id)
      .then(res => {
        console.log(res.data)
        this.getMyTeamData()
      })
      .catch(err => {
        console.error(err)
      })
  }


  editPokemon(newData) {
    _sandbox.put(newData.id, newData)
      .then(res => {
        this.getMyTeamData()
      })
  }
}