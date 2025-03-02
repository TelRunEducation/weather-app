import {createAsyncThunk} from "@reduxjs/toolkit";
import {api_key, base_url} from "../../utils/constants.ts";
import {OptionalString} from "../../utils/type";

export const fetchWeather = createAsyncThunk(
  'weather',
  async (city: OptionalString, thunkAPI) => {
    try {
      if (typeof city !== "string") throw new Error("city is not inserted");
      console.log(`${base_url}?q=${city}&appid=${api_key}&units=metric`)
      const res = await fetch(`${base_url}?q=${city}&appid=${api_key}&units=metric`)
      if (res.status !== 200) {
        const data = await res.json()
        throw new Error(data.message)
      }
      return await res.json()
    } catch (e: unknown) {
      const errorMessage = (e instanceof Error) ? e.message : "error in request"
      return thunkAPI.rejectWithValue(errorMessage)
    }
  }
)