import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
};

const movie = createSlice({
  name: "movie",
  initialState,
  reducers: {
    storesGenres(state, action) {
      state.genres = action.payload.genres;
    },
  },
});
export const movieActions = movie.actions;


// Action creators
export const getGenre = function () {
  return async function (dispatch) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}genre/movie/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      if (!response.ok) throw new Error("Something went wrong");
      const { genres } = await response.json();
      dispatch(movieActions.storesGenres({ genres }));
    } catch (error) {
      console.log(error);
    }
  };
};

export default movie.reducer;
