const APIKEY = import.meta.env.VITE_TMBD_API_KEY
const MOVIE_ID = `346698`
const GENRE_ID = `27`
// const MOVIE_BASE_URL = `https://api.themoviedb.org/3`
// https://api.themoviedb.org/3/discover/movie?api_key=0536fd8e7979b9af58f93c57e07ffa75&with_genres=27

const requests = {
    fetchNowPlaying: `/movie/now_playing?api_key=${APIKEY}`,
    fetchPopular: `/movie/popular?api_key=${APIKEY}`,
    fetchTopRated: `/movie/top_rated?api_key=${APIKEY}`,
    fetchUpcoming: `/movie/upcoming?api_key=${APIKEY}`,
    fetchDetails: `/movie/${MOVIE_ID}?api_key=${APIKEY}`,
    fetchCreditis: `/movie/${MOVIE_ID}/credits?api_key=${APIKEY}`,
    fetchImages: `/movie/${MOVIE_ID}/images?api_key=${APIKEY}`,
    fetchKeywords: `/movie/${MOVIE_ID}/keywords?api_key=${APIKEY}`,
    fetchLists: `/genre/movie/list?api_key=${APIKEY}`,
    fetchMoviesByGenreId: (id)=>{
        return `/discover/movie?api_key=${APIKEY}&with_genres=${id}`
    },
    fetchMoviesByGenre: `/discover/movie?api_key=${APIKEY}&with_genres=${GENRE_ID}`
}

export default requests