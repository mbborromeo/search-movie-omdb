import ButtonRemove from '../Buttons/ButtonRemove';
import './MovieCards.scss';

const MovieCards = ({ movies, clickHandlerRemove, clickHandlerView }) => {
  return (
    <div className="fav-container">
      {movies &&
        movies.map((movie) => {
          return (
            <div className="movie-frame" key={movie.imdbID}>
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
              <ButtonRemove
                clickHandler={(e) => clickHandlerRemove(movie, e)}
              />

              <div className="overlay-container">
                {movie.Title}

                <button
                  id="btn-view"
                  title="View"
                  onClick={() => {
                    clickHandlerView(movie);
                  }}
                >
                  VIEW
                </button>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MovieCards;
