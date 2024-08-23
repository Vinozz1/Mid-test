let currentIndex = 1;
const imgElement = document.getElementById('pokemonFire');

async function fetchPokemonImage(index) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${index}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const imageUrl = data.sprites.other['official-artwork'].front_default;
        return imageUrl;
    } catch (error) {
        console.error('Error fetching data from PokeAPI:', error);
    }
}

async function changeImage() {
    const imageUrl = await fetchPokemonImage(currentIndex);
    if (imageUrl) {
        imgElement.src = imageUrl;
        currentIndex = (currentIndex % 151) + 1; 
    }
}

setInterval(changeImage, 2000);

changeImage();