const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetais) => pokemonsDetais)
        .catch((error) => console.error(error))
}
function convertPokeApiDetailToPoker(pokeDetail){
    console.log(pokeDetail)
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.order
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const stats = pokeDetail.stats.map((statsSlot) => {
        return {
            name: statsSlot.stat.name,
            base_stat: statsSlot.base_stat
        };
    });
    const namesAndBaseStats = stats.map(({ name, base_stat }) => ({ name, base_stat }));
    pokemon.stats = namesAndBaseStats 

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}
pokeApi.getPokemon = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => convertPokeApiDetailToPoker(jsonBody))
    .catch((error) => console.error(error))
}