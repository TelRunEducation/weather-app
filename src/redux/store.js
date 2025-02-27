import {weatherReducer} from "./weather/weatherSlice.js";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
  }
})
export default store;