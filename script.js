// const IMGPATH = "http://img.omdbapi.com/?s=avengers&apikey=db9f5052&";
// const SEARCHAPI =&";
// "http://www.omdbapi.com/?s=shows&apikey=db9f5052

const search = document.getElementById("search");
const result = document.getElementById("card-wrapper");
const searchList = document.querySelector(".search-list");

// load movies from api

async function loadMovie(searchterm) {
  const URL = `https://omdbapi.com/?s=${searchterm}&apikey=db9f5052`;
  const response = await fetch(`${URL}`);
  const data = await response.json();
  console.log(data);
  if (data.Response == "True") displayMovieList(data.Search);
}

function findMovies() {
  let searchterm = search.value.trim();
  if (searchterm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovie(searchterm);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

function displayMovieList(Movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < Movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = Movies[idx].imdbID;
    movieListItem.classList.add("search-item");
    if (Movies[idx] != "N/A") {
      moviePoster = Movies[idx].Poster;
    } else {
      moviePoster = "image_not_found.png";
    }

    movieListItem.innerHTML = `
                      <div class="search-item-thumbnail">
                        <img src="${moviePoster}" alt="">
                    </div>
                    <div class="search-item-info">
                        <h3 style="font-size: 15px;">${Movies[idx].Title}</h3>   
                        <p style="font-size: 10px;">${Movies[idx].Year}</p>
                    </div>
                     `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails() {
  const searchListMovie = document.querySelectorAll(".search-item");
  searchListMovie.forEach((movie) => {
    movie.addEventListener("click", async () => {
      // console.log(movie.dataset.id);
      searchList.classList.add("hide-search-list");
      search.value = "";
      const result = await fetch(
        `https://omdbapi.com/?i=${movie.dataset.id}&apikey=db9f5052`
      );
      const moviedetails = await result.json();
      console.log(moviedetails);
      
      displayMovieDetails(moviedetails);
    });
  });
}

function displayMovieDetails(details){
    result.innerHTML=`<div class="card">
                <img src="${(details.Poster != "N/A") ?  details.Poster : "image_not_found,png"}" alt="movie poster">
            </div>
            <div id="info">
                <div id="info-ti-wr">
                    <h4>${details.Title}</h4>
                </div>
                <div id="year-ra-re">
                        <div class="details" id="year">
                            Year : ${details.Year}
                        </div>
                        <div class="details" id="rate">
                            Ratings : ${details.Rated}
                        </div> 
                        <div class="details" id="relese">
                           Released : ${details.Released}
                        </div>
                </div>
                <div id="genre">
                    <b>Genre : </b> ${details.Genre}
                </div>
                <div id="writers">
                    <b>writers : </b> ${details.Writer}
                </div>
                <div id="actors">
                   <b>Actors : </b> ${details.Actors}
                </div>
                <div id="plot">
                    
                    <p> <b>Plot : </b> ${details.Plot}</p>
                </div>
                <div id="language">
                    <b>Language : </b> ${details.Language}
                </div>
          </div>`
}
// loadApi("lord of the rings");
