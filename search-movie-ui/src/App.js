import "./App.scss";
import { useState } from "react";

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
      setMessage(`Searching for movie [${title}]`);
      setData({});
      setLoading(true);

      try {
        // Connect with the relevant backend for live data.
        fetch(`http://localhost:4000/searchMovie?title=${titleNoSpaces}`)
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log("data", data);
            setData(data);
            setMessage(JSON.stringify(data));

            // reset title
            setTitle("");
            setLoading(false);
          });
      } catch (err) {
        setMessage(`Error: [${err}]`);
        console.log(err);
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const formatVotes = (numberString) => {
    const numStringWithoutCommas = numberString.replaceAll(",", "");

    // .toFixed(1)
    return numStringWithoutCommas >= 1000 && numStringWithoutCommas < 1000000
      ? `${Math.floor(numStringWithoutCommas / 1000)}K`
      : numStringWithoutCommas >= 1000000
      ? `${Math.floor(numStringWithoutCommas / 1000000)}M`
      : numberString;
  };

  const createGenreTags = (genreString) => {
    const genreArray = genreString.split(", ");
    console.log("genreArray", genreArray);

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
          <div className="message">{message && <p>Message: {message}</p>}</div>
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
                  <img
                    id="poster"
                    src={data.Poster}
                    alt={`Poster of ${data.Title}`}
                  />
                )}
              </div>

              <div className="column col-2">
                <div className="pills-container">
                  {createGenreTags(data.Genre)}
                </div>
                {data.Plot !== "N/A" && <p>{data.Plot}</p>}
                {data.Director !== "N/A" && (
                  <div>
                    <span className="field">Director:</span> {data.Director}
                  </div>
                )}
                {data.Writer !== "N/A" && (
                  <div>
                    <span className="field">Writer:</span> {data.Writer}
                  </div>
                )}
                <div>
                  <span className="field">Actors:</span> {data.Actors}
                </div>
                <br />

                {data.Language !== "N/A" && (
                  <div>
                    <span className="field">Language:</span> {data.Language}
                  </div>
                )}
                <br />

                <div>
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
                <br />

                {data.Awards !== "N/A" && (
                  <div>
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
