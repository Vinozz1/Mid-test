let pokemonTemplate = Handlebars.compile(document.getElementById("pokeCard").innerHTML);

let offset = 0;
const limit = 20;
let pokemonsArr = [];

async function fetchPokemon() {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
        const data = await response.json();
        offset += limit;
        pokemonsArr = data.results.map(element => {
            const url = element.url;
            const segments = url.split('/');
            const id = segments[segments.length - 2];
            return {
                id: id,
                name: element.name,
                url: element.url,
                imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
            };
        });
        return { pokemons: pokemonsArr };
    } catch (error) {
        console.error("Failed to fetch Pokémon data:", error);
        return { pokemons: [] };
    }
}

function renderPokemon(pokemonList) {
    if (pokemonList.pokemons.length === 0) {
        console.warn("No Pokémon to render");
        return;
    }
    const container = document.getElementById('content');
    const html = pokemonTemplate(pokemonList);
    container.insertAdjacentHTML('beforeend', html);
}

async function initialLoad() {
    const pokemonList = await fetchPokemon();
    
    // Log the pokemonList to the console to verify its contents
    console.log(pokemonList);

    renderPokemon(pokemonList);
}

document.getElementById("loadMoreBtn").addEventListener('click', async () => {
    await initialLoad();
});

initialLoad();

document.getElementById('yearText').innerHTML = new Date().getFullYear();
