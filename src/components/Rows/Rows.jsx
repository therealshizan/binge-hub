import React, { useEffect, useState } from "react";
import instance from "../../services/axios";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "../../assets/css/Rows.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";

import { LazyLoadImage } from "react-lazy-load-image-component";
import { Skeleton } from "@mui/material";

function Rows({ title, fetchUrl, isSmallRow }) {
  const imageBaseUrl = "http://image.tmdb.org/t/p/w500";
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const res = await instance.get(fetchUrl);
      const moviesData = res.data.results;
      // console.log(moviesData);
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
    // console.log(movies);
  }, []);

  return (
    <div className="binge-hub-row">
    <h2 style={{margin: '0rem 2rem'}} className="binge-hub-title">{title}</h2>
      <Swiper
        navigation={true}
        slidesPerView={!isSmallRow ? 4 : 5}
        spaceBetween={30}
        modules={[Pagination, Navigation]}
        className="mySwiper row-slider"
      >
        {movies?.map((movie) => (
          !loading ? 
        <SwiperSlide key={movie.id}>
        <LazyLoadImage
                src={`${imageBaseUrl}${movie.poster_path}`}
                alt={movie.original_title}
                className="binge-hub-poster"
                effect="blur"
              />
        </SwiperSlide>
        :
      <Skeleton
          sx={{ bgcolor: "#303030" }}
          variant="rectangular"
          width={"100%"}
          height={"480px"}
        />
      ))}
      </Swiper>

    </div>
  );
}

export default Rows