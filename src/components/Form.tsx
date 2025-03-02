import {cacheTimeout} from "../utils/constants.ts";
import "bootstrap/js/src/button.js";
import {FormEvent, useRef} from "react";
import {fetchWeather} from "../redux/weather/fetchWeather.ts";
import {useAppDispatch} from "../redux/hooks.ts";
import {OptionalString} from "../utils/type";

type RequestSettings = {city: OptionalString, timeoutId: number | undefined}

const Form = () => {
    // keeps city name and timeoutId for this city
    const lastRequestData = useRef<RequestSettings>({city: '', timeoutId: undefined})
    const dispatch = useAppDispatch();

    const handleClickGetWeather = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const setUpTimeout = () => setTimeout(
            () => lastRequestData.current.timeoutId = undefined,
            cacheTimeout)

        const updateRequestInfo = (city: OptionalString) => {
            const timeoutId = lastRequestData.current.timeoutId
            // clear previous timeout if it's on for the old city
            timeoutId && clearTimeout(timeoutId)
            lastRequestData.current.city = city
            lastRequestData.current.timeoutId = setUpTimeout()
        }

        const city = e.currentTarget.city.value.trim()

        /* User can make a new request in two cases
         1. the city has changed
         2. timeout is over for the same city */
        if (city !== lastRequestData.current.city || !lastRequestData.current.timeoutId) {
            updateRequestInfo(city)
            dispatch(fetchWeather(city))
        }
    }

    return (<form onSubmit={handleClickGetWeather}>
        <input type={"text"} name={'city'}/>
        <button type={"submit"} name={'submit'}>Get weather</button>
    </form>);
};

export default Form;