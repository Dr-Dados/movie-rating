import React from "react";

const WatchedMovie = ({ movie, onDelete }) => {
  const deleteHandler = () => {
    onDelete((el) => el.filter((el) => el.imdbID !== movie.imdbID));
  };
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <button className="btn-delete" onClick={deleteHandler}>
        &
      </button>
    </li>
  );
};

export default WatchedMovie;
