import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import { TMDB_BASE_URL } from '../utils/constants';

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk('netflix/genres', async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_TMD_API_KEY}`);
  return genres;
});

const populateMoviesFromRawData = (rawdata, movies, genres) => {
  rawdata.forEach((movie) => {
    const movieGenres = [];

    movie.genre_ids.forEach((genre_id) => {
      const name = genres.find(({ id }) => id === genre_id);
      if (name) movieGenres.push(name.name);
    });

    if (movie.backdrop_path) {
      movies.push({
        id: movie.id,
        name: movie?.original_name || movie?.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const movies = [];

  for (let i = 1; movies.length < 60 && i < 10; i++) {
    const { data: {results} } = await axios.get(
      `${api}${paging ? `&page=${i}` : ''}`,
    );
    populateMoviesFromRawData(results, movies, genres);
  }

  return movies;
};

export const getMovies = createAsyncThunk(
  'netflix/trending',
  async ({ type }, ThunkApi) => {
    const {
      netflix: { genres },
    } = ThunkApi.getState();
    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${process.env.REACT_APP_TMD_API_KEY}`,
      genres,
      true,
    );
  },
);

const NetflixSlice = createSlice({
  name: 'Netflix',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(getMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
