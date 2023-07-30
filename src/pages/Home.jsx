import { useEffect, useState } from "react";
import Row from "../components/Row";
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
      <Row title={"Now Playing"} fetchUrl={requests.fetchNowPlaying} />
      <Row title={"Top Rated"} fetchUrl={requests.fetchTopRated} />
      <Row title={"Upcoming"} fetchUrl={requests.fetchUpcoming} />
      {genreList.map((genre) => (
        <Row
          isSmallRow
          key={genre.id}
          title={genre.name}
          fetchUrl={requests.fetchMoviesByGenreId(genre.id)}
        />
      ))}
      {/* <Row title={"Action"} fetchUrl={requests.fetchMoviesByGenreId(28)} />
      <Row title={"Adventure"} fetchUrl={requests.fetchMoviesByGenreId(12)} />
      <Row title={"Animation"} fetchUrl={requests.fetchMoviesByGenreId(16)} />
      <Row title={"Comedy"} fetchUrl={requests.fetchMoviesByGenreId(35)} />
      <Row title={"Crime"} fetchUrl={requests.fetchMoviesByGenreId(80)} />
      <Row title={"Documentary"} fetchUrl={requests.fetchMoviesByGenreId(99)} /> */}
    </>
  );
};

export default Home;
