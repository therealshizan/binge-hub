import { useEffect, useState } from "react";
import Rows from "../components/Rows/Rows";
import requests from "../services/requests";
import instance from "../services/axios";
import Carousel from "../components/Slider/Carousel";
import Header from "../components/Header/Header";

const Home = () => {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await instance.get(requests.fetchLists);
        const genreData = await res.data.genres;
        setGenreList(genreData);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <>
    <Header/>
    <Carousel/>
      <Rows title={"Now Playing"} fetchUrl={requests.fetchNowPlaying} />
      <Rows title={"Top Rated"} fetchUrl={requests.fetchTopRated} />
      <Rows title={"Upcoming"} fetchUrl={requests.fetchUpcoming} />
      {genreList.map((genre) => (
        <Rows
          isSmallRow
          key={genre.id}
          title={genre.name}
          fetchUrl={requests.fetchMoviesByGenreId(genre.id)}
        />
      ))}
    </>
  );
};

export default Home;
