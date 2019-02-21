//PRIVATE
import Pokemon from "../models/pokemon.js";
import SelectedPokemon from "../models/selectedPokemon.js";

// @ts-ignore
let _pokemonAPI = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon'
})



let _state = {
  apiPokemons: [],
  selectedPokemon: {},
  nextPrevPokemon: {
    nextUrl: '',
    previousUrl: ''
  },
  myTeam: []
}

let _subscribers = {
  apiPokemons: [],
  selectedPokemon: [],
  nextPrevPokemon: [],
  myTeam: []
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

  get Next() {
    return _state.nextPrevPokemon.nextUrl
  }

  get Previous() {
    return _state.nextPrevPokemon.previousUrl
  }

  get SelectedApiPokemon() {
    return _state.selectedPokemon
  }


  //GET DATA
  getPokemonData(url = '') {
    _pokemonAPI.get(url)
      .then(res => {
        console.log(res)
        let data = res.data.results.map(d => new Pokemon(d))
        let urlData = {
          nextUrl: res.data.next,
          previousUrl: res.data.previous
        }
        setState('nextPrevPokemon', urlData)
        setState('apiPokemons', data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  getSelectedPokemonData(name) {
    _pokemonAPI.get(name)
      .then(res => {
        console.log(res)
        let data = new SelectedPokemon(res.data)
        setState('selectedPokemon', data)
      })
      .catch(err => {
        console.error(err)
      })
  }







  // getNextPokemon() {
  //   _pokemonAPI.get('?offset=20')
  //     .then(res => {
  //       console.log(res)
  //       let data = res.data.next
  //       setState('apiPokemons', data)
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }

}







































  // let _sandbox = axios.create({
  //   baseURL: 'https://bcw-sandbox.herokuapp.com/api/Sherfick/Pokemon'
  // })

  //variable controlls for Pokemon
  // let _characters = 'pokemon'
  // let _offset = 200
  // let _apiKey = '53496df3cd682930aa9108759e347171'

  //   //DELETE DATA
  //   removeFromTeam(id) {
  //     _sandbox.delete(id)
  //       .then(res => {
  //         console.log(res.data)
  //         this.getMyTeamData()
  //       })
  //       .catch(err => {
  //         console.error(err)
  //       })
  //   }


  //   editPokemon(newData) {
  //     _sandbox.put(newData.id, newData)
  //       .then(res => {
  //         this.getMyTeamData()
  //       })
  //   }


  // get MyTeam() {
    //   return _state.myTeam.map(h => new Pokemon(h))
      // }


      // //POST DATA
      // addToTeam(id) {
        //   //find pokemon
      //   let pokemon = _state.apiPokemons.find(pokemon => pokemon.id == id)
      //   //find if pokemon is already in list
      //   let myPokemon = _state.myTeam.find(h => h.name == pokemon.name)
      //   //prevent adding duplicates
      //   if (myPokemon) {
        //     alert('DUPLICATE POKEMON')
        //     return
        //   }
        //   ///SEND DATA TO SERVER
        //   //first parameter is appended on baseURL, second parameter is data to send
        //   _sandbox.post('', pokemon)
        //     .then(res => {
          //       this.getMyTeamData()
          //     })
      //     .catch(err => {
        //       console.log(err)
        //     })
        // }



      // //GET DATA
      // getMyTeamData() {
      //   _sandbox.get()
      //     .then(res => {
      //       let data = res.data.data.map(d => new Pokemon(d))
      //       setState('myTeam', data)
      //     })
      //     .catch(err => {
      //       console.error(err)
      //     })
      // }