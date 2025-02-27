import {cacheTimeout} from "../utils/constants.js";
import "bootstrap/js/src/button.js";
import {useRef} from "react";
import {useDispatch} from "react-redux";
import {fetchWeather} from "../redux/weather/fetchWeather.js";

const Form = () => {
    // keeps city name and timeoutId for this city
    const lastRequestData = useRef({city: '', timeoutId: undefined})
    const dispatch = useDispatch();

    const handleClickGetWeather = e => {
        e.preventDefault()

        const setUpTimeout = () => setTimeout(
            () => lastRequestData.current.timeoutId = undefined,
            cacheTimeout)

        const updateRequestInfo = (city) => {
            const timeoutId = lastRequestData.current.timeoutId
            // clear previous timeout if it's on for the old city
            timeoutId && clearTimeout(timeoutId)
            lastRequestData.current.city = city
            lastRequestData.current.timeoutId = setUpTimeout()
        }

        const city = e.target.city.value.trim()

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