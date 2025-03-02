import {createSlice} from "@reduxjs/toolkit";
import {fetchWeather} from "./fetchWeather.ts";
import {OptionalNumeric, OptionalString} from "../../utils/type";
import {RootState} from "../store.ts";
type SliceState = {
  weatherInfo: {
    city: OptionalString,
    country: OptionalString,
    temp: OptionalNumeric,
    pressure: OptionalNumeric,
    sunset: OptionalNumeric,
  }, msg: OptionalString
}

const initialState: SliceState = {
  weatherInfo: {
    city: null,
    country: null,
    temp: null,
    pressure: null,
    sunset: null
  }, msg: 'Enter city name'}

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWeather.fulfilled,
      (_, action) => {
        const weatherInfo  = {
          city: action.payload.name,
          country: action.payload.sys.country,
          temp: action.payload.main.temp,
          pressure: action.payload.main.pressure,
          sunset: action.payload.sys.sunset * 100,
        }
        return  { weatherInfo, msg: ''}
      });
    builder.addCase(fetchWeather.rejected,
      (state, action) => {
         console.error(action.payload);
         return {...state, msg: "Enter correct city name"};
      }
    )
  }
})

export const weatherSelector = (state: RootState) => state.weather.weatherInfo;
export const messageSelector = (state: RootState) => state.weather.msg;

export const weatherReducer = weatherSlice.reducer