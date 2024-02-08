import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Main/Loader";

const DisplayMovie = ({
  selectedId,
  onCloseMovie,
  apiKey,
  onAddWatched,
  watchedMovies,
}) => {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(null);
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
  } = movie;

  const isWatched = watchedMovies.map((el) => el.imdbID).includes(selectedId);
  useEffect(
    function () {
      function callBackFunction(e) {
        if (e.code === "Escape") {
          onCloseMovie();
        }
      }
      document.addEventListener("keydown", callBackFunction);
      return function () {
        document.removeEventListener("keydown", callBackFunction);
      };
    },
    [onCloseMovie]
  );
  useEffect(() => {
    async function fetchMovieById() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${apiKey}&i=${selectedId}`
      );
      const data = await res.json();
      setIsLoading(false);
      setMovie(data);
    }
    fetchMovieById();
  }, [selectedId, apiKey]);

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      userRating: userRating,
      runtime: Number(runtime.split("").at(0)),
    };
    onAddWatched(newWatchedMovie);
  };
  useEffect(() => {
    document.title = `Movie | ${title}`;
    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);
  return (
    <>
      <div className="details">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <header>
              <button className="btn-back" onClick={onCloseMovie}>
                &larr;
              </button>
              <img src={poster} alt={title} />
              <div className="details-overview">
                <h2>{title}</h2>
                <p>
                  {released}&bull;{runtime}
                </p>
                <p>
                  <span>⭐️</span>
                  {imdbRating} IMDB Rating
                </p>
              </div>
            </header>

            <section>
              <div className="rating">
                {!isWatched ? (
                  <>
                    <StarRating
                      maxRating={10}
                      size={24}
                      key={title}
                      onSetRating={setUserRating}
                    />
                    {userRating > 0 && (
                      <button className="btn-add" onClick={handleAdd}>
                        Add to list
                      </button>
                    )}
                  </>
                ) : (
                  <p>You already rated this movie</p>
                )}
              </div>
              <p>
                <em>{plot}</em>
              </p>
              <p>Starring : {actors}</p>
              <p>Directed by {director}</p>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default DisplayMovie;
