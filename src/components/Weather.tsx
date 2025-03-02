import {useSelector} from "react-redux";
import {messageSelector, weatherSelector} from "../redux/weather/weatherSlice.js";
import {useAppSelector} from "../redux/hooks.ts";

const Weather = () => {
  const weather = useAppSelector(weatherSelector);
  const message = useSelector(messageSelector);
    return (
        <div className={'infoWeath'}>
            {!message &&
                <>
                    <p>Location: {weather.country}, {weather.city}</p>
                    <p>Temp: {weather.temp} </p>
                    <p>Pressure: {weather.pressure} </p>
                    <p>Sunset: {new Date(weather.sunset as number).toLocaleTimeString()} </p>
                </>}
            {message}
        </div>)
};

export default Weather;