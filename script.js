const usercontainer = document.querySelector('.user-container')
const characterSelection = document.getElementById('CharacterSelection')
const genreSelection = document.getElementById('genreSelection')
const seasonsSelection = document.getElementById('seasonSelection')
const yearSelection = document.getElementById('yearSelection')
const numberOfRecommendations = document.getElementById('numberOfRecommendations')
const searchButton = document.querySelector('.searchButton')



// document.getElementById("searchButton").addEventListener("click", () => {
//   const genreId = getSelectedGenreId();
//   const genreName = getSelectedGenreName();
//   console.log("Searching for genre:", genreId, genreName);

//   // Pass genreId to your search function
// });



// async function getAnimeGenre() {
//     const url = 'https://api.jikan.moe/v4/genres/anime';
//     const response = await fetch(url);
//     const genres = await response.json();
//     console.log(genres.data)
//     genres.data.forEach(gen => {
//         const genreDropdown = document.createElement('option');
//         dropdown.value = gen.mal_id
//         genreDropdown.textContent = gen.name
//         genreSelection.appendChild(genreDropdown)
//         //console.log(gen.name)

//     });
//     //return genreDropdown
// }




// let result = getAnimeGenre();
// console.log("result of genre: " +result)

async function getAnimeSeason() {

    const genreUrl = 'https://api.jikan.moe/v4/genres/anime';
    const url2 = `https://api.jikan.moe/v4/anime/`
    console.log(url2)
    const genreResponse = await fetch(genreUrl);
    const genres = await genreResponse.json();
    console.log(genres.data)
    genres.data.forEach(gen => {
        const genreDropdown = document.createElement('option');
        genreDropdown.value = gen.mal_id
        genreDropdown.textContent = gen.name
        genreSelection.appendChild(genreDropdown)
        //console.log(gen.name)


    });

    // const red = await fetch(url2);
    // const test = await red.json();
    // console.log(test.data)


    const url = 'https://api.jikan.moe/v4/seasons';
    const response = await fetch(url);
    const seasonsData = await response.json();
    console.log(seasonsData.data)

    seasonsData.data.forEach(season => {
        const yearDropDown = document.createElement('option')
        yearDropDown.textContent = season.year
        // seasonsSelection.appendChild(dropdown)
        yearSelection.appendChild(yearDropDown)
        //console.log(gen.name)
    });


    //console.log(seasonsData.data[0].seasons)


    seasonsData.data[0].seasons.forEach(seasonName => {
        const dropdown = document.createElement('option');
        dropdown.textContent = seasonName
        console.log(seasonName)
        seasonsSelection.appendChild(dropdown)
    });

    const amountArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    amountArray.forEach(recommendationsNumber => {
        const recommandationDropdown = document.createElement('option');
        recommandationDropdown.textContent = recommendationsNumber;
        console.log(recommendationsNumber)
        numberOfRecommendations.appendChild(recommandationDropdown)
    })
    return
}
getAnimeSeason()

function getParamaters() {

    let params = {
        genre: genreSelection.value,
        year: yearSelection.value,
        season: seasonsSelection.value,
        recommndationCount: numberOfRecommendations.value,
        pages: 0

    };

    const getRandomNumber = (min, max) => {
        return Math.random() * (max - min) + min
    }
    params.pages = getRandomNumber(1, 5).toFixed(0)
    console.log(params.pages)
    return params
}


searchButton.addEventListener("click", () => {
    const paramaters = getParamaters();

    console.log(paramaters)
    animenewsnetwork(paramaters)


})



