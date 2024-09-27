import "./App.scss";
import { useState } from "react";
// import testMovie from "./braveheart.json";

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

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

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
                <li>{data.Rated}</li>
                <li>{data.Runtime}</li>
              </ul>
            </div>

            <div className="row row-2">
              <div className="column">
                <img
                  id="poster"
                  src={data.Poster}
                  alt={`Poster of ${data.Title}`}
                />
              </div>

              <div className="column">
                <div>Genre: {data.Genre}</div>
                <p>{data.Plot}</p>
                {data.Director !== "N/A" && (
                  <div>Director: {data.Director}</div>
                )}
                {data.Writer !== "N/A" && <div>Writer: {data.Writer}</div>}
                <div>Actors: {data.Actors}</div>
                <br />

                <div>Language: {data.Language}</div>
                <br />

                <div>
                  IMDB Rating: {data.imdbRating}/10 (votes: {data.imdbVotes})
                </div>
                <br />

                {data.Awards && <div>Awards: {data.Awards}</div>}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
