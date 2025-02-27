import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_key, base_url} from "../../utils/constants.js";

export const fetchWeather = createAsyncThunk(
  'weather',
  async (city, thunkAPI) => {
    try {
      console.log(`${base_url}?q=${city}&appid=${api_key}&units=metric`)
      const res = await fetch(`${base_url}?q=${city}&appid=${api_key}&units=metric`)
      if (res.status !== 200) {
        const data = await res.json()
        throw new Error(data.message)
      }
      return await res.json()
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)