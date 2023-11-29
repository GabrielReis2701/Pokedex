const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const loadDetails = document.getElementById('buttonDetails')
const pokerDetails = document.getElementById('pokerDetails')
const limit =5
let offset =0

function convertPokemonToLi(pokemon){
    return `
        <li>
            <button class="pokemon ${pokemon.type}"id="${pokemon.number}" onclick="loadPokemon(${pokemon.number})">
                <div class="blocoPokemon">
                    <span class="idPoke">#${pokemon.number}</span>
                    <span class="name">${pokemon.name}</span>
                    
                    <div class="detail">
                        <ol class="types">
                            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                        </ol>
                        <img class="imgList" src="${pokemon.photo}" alt="${pokemon.name}">

                    </div>
                </div>
            </button>
    </li>
`
}
function loadPokemonItens(offset, limit){
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)
loadMoreButton.addEventListener('click', () =>{
    offset +=limit
    loadPokemonItens(offset, limit)
})
function convertPokemonToLi2(pokemon){
    return `
      <div class="detailsG">
            <li class="pokemonD ${pokemon.type}">
                <span class="idPoke">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img class="imgDetails" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
            <div class="detailStatus">
                 Stats: ${pokemon.stats.map((stat) => `<li class="stat">${stat.name}: ${stat.base_stat}</li>`).join('')}  
            </div>
     </div>
`
}
function loadPokemon(id){
    pokeApi.getPokemon(id).then((pokemon) => {
        const newHtml = convertPokemonToLi2(pokemon);
        pokerDetails.innerHTML = newHtml;
    })
}

