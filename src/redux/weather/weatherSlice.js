import {createSlice} from "@reduxjs/toolkit";
import {fetchWeather} from "./fetchWeather.js";

const weatherSlice = createSlice ({
  name: "weather",
  initialState: {
    weatherInfo: {},
    msg: 'Enter city name'
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled,
      (state, action) => {
        const weatherInfo  = {
          city: action.payload.name,
          country: action.payload.sys.country,
          temp: action.payload.main.temp,
          pressure: action.payload.main.pressure,
          sunset: action.payload.sys.sunset * 100,
        }
        return  {weatherInfo, msg: ''}
      });
    builder.addCase(fetchWeather.rejected,
      (state, action) => {
         console.error(action.payload);
         return {...state, msg: "Enter correct city name"};
      }
    )
  }
})

export const weatherSelector = (state) => state.weather.weatherInfo;
export const messageSelector = (state) => state.weather.msg;

export const weatherReducer = weatherSlice.reducer