const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
    // Brings most popular movies---
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
    // Brings movies search by you---
const movieBox = document.querySelector("#movie-box");

const getMovies = async(api) => {
    const response = await fetch(api)
    const data = await response.json()
    // console.log(data);
    showMovies(data.results)
}


const showMovies = (data) => {
    movieBox.innerHTML = "";
    //-- Empty the movie box...
    data.forEach(
        (result) => {
            const imagePath = result.poster_path === null ? "img/image-missing.png" : IMGPATH + result.poster_path;

            const box = document.createElement("div")
            box.classList.add("box")
            box.innerHTML = `
            <img src="${imagePath}" alt="" />
                <div class="overlay">
                    <div class="title"> 
                        <h2> ${result.original_title}  </h2>
                        <span> ${result.vote_average} <span>
                    </div>
                    <h3>Overview:</h3>
                    <p> 
                        ${result.overview}
                    </p>
                 </div>
            `;

            movieBox.appendChild(box)
        }
    )
}


document.querySelector("#search").addEventListener(
    "keyup",
    function(event) {
        if(event.target.value != ""){
            getMovies(SEARCHAPI + event.target.value);
            // --> Searched movies--
        }
        else{
            getMovies(APIURL);
            // --> Popular movies--
        }
    }
)

    // Initial Call---
    getMovies(APIURL);