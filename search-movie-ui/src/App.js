import "./App.css";
import { useState } from "react";
import testMovie from './braveheart.json';

function App() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    setTitle("");
    setMessage(`Searching for movie [${title}]`);
    try {
      //FIXME: Using mock file. Connect with the relevant backend for live data.
      setMessage(JSON.stringify(testMovie));
    } catch (err) {
      setMessage(`Error: [${err}]`);
      console.log(err);
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

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default App;
