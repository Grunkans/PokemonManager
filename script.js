const searchButton = document.getElementById("buttonSearch");
const searchInput = document.getElementById("inputSearchField");

 

// Lägg till en klickhändelse till sökknappen

searchButton.addEventListener("click", () => {

    const searchTerm = searchInput.value.trim(); // Hämta sökterm och ta bort eventuell vitrymd

 

    // Om söktermen inte är tom, gör ett API-anrop med söktermen

    if (searchTerm !== "") {

        const endpoint = `pokemon/${searchTerm}`; // Anpassa endpointen för Pokémon-sökningen

 

        fetch(`https://pokeapi.co/api/v2/${endpoint}`)

        .then((data) => {

            // Nu har du data från anropet till Pokéapi här

            console.log(data);

        })

        .catch((error) => {

            console.error("Det uppstod ett fel: ", error);

        });

    }

});