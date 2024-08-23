let cryptoTemplate = Handlebars.compile(document.getElementById("cryptoCard").innerHTML);
let cryptosData = [];
let coinsPerLoad = 10; 
let currentIndex = 0;

async function fetchCryptos() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
        if (response.ok) {
            const data = await response.json();
            cryptosData = data.map(crypto => ({
                name: crypto.name,
                image: crypto.image,
                symbol: crypto.symbol.toUpperCase(),
                market_cap: crypto.market_cap.toLocaleString(),
                current_price: crypto.current_price.toLocaleString(),
                market_cap_rank: crypto.market_cap_rank
            }));
            renderCryptos();
        } else {
            console.error("Failed to fetch data from API");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

function renderCryptos() {
    const container = document.getElementById('content');
    const startIndex = currentIndex;
    const endIndex = currentIndex + coinsPerLoad;
    const cryptoList = { cryptos: cryptosData.slice(startIndex, endIndex) };
    const html = cryptoTemplate(cryptoList);
    container.insertAdjacentHTML('beforeend', html);
    currentIndex += coinsPerLoad;

    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('visible');
        }, index * 100); 
    });
}

document.getElementById("load-more-button").addEventListener('click', () => {
    if (currentIndex < cryptosData.length) {
        renderCryptos();
    } else {
        alert("No more coins to load");
    }
});

function initialLoad() {
    fetchCryptos(); 
}

initialLoad();
document.getElementById('yearText').innerHTML = new Date().getFullYear();

document.getElementById('search-button').addEventListener('click', () => {
    performSearch();
});

document.getElementById('search-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = document.getElementById('search-input').value.toLowerCase();
    if (query) {
        document.getElementById('loading-animation').style.display = 'inline';

        setTimeout(() => {
            const filteredCryptos = cryptosData.filter(crypto => 
                crypto.name.toLowerCase().includes(query) || 
                crypto.symbol.toLowerCase().includes(query)
            );
            renderSearchResults(filteredCryptos);

            document.getElementById('loading-animation').style.display = 'none';
        }, 3000); 
    }
}

function renderSearchResults(results) {
    const container = document.getElementById('content');
    container.innerHTML = ''; 
    const cryptoList = { cryptos: results };
    const html = cryptoTemplate(cryptoList);
    container.insertAdjacentHTML('beforeend', html);
}

const themeToggle = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme') || 'light';

document.body.classList.add(currentTheme + '-mode');
document.querySelectorAll('header, .card, .crypto-api, footer, span.logo, #theme-toggle').forEach(el => {
    el.classList.add(currentTheme + '-mode');
});

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.classList.replace(currentTheme === 'light' ? 'dark-mode' : 'light-mode', currentTheme + '-mode');
    
    document.querySelectorAll('header, .card, .crypto-api, footer, span.logo, #theme-toggle').forEach(el => {
        el.classList.replace(currentTheme === 'light' ? 'dark-mode' : 'light-mode', currentTheme + '-mode');
    });
    
    localStorage.setItem('theme', currentTheme);
});

initialLoad();
document.getElementById('yearText').innerHTML = new Date().getFullYear();


