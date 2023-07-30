import "../assets/css/Row.css";
import instance from "../services/axios";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';

const Row = ({ title, fetchUrl, isSmallRow }) => {
  const imageBaseUrl = "http://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await instance.get(fetchUrl);
      const moviesData = res.data.results;
      setMovies(moviesData);
      setLoading(false);
      // console.clear();
      // console.log(moviesData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="binge-hub-row">
      <h2 className="binge-hub-title">{title}</h2>

      {!loading ? (
        <div className={isSmallRow ? "smallRow movies-row" : "movies-row"}>
          {movies.map((movie) => (
            <div key={movie.id} className="movie-col">
              <LazyLoadImage
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.original_title}
                className="binge-hub-poster"
                effect="blur"
              />
            </div>
          ))}
        </div>
      ) : (
        <Skeleton
          sx={{ bgcolor: "#303030" }}
          variant="rectangular"
          width={"100%"}
          height={"480px"}
        />
      )}
    </div>
  );
};

export default Row;
