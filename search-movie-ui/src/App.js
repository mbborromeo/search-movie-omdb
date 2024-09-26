import "./App.css";
import { useState } from "react";
// import testMovie from "./braveheart.json";

function App() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [finishedLoading, setFinishedLoading] = useState(false);

  let handleSubmit = async (e) => {
    e.preventDefault();

    // clean up string
    const titleNoSpaces = title.trim().replaceAll(" ", "+");

    // Check there is a search string before submitting
    if (titleNoSpaces) {
      setMessage(`Searching for movie [${title}]`);

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
            setFinishedLoading(true);
            // reset title
            setTitle("");
          });
      } catch (err) {
        setMessage(`Error: [${err}]`);
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

        {finishedLoading && data && data.Response === "True" && (
          <div className="presentation">
            <h1>{data.Title}</h1>
            <span>{data.Year}</span>
            {data.Poster && (
              <img src={data.Poster} alt={`Poster of ${data.Title}`} />
            )}
          </div>
        )}
        {finishedLoading && data && data.Response === "False" && (
          <div className="message">{message && <p>Message: {message}</p>}</div>
        )}
      </form>
    </div>
  );
}

export default App;
