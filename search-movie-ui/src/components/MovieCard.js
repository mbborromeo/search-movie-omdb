import "./MovieCard.scss";

const MovieCard = ({ movies, buttonRemove: ButtonRemove, handleClick }) => {
  return (
    // className="movie-row-container"
    <div className="fav-container">
      {movies?.map((movie) => {
        return (
          // using regex to check if the Poster property of a movie object is an image file (JPEG, JPG, GIF or PNG format).
          movie.Poster.match(/\.(jpeg|jpg|gif|png)$/) != null && (
            <div className="movie-frame" key={movie.imdbID}>
              <img
                className="movie-image"
                src={movie.Poster}
                alt={movie.Title}
              />
              {/* <p className="movie-header">{movie.Title}</p> */}

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
