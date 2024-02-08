import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Search from "./Components/Navbar/Search";
import Logo from "./Components/Navbar/Logo";
import Main from "./Components/Main";
import NumResults from "./Components/Navbar/NumResults";
import Box from "./Components/Main/Box";
import MoviesList from "./Components/Main/Movies/MoviesList";
import WatchedList from "./Components/Main/Watched/WatchedList";
import WatchedSummary from "./Components/Main/Watched/WatchedSummary";
import Loader from "./Components/Main/Loader";
import ErrorMessage from "./Components/Main/ErrorMessage";
import DisplayMovie from "./Components/DisplayMovie";

const KEY = "81f29e83";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with fetching movies");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
          if (err.name !== "AbortError") {
            setError(err.message);
          }
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  const handleSelectedId = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };
  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
    setSelectedId(null);
  };
  return (
    <>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList
              movies={movies}
              handleSelectedId={handleSelectedId}
            ></MoviesList>
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <DisplayMovie
              watchedMovies={watched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              apiKey={KEY}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onDelete={setWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
