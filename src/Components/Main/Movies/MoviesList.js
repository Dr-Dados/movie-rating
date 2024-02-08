import React from "react";
import Movie from "./Movie";
const MoviesList = ({ movies, handleSelectedId }) => {
  return (
    <>
      <ul className="list list-movies">
        {movies?.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            handleSelectedId={handleSelectedId}
          />
        ))}
      </ul>
    </>
  );
};

export default MoviesList;
