import "./App.scss";
import { useState } from "react";

import loadingImage from "./images/loading.gif";

import ListOfItems from "./components/ListOfItems";

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

  const stringToArray = (str) => {
    const arrayOfItems = str.split(", ");
    return arrayOfItems;
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
