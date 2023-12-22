const searchButton = document.getElementById("buttonSearch");
const searchInput = document.getElementById("inputSearchField");

let pokemonList = [];



// Hämtar alla pokemons när sidan laddas

window.onload = function() {
	fetch('https://pokeapi.co/api/v2/pokemon?limit=2000') 
    .then(response => response.json())
    .then(data => {
		pokemonList = data.results.map(pokemon => pokemon.name);
        console.log(pokemonList);
	});
};


searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    showSuggestions(searchTerm);

});



    // rullgardin


function showSuggestions(searchTerm) {

    let suggestions = pokemonList.filter(name => name.toLowerCase().startsWith(searchTerm));
	let suggestionsElement = document.getElementById("suggestions");

	suggestionsElement.innerHTML = '';

    suggestions.forEach(suggestion => {
        let div = document.createElement('div');
        div.textContent = suggestion;
        div.onclick = function() {
            fetchPokemonData(suggestion);
        };
        suggestionsElement.appendChild(div);

    });

    suggestionsElement.style.display = suggestions.length > 0 ? 'block' : 'none';

}

function fetchPokemonData(pokemonName) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            addToTeam(data.name, data.sprites.front_default); // bilderna
            document.getElementById("suggestions").style.display = 'none'; 

        })
        .catch(error => console.error("Fel vid hämtning av Pokémon-data: ", error));

}

 

searchButton.addEventListener("click", () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm !== "") {
        fetchPokemonData(searchTerm);

    }

});


let team = [];

 

function addToTeam(pokemonName, imageUrl) {
    let nickname = document.getElementById("nicknameField").value.trim() || pokemonName;
    team.push({ name: pokemonName, image: imageUrl, nickname: nickname  });
    updateTeamList();

}

function updateTeamList() {
    const teamListElement = document.getElementById('teamList');
    teamListElement.innerHTML = ''; 

     team.forEach((member, index) => {
        const memberElement = document.createElement('li');

       // Lägger till bilden

        const imageElement = document.createElement('img');
        imageElement.src = member.image;
        imageElement.alt = member.name;
        imageElement.style.width = '50px'; // Justera storleken vid behov
        memberElement.appendChild(imageElement);

 
        // Lägg till text (smeknamn)
        const textNode = document.createTextNode(member.nickname + (index >= 3 ? ' (Reserv)' : ''));
        memberElement.appendChild(textNode);

         // Skapa en kick-knapp

        const kickButton = document.createElement('button');
        kickButton.textContent = 'Kick';
        kickButton.onclick = function() {
            kickFromTeam(index);

        };

        memberElement.appendChild(kickButton);
        teamListElement.appendChild(memberElement);

    });

     checkTeamSize();

}

function onPokemonClick(pokemonName, imageUrl) {
    addToTeam(pokemonName, imageUrl);

}

 

function checkTeamSize() {
    const reminderElement = document.getElementById('reminder');
    if (team.length < 3) {
        reminderElement.style.display = 'block';
    } else {
        reminderElement.style.display = 'none';
    }

}

 

function kickFromTeam(index) {
    team.splice(index, 1); // Tar bort Pokémonen från arrayen
    updateTeamList();      // Uppdaterar listan som visas för användaren

}

//.searchField ska döljas vid klick på #buttonMyTeam

const hideInTeamView = document.querySelector("searchField");
console.log(hideInTeamView);
const hideSearchViewButton = document.getElementById("buttonMyTeam");

document.addEventListener("DOMContentLoaded", function() {
hideSearchViewButton.addEventListener('click', function() {
	console.log("Button clicked");
    if (hideInTeamView) {
		console.log("Hiding search field");
        hideInTeamView.style.display = 'none';
    }
});
});