const typeColor = {
    normal: '#A8A77A',
    fire: '#EE8130',
    water: '#6390F0',
    electric: '#F7D02C',
    grass: '#7AC74C',
    ice: '#96D9D6',
    fighting: '#C22E28',
    poison: '#A33EA1',
    ground: '#E2BF65',
    flying: '#A98FF3',
    psychic: '#F95587',
    bug: '#A6B91A',
    rock: '#B6A136',
    ghost: '#735797',
    dragon: '#6F35FC',
    dark: '#705746',
    steel: '#B7B7CE',
    fairy: '#D685AD'
}

const url = "https://pokeapi.co/api/v2/pokemon/";
const card = document.getElementById("card");
const btn = document.getElementById("btn");

let getPokeData = () => {
    let id = Math.floor(Math.random() * 150) + 1;
    const finalurl = url + id;

    fetch(finalurl)
        .then((response) => response.json())
        .then((data) => {
            console.log("Pokemon data fetched:", data);
            generateCard(data);
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

let generateCard = (data) => {
    const hp = data.stats[0].base_stat;
    const imgsrc = data.sprites.other.dream_world.front_default;
    const pokeName = data.name;
    const statAttack = data.stats[1].base_stat;
    const statDefense = data.stats[2].base_stat;
    const statSpeed = data.stats[5].base_stat;
    const themeColor = typeColor[data.types[0].type.name];

    console.log("Theme color:", themeColor);

    card.innerHTML = `
        <p class="hp"><span>HP</span>${hp}</p>
        <img src="${imgsrc}" alt="">
        <h2 class="poke-name">${pokeName}</h2>
        <div class="type"></div>
        <div class="stats">
            <div>
                <h3>${statAttack}</h3>
                <p>Attack</p>
            </div>
            <div>
                <h3>${statDefense}</h3>
                <p>Defense</p>
            </div>
            <div>
                <h3>${statSpeed}</h3>
                <p>Speed</p>
            </div>
        </div>`;

    appendTypes(data.types);
    stylecard(themeColor);
}

let appendTypes = (types) => {
    document.querySelector(".type").innerHTML = "";
    types.forEach((item) => {
        let span = document.createElement("span");
        span.textContent = item.type.name;
        document.querySelector(".type").appendChild(span);
    });
}

let stylecard = (color) => {
    console.log("Applying theme color:", color);
    
    card.style.background = `radial-gradient(circle at 50% 0%, ${color} 36%, rgb(217, 219, 101) 100%)`;

    document.body.style.backgroundColor = color;
}


btn.addEventListener("click", getPokeData);
window.addEventListener("load", getPokeData);
