import { useState, useEffect } from "react";

import ListItems from "./components/ListItems/ListItems";
import MovieCards from "./components/MovieCards/MovieCards";
import ButtonRemove from "./components/Buttons/ButtonRemove";

import {
  capitalizeFirstLetter,
  stringToArray,
  trimAndReplaceSpaces,
  formatNumberOfVotes,
  hasData,
} from "./util/utils";

import "./styles/main.scss";

import loadingImage from "./images/loading.gif";

function App() {
  const [title, setTitle] = useState("");
  const [previousSearch, setPreviousSearch] = useState("");
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [viewMovieFromFavs, setViewMovieFromFavs] = useState(false);

  console.log("viewMovieFromFavs:", viewMovieFromFavs);
  console.log("data:", data);

  // checking if HTML5 localStorage has an item with key "omdb-movie-app"
  useEffect(() => {
    const updatedFavorites = JSON.parse(localStorage.getItem("omdb-movie-app"));

    if (updatedFavorites) {
      setFavorites(updatedFavorites);
    }
  }, []);

  // saves item to HTML5 localStorage
  const saveToLocalStorage = (items) => {
    localStorage.setItem("omdb-movie-app", JSON.stringify(items));
  };

  // localStorage Resource: https://dev.to/willochs316/building-a-movie-app-with-react-and-ombd-api-a-step-by-step-guide-2p33#storing-api
  const addFavoriteMovie = (movie) => {
    // make shallow copy of favorites array if exists, else use an empty array
    let copyOfFavourites = [...(favorites ? favorites : [])];

    const previouslySavedMovie = favorites?.find(
      (element) => element.imdbID === movie.imdbID
    );

    if (!previouslySavedMovie) {
      // add movie to start of favorites array
      copyOfFavourites = [movie, ...copyOfFavourites];
    }

    // save to both React State and localStorage
    setFavorites(copyOfFavourites);
    saveToLocalStorage(copyOfFavourites);
  };

  const removeFavoriteMovie = (movie, ev) => {
    // prevent click event going through to parent
    if (ev && ev.stopPropagation) {
      ev.stopPropagation();
    }

    const favouritesAmmended = favorites?.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );

    // save to both React State and localStorage
    setFavorites(favouritesAmmended);
    saveToLocalStorage(favouritesAmmended);
  };

  const viewFavoriteMovie = (movie) => {
    console.log("viewFavoriteMovie movie to view:", movie);

    // load presentation area with movie details
    setViewMovieFromFavs(true);
    setData(movie);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    // clean up string
    const titleNoSpaces = trimAndReplaceSpaces(title);

    // check there is a valid search before submitting
    if (titleNoSpaces && titleNoSpaces !== previousSearch) {
      setMessage(`Searching for movie "${title}"...`);
      setData({});
      setLoading(true);
      setViewMovieFromFavs(false);

      try {
        // Connect with the relevant backend for live data.
        fetch(`http://localhost:4000/searchMovie?title=${titleNoSpaces}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            // no results found
            if (data.Response === "False") {
              setMessage(`Results for "${title}": ${data.Error}`);
            }

            setData(data);

            // store previous search and reset title
            setPreviousSearch(titleNoSpaces);
            setTitle("");
            setLoading(false);
          });
      } catch (err) {
        setMessage(`Error: "${err}"`);
        console.log(err);
      }
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Search Movie Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Search Movie</button>
      </form>

      {(loading || (!loading && data && data.Response === "False")) && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}

      {loading && (
        <div className="loading-wrapper">
          <img id="loading-gif" src={loadingImage} alt="loading" />
        </div>
      )}

      <div className="presentation">
        {((viewMovieFromFavs && data) ||
          (!loading && data && data.Response === "True")) && (
          <>
            <div className="row row-1">
              <h1>{data.Title}</h1>
              <ul className="inline-list details-bar">
                {data.Type !== "movie" && (
                  <li>{capitalizeFirstLetter(data.Type)}</li>
                )}
                {hasData(data.Year) && <li>{data.Year}</li>}
                {hasData(data.Rated) && <li>{data.Rated}</li>}
                {hasData(data.Runtime) && <li>{data.Runtime}</li>}
              </ul>
              <hr />
            </div>

            <div className="row row-2">
              {hasData(data.Poster) && (
                <div className="column col-1">
                  <img
                    id="poster"
                    src={data.Poster}
                    alt={`Poster of ${data.Title}`}
                  />
                </div>
              )}
            </div>

            <div className="column col-2">
              {hasData(data.Genre) && (
                <ListItems
                  items={stringToArray(data.Genre)}
                  classname="pills-container"
                />
              )}

              {hasData(data.Plot) && <p>{data.Plot}</p>}

              {hasData(data.Director) && (
                <div className="field-value">
                  <span className="field">Director:</span>
                  <ListItems
                    items={stringToArray(data.Director)}
                    classname="inline-list"
                  />
                </div>
              )}

              {hasData(data.Writer) && (
                <div className="field-value">
                  <span className="field">Writer:</span>
                  <ListItems
                    items={stringToArray(data.Writer)}
                    classname="inline-list"
                  />
                </div>
              )}

              {hasData(data.Actors) && (
                <div className="field-value">
                  <span className="field">Actors:</span>
                  <ListItems
                    items={stringToArray(data.Actors)}
                    classname="inline-list"
                  />
                </div>
              )}

              {hasData(data.Language) && (
                <div className="field-value">
                  <span className="field">Language:</span>
                  {data.Language}
                </div>
              )}

              <div className="field-value">
                {hasData(data.imdbRating) && (
                  <>
                    <span className="field">IMDB Rating:</span>
                    {data.imdbRating}/10
                  </>
                )}
                {hasData(data.imdbVotes) && (
                  <span className="votes">
                    ({formatNumberOfVotes(data.imdbVotes)} votes)
                  </span>
                )}
              </div>

              {hasData(data.Awards) && (
                <div className="field-value">
                  <span className="field">Awards:</span>
                  {data.Awards}
                </div>
              )}

              <div className="cta-placeholder">
                <button
                  className="btn-add"
                  onClick={() => addFavoriteMovie(data)}
                >
                  Add to Favourites
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <div className="row row-3">
        <hr />
        <h2>Favourites</h2>

        {/* list of favourite movies saved on localStorage & state */}
        {favorites.length > 0 && (
          <MovieCards
            movies={favorites}
            buttonRemove={ButtonRemove}
            clickHandlerRemove={removeFavoriteMovie}
            clickHandlerView={viewFavoriteMovie}
          />
        )}
      </div>
    </div>
  );
}

export default App;
