import instance from "../../services/axios";
import requests from "../../services/requests";
import { Skeleton } from "@mui/material";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./carousel.css";

// import required modules
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";

const Carousel = () => {
  const imageBaseUrl = "http://image.tmdb.org/t/p/w500";
  const [moviesData, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await instance.get(requests.fetchNowPlaying);
      const moviesData = res.data.results.slice(0, 3);
      setMovies(moviesData);
      setLoading(false);
      // console.clear();
      // console.log(moviesData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log(moviesData);
    fetchMovies();
  }, []);

  return !loading ? (
    <Swiper
      pagination={{
        type: "progressbar",
      }}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
    >
      {moviesData.map((movie) => (
        <SwiperSlide
          className="home-slider__slide"
          style={{
            background: `linear-gradient(90deg, rgb(13 184 246 / 90%) 50%, rgba(0, 0, 0, 0.5)), url(${imageBaseUrl}${movie.backdrop_path})`,
          }}
          key={movie.id}
        >
          <h1 className="slider__movie_title">{movie.original_title}</h1>
          <p className="slider__movie_overview">{movie.overview}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <div className="skeleton slider_skeleon">
      <Skeleton
        sx={{ bgcolor: "#303030" }}
        variant="rectangular"
        width={"100%"}
        height={"480px"}
      />
    </div>
  );
};

export default Carousel;
