function convertPokemonToLi(pokemon) {
  return `
      <li class="conteiner ${pokemon.type}">
        <div class="pokemonList-row-1">
          <h2 class="pokemon-header">${pokemon.name}</h2>
          <h2 class="pokemon-header">#${pokemon.id}</h2>
        </div>
        <div class="pokemonList-row-2">
        <ol class="typesList">
          ${pokemon.types.map((types) => `<li><h4 class="badge ${types}">${types}</h4></li>`).join("")}
          <li><h4 class="badge ${pokemon.type}">${pokemon.height} m</h4></li>
          <li><h4 class="badge ${pokemon.type}">${pokemon.weight} kg</h4></li>
        </ol>
        <div class="pokemonImage">
          <img src="/assets/images/pokemons/poke_${pokemon.id}.gif" alt="${pokemon.name}">
        </div>
      </div>
      </li></a>
`;
}


const pokemonOl = document.getElementById("pokemonOl");
const loadMoreBtn = document.getElementById("loadMoreBtn");

const maxRecords = 251;
const limit = 9;
let offset = 0;



function loadMorePokemonItems (offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemonList = []) => {
    const newHTML = pokemonList.map(convertPokemonToLi).join("");
    pokemonOl.innerHTML += newHTML;
  })
  .catch((error) => console.log(error));
}

loadMorePokemonItems(offset, limit);

loadMoreBtn.addEventListener("click", () => {
  offset += limit;
  const qtdRecordsNextPage = offset + limit;

  if (qtdRecordsNextPage >= maxRecords){
    const newLimit = maxRecords - offset;
    loadMorePokemonItems(offset, newLimit);
    loadMoreBtn.parentElement.removeChild(loadMoreBtn);
  } else {
    loadMorePokemonItems(offset, limit);
  }
})

