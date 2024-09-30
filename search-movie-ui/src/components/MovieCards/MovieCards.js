import "./MovieCards.scss";

const MovieCards = ({
  movies,
  buttonRemove: ButtonRemove,
  clickHandlerRemove,
  clickHandlerView,
}) => {
  return (
    <div className="fav-container">
      {movies?.map((movie) => {
        return (
          // using regex to check if image in expected file type
          movie.Poster.match(/\.(jpeg|jpg|gif|png)$/) != null && (
            <div
              className="movie-frame"
              key={movie.imdbID}
              onClick={() => {
                clickHandlerView(movie);
              }}
            >
              <img
                className="movie-image"
                src={movie.Poster}
                alt={movie.Title}
              />

              <div
                className="overlay-container"
                onClick={(e) => clickHandlerRemove(movie, e)}
              >
                <ButtonRemove />
              </div>
            </div>
          )
        );
      })}
    </div>
  );
};

export default MovieCards;
