import "./MovieCards.scss";

const MovieCards = ({
  movies,
  buttonRemove: ButtonRemove,
  clickHandlerRemove,
  clickHandlerView,
}) => {
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
              <div
                className="overlay-container"
                onClick={(e) => clickHandlerRemove(movie, e)}
              >
                <ButtonRemove />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MovieCards;
