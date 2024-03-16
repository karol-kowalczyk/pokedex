let loadingCard = document.getElementById('loading-card');
let showTenMoreId = document.getElementById('showTenMore');
let body = document.getElementById('pokedex-loading-space');

function filterPokemons() {
    const search = document.getElementById('search').value.toLowerCase();

    allPokemonsArray.forEach((pokemon, i) => {
        const pokemonName = pokemon.name.toLowerCase();
        const infoCard = document.getElementById(`info-card${i}`);

        if (pokemonName.startsWith(search)) {
            infoCard.style.display = '';
        } else {
            infoCard.style.display = 'none';
        }
    })

    const showTenMoreBtn = document.getElementById('showTenMore');

    if (search === '') {
        showTenMoreBtn.style.display = '';
    } else {
        showTenMoreBtn.style.display = 'none';
    }

    const noResultsMessage = document.getElementById('noResultsMessage');

    if (allPokemonsArray.every(pokemon => !pokemon.name.toLowerCase().startsWith(search))) {
        noResultsMessage.innerHTML = "Please remove the last letter or start over.";
    } else {
        noResultsMessage.innerHTML = ""; // Clear the message
    }
}

function filterLetters() {
    var inputElement = document.getElementById("search");
    var inputValue = inputElement.value;

    var filteredValue = inputValue.replace(/[^a-zA-Z]/g, "");

    if (inputValue !== filteredValue) {
        alert("Numbers are not allowed.");
    }

    inputElement.value = filteredValue;
}