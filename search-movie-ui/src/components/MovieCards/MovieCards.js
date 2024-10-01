import ButtonRemove from "../Buttons/ButtonRemove";
import "./MovieCards.scss";

const MovieCards = ({ movies, clickHandlerRemove, clickHandlerView }) => {
  return (
    <div className="fav-container">
      {movies &&
        movies.map((movie) => {
          return (
            <div
              className="movie-frame"
              key={movie.imdbID}
              onClick={() => {
                clickHandlerView(movie);
              }}
            >
              {
                /* using regex to check if image in expected file type */
                movie.Poster &&
                  movie.Poster.match(/\.(jpeg|jpg|gif|png)$/) != null && (
                    <img
                      className="movie-image"
                      src={movie.Poster}
                      alt={movie.Title}
                    />
                  )
              }

              {/* <p>{movie.Title}</p> */}
              <div className="overlay-container">
                <ButtonRemove
                  clickHandler={(e) => clickHandlerRemove(movie, e)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MovieCards;
