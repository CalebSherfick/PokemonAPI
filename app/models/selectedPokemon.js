export default class SelectedPokemon {
  constructor(data) {
    this.base_experience = data.base_experience
  }






  getSelBtn() {
    return `
        <div class="col-3">
        <h1>${this.base_experience}</h1>
        </div>
        `
  }
}
