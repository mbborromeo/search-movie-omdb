import { useState, useEffect } from "react";

import ListOfItems from "./components/ListOfItems";
import MovieCard from "./components/MovieCard";
import { IconRemoveFavorite } from "./components/FavouriteButton";

import {
  capitalizeFirstLetter,
  stringToArray,
  formatNumberOfVotes,
  hasData,
} from "./util/utils";

import "./App.scss";

import loadingImage from "./images/loading.gif";

function App() {
  const [title, setTitle] = useState("");
  const [previousSearch, setPreviousSearch] = useState("");
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);

  // resource for localStorage: https://dev.to/willochs316/building-a-movie-app-with-react-and-ombd-api-a-step-by-step-guide-2p33#storing-api
  // checking if HTML5 localStorage has an item with key "omdb-movie-app"
  useEffect(() => {
    const updatedFavorites = JSON.parse(localStorage.getItem("omdb-movie-app"));

    if (updatedFavorites) {
      setFavorites(updatedFavorites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("omdb-movie-app", JSON.stringify(items));
  };

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

    // set to both React State and HTML5 localStorage
    setFavorites(copyOfFavourites);
    saveToLocalStorage(copyOfFavourites);
  };

  const removeFavoriteMovie = (movie) => {
    const favouritesAmmended = favorites?.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );

    setFavorites(favouritesAmmended);
    saveToLocalStorage(favouritesAmmended);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    // clean up string
    const titleNoSpaces = title.trim().replaceAll(" ", "+");

    // check there is a valid search before submitting
    if (titleNoSpaces && titleNoSpaces !== previousSearch) {
      setMessage(`Searching for movie "${title}"...`);
      setData({});
      setLoading(true);

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

      <div className="presentation">
        <div className="row row-1">
          {(loading || (!loading && data && data.Response === "False")) && (
            <div className="message">
              <p>{message}</p>
            </div>
          )}

          {!loading && data && data.Response === "True" && (
            <>
              <h1>{data.Title}</h1>
              <ul className="inline-list details-bar">
                {data.Type !== "movie" && (
                  <li>{capitalizeFirstLetter(data.Type)}</li>
                )}
                {hasData(data.Year) && <li>{data.Year}</li>}
                {hasData(data.Rated) && <li>{data.Rated}</li>}
                {hasData(data.Runtime) && <li>{data.Runtime}</li>}
              </ul>
            </>
          )}
          <hr />
        </div>

        <div className="row row-2">
          {loading && (
            <div className="loading-wrapper">
              <img id="loading-gif" src={loadingImage} alt="loading" />
            </div>
          )}

          {!loading && data && data.Response === "True" && (
            <>
              {hasData(data.Poster) && (
                <div className="column col-1">
                  <img
                    id="poster"
                    src={data.Poster}
                    alt={`Poster of ${data.Title}`}
                  />
                </div>
              )}

              <div className="column col-2">
                {hasData(data.Genre) && (
                  <ListOfItems
                    items={stringToArray(data.Genre)}
                    classname="pills-container"
                  />
                )}

                {hasData(data.Plot) && <p>{data.Plot}</p>}

                {hasData(data.Director) && (
                  <div className="field-value">
                    <span className="field">Director:</span>
                    <ListOfItems
                      items={stringToArray(data.Director)}
                      classname="inline-list"
                    />
                  </div>
                )}

                {hasData(data.Writer) && (
                  <div className="field-value">
                    <span className="field">Writer:</span>
                    <ListOfItems
                      items={stringToArray(data.Writer)}
                      classname="inline-list"
                    />
                  </div>
                )}

                {hasData(data.Actors) && (
                  <div className="field-value">
                    <span className="field">Actors:</span>
                    <ListOfItems
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

          {/* list of favourite movies (saved on localStorage) */}
          <MovieCard
            movies={favorites}
            buttonRemove={IconRemoveFavorite}
            handleClick={removeFavoriteMovie}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
