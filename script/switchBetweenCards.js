async function nextPokemonRight(i) {
    if (i < allPokemonsArray.length - 1) {
        closeInformation(i);
        await openInformation(i + 1);
        document.body.style.overflow = 'hidden';
    } else {
        // Wenn wir beim letzten Pokémon sind, springe zum ersten
        closeInformation(i);
        await openInformation(0);
        document.body.style.overflow = 'hidden';
    }
}

async function nextPokemonLeft(i) {
    if (i > 0) {
        closeInformation(i);
        await openInformation(i - 1);
        document.body.style.overflow = 'hidden';
    } else {
        // Wenn wir beim ersten Pokémon sind, springe zum letzten geladenen auf der Seite
        closeInformation();
        await openInformation(allPokemonsArray.length - 1);
        document.body.style.overflow = 'hidden';
    }
}

async function openInformation(i) {
    document.body.style.overflow = 'hidden';

    const currentPokemon = allPokemonsArray[i];
    const currentPokemonName = currentPokemon.name;

    const currentPokemonDetailsURL = currentPokemon.url;
    const currentPokemonDetailsResponse = await fetch(currentPokemonDetailsURL);
    const currentPokemonDetails = await currentPokemonDetailsResponse.json();

    const officialArtwork = currentPokemonDetails.sprites.other['official-artwork'].front_default;

    openInformationContinue(i, currentPokemonName, officialArtwork);
}

function openInformationContinue(i, currentPokemonName, officialArtwork) {
    const popup = document.createElement('div');
    popup.className = `info-card-popup${i} info-card-popup`;
    popup.innerHTML = /*html*/ `
    <div id="about-stats-card${i}" class="about-stats-card" onclick="closeOnlyBlack(event)">
        <div class="popup-pokemon-name" id="popup-pokemon-name${i}" onclick="closeOnlyBlack(event)">
            <h1 class="new-poke-name">${currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1)}</h1>
       <div id="arrow-btns">
           <img onclick="nextPokemonLeft(${i})" class="arrow" src="img/left-arrow.png" alt="" srcset="">
           <img src="${officialArtwork}" alt="${currentPokemonName}" class="pokemonImgNew">
           <img onclick="nextPokemonRight(${i})" class="arrow" src="img/right-arrow.png" alt="" srcset="">
       </div>
       <div id="infos-about">
        <div class="about" onclick="about(${i})">about</div>
        <div class="status" onclick="stats(${i})">stats</div>
       </div>
            <!-- <button class="close-button" onclick="closeInformation(${i})">Schließen</button> -->
        </div>
        </div>
    `;

    document.body.appendChild(popup);
    popup.addEventListener('click', closeInformation);
}

async function about(i) {
    const currentPokemon = allPokemonsArray[i];
    const currentPokemonName = currentPokemon.name;

    const url = 'https://pokeapi.co/api/v2/ability/' + [i + 1] + '/';
    const respUrl = await fetch(url);
    const urlToJson = await respUrl.json();
    const informationAbout = urlToJson.effect_entries[1].effect;

    const currentPokemonDetailsURL = currentPokemon.url;
    const currentPokemonDetailsResponse = await fetch(currentPokemonDetailsURL);
    const currentPokemonDetails = await currentPokemonDetailsResponse.json();

    const officialArtwork = currentPokemonDetails.sprites.other['official-artwork'].front_default;

    let weight = currentPokemonDetails.weight;
    let height = currentPokemonDetails.height;

    await aboutFouhrther(i, openInformation, currentPokemonName, officialArtwork, currentPokemonDetails, height, weight, informationAbout);
}

async function aboutFouhrther(i, openInformation, currentPokemonName, officialArtwork, currentPokemonDetails, height, weight, informationAbout) {
    let popup = document.getElementById(`about-stats-card${i}`);
    popup.innerHTML = /*html*/ `
    <div class="headline-in-popup">
         <h1 class="new-poke-name">${currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1)}</h1>
         <div class="new-arrow"><img class="fit-in" src="img/right-arrow-two.png" alt="" srcset=""></div>
         <div class="aboutNew">&nbsp about</div>
    </div>
        <div class="sumup-info">
        <img src="${officialArtwork}" alt="${currentPokemonName}" class="pokemon-img-new-in-popup">
        <div class="flex">
        <div class="background-none">age: &nbsp &nbsp ${currentPokemonDetails.base_experience}yrs</div>
        <div  class="background-none">weight: &nbsp${weight}kg</div>
        <div class="background-none">height: &nbsp${height}0cm</div>
        </div>
        </div>
        <div class="last-section-in-new-popup">${informationAbout}</div>
    `;
    popup.classList.add('popup-window');
}

async function stats(i) {
    const currentPokemon = allPokemonsArray[i];
    const currentPokemonName = currentPokemon.name;

    const url = 'https://pokeapi.co/api/v2/ability/' + [i + 1] + '/';
    const respUrl = await fetch(url);
    const urlToJson = await respUrl.json();
    const informationAbout = urlToJson.effect_entries[1].effect;

    await statsNewOne(i, currentPokemon, currentPokemonName);
}

async function statsNewOne(i, currentPokemon, currentPokemonName) {
    const urlNew = 'https://pokeapi.co/api/v2/pokemon-species/' + [i + 1] + '/';
    const respNewUrl = await fetch(urlNew);
    const urlNewToJson = await respNewUrl.json();
    const informationNewAbout = urlNewToJson;

    const currentPokemonDetailsURL = currentPokemon.url;
    const currentPokemonDetailsResponse = await fetch(currentPokemonDetailsURL);
    const currentPokemonDetails = await currentPokemonDetailsResponse.json();

    const officialArtwork = currentPokemonDetails.sprites.other['official-artwork'].front_default;

    await showInformation(i, currentPokemonName, officialArtwork, informationNewAbout);
}

async function showInformation(i, currentPokemonName, officialArtwork, informationNewAbout) {

    let popup = document.getElementById(`about-stats-card${i}`);
    popup.innerHTML = /*html*/ `
    <div class="headline-in-popup">
            <h1 class="new-poke-name">${currentPokemonName.charAt(0).toUpperCase() + currentPokemonName.slice(1)}</h1>
            <div class="new-arrow"><img class="fit-in" src="img/right-arrow-two.png" alt="" srcset=""></div>
        <div class="aboutNew">&nbsp stats</div>
        </div>
            <div class="sumup-info-new">
            <img src="${officialArtwork}" alt="${currentPokemonName}" class="pokemon-img-new-in-popup">
        <div class="flex-attitude">
    
        <div class="new-instinct-direction">
            <div class="background-none-invisible">hp</div> 
            <div class="bar">
            <div class="bar-inner" Style = "width:${informationNewAbout.base_happiness}%; background: green;" > ${informationNewAbout.base_happiness}</div>
        </div>
    </div>
  
    <div class="new-instinct-direction">
            <div class="background-none-invisible">atk </div>
            <div class="bar">
            <div class="bar-inner" Style = "width:${informationNewAbout.pal_park_encounters[0].base_score}%; background: red;" > ${informationNewAbout.pal_park_encounters[0].base_score}</div>
            </div>
    </div>

            <div class="new-instinct-direction">
            <div class="background-none-invisible">def </div>
            <div class="bar">
            <div class="bar-inner" Style = "width:${informationNewAbout.base_happiness}%; background: pink;" > ${informationNewAbout.pal_park_encounters[0].rate}</div>
            </div>
            </div>

            </div>
        </div>
`;
    popup.classList.add('popup-window');
}