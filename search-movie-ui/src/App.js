import "./App.scss";
import { useState } from "react";

import loadingImage from "./images/loading.gif";

function App() {
  const [title, setTitle] = useState("");
  const [previousSearch, setPreviousSearch] = useState("");
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatVotes = (numberString) => {
    const numStringWithoutCommas = numberString.replaceAll(",", "");

    return numStringWithoutCommas >= 1000 && numStringWithoutCommas < 1000000
      ? `${Math.floor(numStringWithoutCommas / 1000)}K`
      : numStringWithoutCommas >= 1000000
      ? `${Math.floor(numStringWithoutCommas / 1000000)}M`
      : numberString;
  };

  const hasData = (value) => {
    return value !== "N/A" ? true : false;
  };

  const dataLoaded = () => {
    return !loading && data ? true : false;
  };

  const matchFound = () => {
    return data.Response === "True" ? true : false;
  };

  const stringToArray = (str) => {
    const arrayOfItems = str.split(", ");
    return arrayOfItems;
  };

  // const createGenreTags = (arr) => {
  //   return arr.map((item) => (
  //     <span key={item} className="pill">
  //       {item}
  //     </span>
  //   ));
  // };

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
          {(loading || (dataLoaded() && !matchFound())) && (
            <div className="message">
              <p>{message}</p>
            </div>
          )}

          {dataLoaded() && matchFound() && (
            <>
              <h1>{data.Title}</h1>
              <ul className="inline-list details-bar">
                {data.Type !== "movie" && (
                  <li className="inline-item">
                    {capitalizeFirstLetter(data.Type)}
                  </li>
                )}
                {hasData(data.Year) && (
                  <li className="inline-item">{data.Year}</li>
                )}
                {hasData(data.Rated) && (
                  <li className="inline-item">{data.Rated}</li>
                )}
                {hasData(data.Runtime) && (
                  <li className="inline-item">{data.Runtime}</li>
                )}
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

          {dataLoaded() && matchFound() && (
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
                  <ul className="pills-container">
                    {stringToArray(data.Genre).map((genre) => (
                      <li key={genre} className="pill">
                        {genre}
                      </li>
                    ))}
                  </ul>
                )}

                {hasData(data.Plot) && <p>{data.Plot}</p>}

                {hasData(data.Director) && (
                  <div className="field-value">
                    <span className="field">Director:</span>
                    <div className="inline-list">
                      {stringToArray(data.Director).map((i) => (
                        <span className="inline-item" key={i}>
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {hasData(data.Writer) && (
                  <div className="field-value">
                    <span className="field">Writer:</span>
                    <div className="inline-list">
                      {stringToArray(data.Writer).map((i) => (
                        <span className="inline-item" key={i}>
                          {i}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {hasData(data.Actors) && (
                  <div className="field-value">
                    <span className="field">Actors:</span>
                    <div className="inline-list">
                      {stringToArray(data.Actors).map((i) => (
                        <span className="inline-item" key={i}>
                          {i}
                        </span>
                      ))}
                    </div>
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
                      ({formatVotes(data.imdbVotes)} votes)
                    </span>
                  )}
                </div>

                {hasData(data.Awards) && (
                  <div className="field-value">
                    <span className="field">Awards:</span>
                    {data.Awards}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