async function animenewsnetwork({ genre, year, season, recommndationCount, pages }) {
    //const url = `https://api.jikan.moe/v4/anime?genre=${genre}&year=${year}&season=${season}&limit=${recommndationCount}&page=${pages}`;
    //const url =  `https://api.jikan.moe/v4/seasons/${year}&season=${season}&page=${pages}`;
    //const url = `https://api.jikan.moe/v4/${genre}/anime?&limit=${recommndationCount}&page=${pages}`;
    const url = `https://api.jikan.moe/v4/seasons/${year}/${season}?limit=25`;
    
    console.log(url)
    const response = await fetch(url);
    const anime = await response.json();
    console.log(anime.data)
    let arr = []

    arr = anime.data.filter(function (el) {
        for (let i = 0; i < el.genres.length; i++) {
            if (el.genres[i].mal_id == genre) {
                return true;
            }
        }
        return false
    })

    if (arr.length == 0) {

        setTimeout(() => {
            alert("no anime with that genre in that year and season")
        }, 1000);
    }
    console.log(arr)

    const getRandomNumber = (min, max) => {
        return Math.random() * (max - min) + min
    }
    console.log(arr.length);

   
    console.log(arr)
    let count = 0;
    let countArray = [];
    usercontainer.innerHTML = "";
    for (let i = 0; i < recommndationCount; i++) {

        //let chosenIndexes = [1]
        //1
        //if(chosenIndexes.includes(1))

        let possiblesIndexes = []//0123...lenght-1
        //let count = 0;
        //let index = getRandomNumber(0, possiblesIndexes.length - 1).toFixed(0);
        let randomNum = getRandomNumber(0, arr.length - 1).toFixed(0);
        console.log("first random number" + randomNum)
        //countArray.push(randomNum)

        console.log("count array before looping:" + countArray)

        // for(let i=0;i<countArray.length;i++){
        //     if(countArray.includes(randomNum)){
        //         randomNum = getRandomNumber(0, arr.length - 1).toFixed(0);
        //     }
        // }

        do {
            randomNum = Math.floor(Math.random() * arr.length);
        } while (countArray.includes(randomNum));

        countArray.push(randomNum);


        //    for(let j=0;j<countArray.length;j++){
        //             console.log("checking")
        //             if(countArray.includes(randomNum)){
        //                 console.log("random number in forloop:"+randomNum)
        //                 randomNum = getRandomNumber(0,arr.length-1).toFixed(0);
        //                 //countArray.push(randomNum)
        //                 console.log("random number in if statement: "+ randomNum)
        //             }
        //             else{
        //                 break
        //             }
        //             //countArray.push(randomNum)
        //        }

        //let randomNum = getRandomNumber(0,arr.length-1).toFixed(0);

        //countArray.push(randomNum)

        console.log("random number at top: " + randomNum)

        console.log("count at top: " + countArray)
        //     for(let j=0;j<countArray.length;j++){
        //         console.log("checking")
        //         if(randomNum === count[j]){
        //             console.log("random number in forloop:"+randomNum)
        //             randomNum = getRandomNumber(0,arr.length-1).toFixed(0);
        //             countArray.push(randomNum)
        //             console.log("random number in if statement: "+ randomNum)
        //         }
        //    }

        console.log(countArray)





        if (recommndationCount > arr.length) {
            alert("not enough recommendations in that genre, please choose: " + arr.length)
            return;
        }
        //             const getRandomNumber = (min, max) => {
        //     return Math.random() * (max - min) + min
        // }

        //     let randomNum = getRandomNumber(0,arr.length).toFixed(0)
        //     console.log(randomNum)
        //     if(randomNum>arr.length){
        //         alert("not enough recommendations in that genre, please choose: "+ arr.length)
        //     }



        // let randomAnime = anime.data[randomNum]

        let randomAnime = arr[randomNum]
        //console.log(randomAnime)

        const userImage = document.createElement('img')
        userImage.classList.add("recommendedImage");
        //userImage.src= anime.data[i].images.jpg.image_url;
        userImage.src = randomAnime.images.jpg.image_url;
        //usercontainer.appendChild(userImage)

        // const name = document.createElement('p');
        // name.textContent = ("Name: " + anime.data[i].title);
        // name.classList.add("recommendedName")
        // usercontainer.appendChild(name)
        // console.log(name)
        //console.log(picture)
        console.log(randomAnime)
        const name = document.createElement('p');
        const status = document.createElement('p');
        const score = document.createElement('p')
        //name.textContent = "Name: " + randomAnime.title;
        name.textContent = "Name: " + randomAnime.title_english;
        status.textContent = `Status ON TV: ${randomAnime.status}, RUN: ${randomAnime.episodes} of ${randomAnime.duration}`
        score.textContent = `My Anime List score: ${randomAnime.score}`
        name.classList.add("recommendedName");
        status.classList.add("Status")
        score.classList.add("Score")

        // Wrap them in a container div
        const animeCard = document.createElement('div');
        animeCard.classList.add("anime-card");
        animeCard.appendChild(userImage);
        animeCard.appendChild(name);
        animeCard.appendChild(status)
        animeCard.appendChild(score)

        usercontainer.appendChild(animeCard);
        //userImage.setAttribute('src', picture)
        // console.log("randomnum at bottom: "+ randomNum)
        // console.log("count at bottom before assigning: "+ count)

        count = randomNum;

        //console.log("count at bottom: "+ count)
    }
    // const name = anime.data.title;
    // const userName = document.getElementById('user-name');
    // userName.innerHTML = `Name: ${name}`;
}
//animenewsnetwork()








//console.log(getSelectedGenreID)

// Random Anime Generator
// API: Jikan or AniList
// Description: Show a random anime suggestion with image and synopsis.
// Features:

// Button to get a random anime
// Show title, genre, description, and image


let arr = [65464, 1000000002, 1000000003]

let sum = 0
for (let i = 0; i < arr.length; i++) {
    sum += arr[i]
    console.log(arr[0] % 10)
}


