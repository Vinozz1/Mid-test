let mealTemplate = Handlebars.compile(document.getElementById("mealCard").innerHTML);

async function fetchPokemons() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10'); 
    const data = await response.json();

    const pokemons = data.results.map((pokemon, index) => ({
        ...pokemon,
        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`
    }));

    return { pokemons };
}

function renderPokemons(pokemonList) {
    const container = document.getElementById('content');
    const html = mealTemplate(pokemonList);
    container.insertAdjacentHTML('beforeend', html);
}

async function initialLoad() {
    const pokemonList = await fetchPokemons();
    renderPokemons(pokemonList);
}

document.querySelector("button").addEventListener('click', async () => {
    initialLoad();
});

window.addEventListener('scroll', async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        initialLoad();
    }
});

initialLoad();
document.getElementById('yearText').innerHTML = new Date().getFullYear();
