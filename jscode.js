
const trendingTodayRowContent = document.getElementById("trendingTodayRowContent");
const trendingWeekRowContent = document.getElementById("trendingWeekRowContent");
let trendingNames = [];

//function to calculate rating color
function getColor(rating) {
  if(rating>70) {return "21, 180, 146";}
  if(rating>50 && rating<=70) {return "235, 231, 28";}
  if(rating<=50) {return "184, 55, 55";}
}

//common data for all api calls
const imgSrcStart = "https://www.themoviedb.org/t/p/w220_and_h330_face" ;
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MGYzZWRlZTQzZmRiN2ZlNWFiNjM0MDI0NmEwMWFiNSIsInN1YiI6IjY0ZTI1MDUwYjc3ZDRiMTEzZTA3ZWVmOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nOIkxGjZ3RNISBEVz-Ip4QuLkWLdbGSNfj7O_NgxGiM'
  }
};

//function for trending today list
async function trendingTodayAPI() {
  
  try {
    const trendingTodayData = await fetch("https://api.themoviedb.org/3/trending/all/day", options);
    const trendingTodayJSONData = await trendingTodayData.json();
    const trendingTodayResults = trendingTodayJSONData.results;
    for(let i=0; i<10; i++) {
      //creating cards for the movies and shows
      let card = document.createElement("div");
      let cardImageDiv = document.createElement("div");
      let cardImage = document.createElement("img");
      cardImage.src = imgSrcStart + trendingTodayResults[i].poster_path;
      let cardText = document.createElement("div");
      let title = trendingTodayResults[i].title || trendingTodayResults[i].name;
      let releaseDate = trendingTodayResults[i].release_date || trendingTodayResults[i].first_air_date;
      cardText.innerHTML = `<h4 id='contentTitle'>${title}</h4><p>${releaseDate}</p>`;
      let ratingDiv = document.createElement("div");
      let rating = Math.ceil(trendingTodayResults[i].vote_average*10);
      let ratingColor = getColor(rating);
      ratingDiv.innerHTML = `${rating}<span style='font-size:5px;'>%</span>`;
      ratingDiv.style.background = `radial-gradient(closest-side, rgb(39, 39, 39) 79%, transparent 80% 100%),conic-gradient(rgba(${ratingColor}, 1) ${rating}%, rgba(${ratingColor}, 0.3) 0)`; 

      //adding classes to the divs
      card.classList.add("card");
      cardImageDiv.classList.add("cardimgdiv");
      cardImage.classList.add("cardimg");
      ratingDiv.classList.add("rating");
      cardText.classList.add("cardtext");

      //append the data in card
      cardImageDiv.appendChild(cardImage);
      cardImageDiv.appendChild(ratingDiv);
      card.appendChild(cardImageDiv);
      card.appendChild(cardText);
      trendingTodayRowContent.appendChild(card);

      //storing the trending names
      trendingNames.push(title);
    }
  }
  
  catch(error) {
    console.log("Error with fetching api - trending today list..." + error);
  }
}

//function for trending week list
async function trendingWeekAPI() {

  try {
    const trendingWeekData = await fetch("https://api.themoviedb.org/3/trending/all/week", options);
    const trendingWeekJSONData = await trendingWeekData.json();
    const trendingWeekResults = trendingWeekJSONData.results;
    for(let i=0; i<10; i++) {
      //creating cards for the movies and shows
      let card = document.createElement("div");
      let cardImageDiv = document.createElement("div");
      let cardImage = document.createElement("img");
      cardImage.src = imgSrcStart + trendingWeekResults[i].poster_path;
      let cardText = document.createElement("div");
      let title = trendingWeekResults[i].title || trendingWeekResults[i].name;
      let releaseDate = trendingWeekResults[i].release_date || trendingWeekResults[i].first_air_date;
      cardText.innerHTML = `<h4 id='contentTitle'>${title}</h4><p>${releaseDate}</p>`;
      let ratingDiv = document.createElement("div");
      let rating = Math.ceil(trendingWeekResults[i].vote_average*10);
      let ratingColor = getColor(rating);
      ratingDiv.innerHTML = `${rating}<span style='font-size:5px;'>%</span>`;
      ratingDiv.style.background = `radial-gradient(closest-side, rgb(39, 39, 39) 79%, transparent 80% 100%),conic-gradient(rgba(${ratingColor}, 1) ${rating}%, rgba(${ratingColor}, 0.3) 0)`; 

      //adding classes to the divs
      card.classList.add("card");
      cardImageDiv.classList.add("cardimgdiv");
      cardImage.classList.add("cardimg");
      ratingDiv.classList.add("rating");
      cardText.classList.add("cardtext");

      //append the data in card
      cardImageDiv.appendChild(cardImage);
      cardImageDiv.appendChild(ratingDiv);
      card.appendChild(cardImageDiv);
      card.appendChild(cardText);
      trendingWeekRowContent.appendChild(card);

    }
  }

  catch(error) {
    console.log("Error with fetching api - trending week list..." + error);
  }
}

//calling of API functions
window.onload = trendingTodayAPI;
const trendingTodayToggle = document.getElementById("today-trending");
const trendingWeekToggle = document.getElementById("week-trending");
trendingTodayToggle.addEventListener('click', () => {
  if(!trendingTodayToggle.classList.contains('active')) {
    trendingTodayAPI();
    trendingWeekRowContent.innerHTML = "";
  }
});

trendingWeekToggle.addEventListener('click', () => {
  if(!trendingWeekToggle.classList.contains('active')) {
    trendingWeekAPI();
    trendingTodayRowContent.innerHTML = "";
  }
});

//button toggle effect
const buttons = document.querySelectorAll('.toggle-button');
buttons.forEach(button => {
  button.addEventListener('click', () => {
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
  });
});

//search functionality
const searchBtn = document.getElementById("searchSubmit");
searchBtn.addEventListener('click', () => {
  const searchKeyword = document.getElementById("mainPageSearch").value;
  const encodedKeyword = encodeURIComponent(searchKeyword);
  document.getElementById("mainPageSearch").value = encodedKeyword;
  document.getElementById("searchForm").submit();
});

