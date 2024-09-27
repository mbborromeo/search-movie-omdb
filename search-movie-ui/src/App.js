import "./App.scss";
import { useState, Suspense } from "react";

import loadingImage from "./images/loading.gif";

function App() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();

    // clean up string
    const titleNoSpaces = title.trim().replaceAll(" ", "+");

    // Check there is a search string before submitting
    if (titleNoSpaces) {
      setMessage(`Searching for movie "${title}"`);
      setData({});
      setLoading(true);

      try {
        // Connect with the relevant backend for live data.
        fetch(`http://localhost:4000/searchMovie?title=${titleNoSpaces}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setData(data);
            setMessage(JSON.stringify(data));

            // reset title
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

  const createGenreTags = (genreString) => {
    const genreArray = genreString.split(", ");

    return genreArray.map((genre) => (
      <span key={genre} className="pill">
        {genre}
      </span>
    ));
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

      <br />
      <br />

      <div className="presentation">
        {loading && <span>{message}</span>}

        {!loading && data && data.Response === "False" && (
          <div className="message">
            {message && <p>Result: {data.Error}</p>}
          </div>
        )}

        {!loading && data && data.Response === "True" && (
          <>
            <div className="row row-1">
              <h1>{data.Title}</h1>
              <ul className="inline-list">
                {data.Type !== "movie" && (
                  <li>{capitalizeFirstLetter(data.Type)}</li>
                )}
                <li>{data.Year}</li>
                {data.Rated !== "N/A" && <li>{data.Rated}</li>}
                {data.Runtime !== "N/A" && <li>{data.Runtime}</li>}
              </ul>
              <hr />
            </div>

            <div className="row row-2">
              <div className="column col-1">
                {data.Poster !== "N/A" && (
                  // <Suspense
                  //   fallback={
                  //     <img src={loadingImage} width="64" height="64" alt="loading" />
                  //   }
                  // >
                  <img
                    id="poster"
                    src={data.Poster}
                    alt={`Poster of ${data.Title}`}
                  />
                  // </Suspense>
                )}
              </div>

              <div className="column col-2">
                <div className="pills-container">
                  {createGenreTags(data.Genre)}
                </div>

                {data.Plot !== "N/A" && <p>{data.Plot}</p>}

                {data.Director !== "N/A" && (
                  <div className="field-value">
                    <span className="field">Director:</span> {data.Director}
                  </div>
                )}

                {data.Writer !== "N/A" && (
                  <div className="field-value">
                    <span className="field">Writer:</span> {data.Writer}
                  </div>
                )}

                {data.Actors !== "N/A" && (
                  <div className="field-value">
                    <span className="field">Actors:</span> {data.Actors}
                  </div>
                )}

                {data.Language !== "N/A" && (
                  <div className="field-value">
                    <span className="field">Language:</span> {data.Language}
                  </div>
                )}

                <div className="field-value">
                  {data.imdbRating !== "N/A" && (
                    <>
                      <span className="field">IMDB Rating:</span>{" "}
                      {data.imdbRating}/10
                    </>
                  )}
                  {data.imdbVotes !== "N/A" && (
                    <span className="votes">
                      ({formatVotes(data.imdbVotes)} votes)
                    </span>
                  )}
                </div>

                {data.Awards !== "N/A" && (
                  <div className="field-value">
                    <span className="field">Awards:</span> {data.Awards}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
