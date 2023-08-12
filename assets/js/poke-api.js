const pokeApi = {};

function convertPokemonDetailToPokemon (pokemonDetail) {
   
  const pokemon = new Pokemon;
  
  pokemon.id = pokemonDetail.id;
  pokemon.name = pokemonDetail.name;   

  const types = pokemonDetail.types.map((typeSlot) => typeSlot.type.name);
  const [type] = types;
  
  pokemon.types = types;
  pokemon.type = type;

  pokemon.height = pokemonDetail.height / 10;
  pokemon.weight = pokemonDetail.weight / 10 ;

  return pokemon;
}

pokeApi.getPokemonsDetails = (pokemon) => {
  const request = fetch(pokemon.url).then((response) => response.json());
  return request.then(convertPokemonDetailToPokemon);
}

pokeApi.getPokemons = (offset = 0, limit = 6) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
  const request = fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonsDetails))
    .then((requestDetails) => Promise.all(requestDetails))
    .then((pokemonsDetails) => pokemonsDetails)
  return request;
};


