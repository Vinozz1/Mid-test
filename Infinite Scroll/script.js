let mealTemplate = Handlebars.compile(document.getElementById("mealCard").innerHTML);

async function fetchMeals() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();
    return { meals: data.categories };
}

function renderMeals(mealList) {
    const container = document.getElementById('content');
    const html = mealTemplate(mealList);
    container.insertAdjacentHTML('beforeend', html);
}

async function initialLoad() {
    const mealList = await fetchMeals();
    renderMeals(mealList);
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