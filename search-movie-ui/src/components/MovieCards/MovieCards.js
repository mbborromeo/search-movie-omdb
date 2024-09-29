import "./MovieCards.scss";

const MovieCard = ({ movies, buttonRemove: ButtonRemove, handleClick }) => {
  return (
    <div className="fav-container">
      {movies.map((movie) => {
        return (
          // using regex to check if image in expected file type
          movie.Poster.match(/\.(jpeg|jpg|gif|png)$/) != null && (
            <div className="movie-frame" key={movie.imdbID}>
              <img
                className="movie-image"
                src={movie.Poster}
                alt={movie.Title}
              />

              <div
                className="overlay-container"
                onClick={() => handleClick(movie)}
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

export default MovieCard;
