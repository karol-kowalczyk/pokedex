let allPokemons = 'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0';
let allPokemonsArray = [];
let normalLength = 0;
let img = [];
let loadingSpace = document.getElementById('pokedex-loading-space');


async function init() {
   await includeHTML();
   await loadInfoCard();
}

async function loadInfoCard() {
   let resp = await fetch(allPokemons);
   let respInJson = await resp.json();

   let nameLength = respInJson['results'];

   for (let i = normalLength; i < normalLength + 10; i++) {
      const element = nameLength[i];

      loadingSpace.innerHTML += /*html*/`
         <h2 id="info-card${i}" onclick="openInformation(${i})" class="info-card">${element['name'].charAt(0).toUpperCase() + element['name'].slice(1)}</h2>
      `;

      allPokemonsArray.push(element);
      await showImg(element, i);
   }

   normalLength += 10; // Aktualisiere normalLength
}

async function showImg(element, i) {
   let resp = await fetch(element['url']);
   let respInJson = await resp.json();

   const imgFront = respInJson['sprites']['other']['official-artwork']['front_default'];

   let infoCard = document.getElementById(`info-card${i}`);
   infoCard.innerHTML += /*html*/`
   <img src="${imgFront}" class="pokemonImg" id="pokemonImg${i}" alt="" srcset="">
   `;
   img.push(imgFront);
   showAttributes(element, i);

}

async function showAttributes(element, i) {
   let resp = await fetch(element['url']);
   let respInJson = await resp.json();

   let infoCard = document.getElementById(`info-card${i}`);
    infoCard.innerHTML += /*html*/ `<p id="first-propertie${i}" class="first-propertie"></p> <p id="second-propertie${i}" class="second-propertie"></p></div>`;
    let firstPropertie = document.getElementById(`first-propertie${i}`);
    let secondPropertie = document.getElementById(`second-propertie${i}`);
    let propertie = respInJson['types'][0]['type']['name'];
    firstPropertie.innerHTML = propertie;

  if (respInJson['types'].length > 1) {
      secondPropertie.innerHTML = respInJson['types'][1]['type']['name'];
      
  } 

  let pokePic = document.getElementById(`pokemonImg${i}`);

  if (respInJson['types'].length <= 1) {
   pokePic.classList.add('margin24px');
  }
}
